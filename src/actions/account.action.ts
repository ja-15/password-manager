"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { encryptPassword, decryptPassword } from "@/utils/cryptoUtils";

export type Account = {
  id: string;
  websiteName: string;
  email: string;
  username?: string | null;
  password: string;
  createdAt:  Date;
};


export async function addNewAccount(
  websiteName: string,
  email: string,
  username: string | null,
  password: string
): Promise<{success: boolean; account?: Account; error?: string} | undefined> {

  const hashedPassword = encryptPassword(password)
  try {
    const userId = await getDbUserId();

    if (!userId) return;

    const account = await prisma.account.create({
      data: {
        websiteName,
        email,
        username,
        password: hashedPassword,
        userId: userId
      },
    });
    const decryptedAccount = {...account,
      password: decryptPassword(account.password)
    }
    revalidatePath('/dashboard');
    return {success: true, account: decryptedAccount}
  } catch (error) { 
    console.error("Failed to add account", error);
    return {success:false, error: "Failed to add account"}
  }
}

//Get accounts
export async function getAccounts(): Promise<{ success: boolean; accounts?: Account[]; error?: string }> {

  try {
    const userId = await getDbUserId();

    if (!userId) throw new Error("User Id not found");

    const accounts = await prisma.account.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where: {
        userId: userId,
      },
      select: {
        id: true,
        websiteName: true,
        username: true,
        email:true,
        password: true,
        createdAt: true,
      }
    });


    const decryptedAccounts = accounts.map(account => {
      try {
        return { ...account, password: decryptPassword(account.password) };
      } catch (error) {
        console.error("Decryption failed for account ID:", account.id, error);
        return { ...account, password: "Decryption error" }; 
      }
    });
    
    return {success: true, accounts: decryptedAccounts};
  } catch (error) {
    console.log("Error in getAccounts", error || {});
    return { success: false, error: "Failed to get Accounts" }; // Return instead of throwing to prevent app crash
  };
}

//edit account
export async function editAccount(accountId: string, formData: FormData) {
  try {
    const userId = await getDbUserId();
    if (!userId) return { success: false, error: "User not authenticated" };;

     const edit = await prisma.account.findUnique({
      where: {id: accountId},
      select: {userId: true}
     });

     if (!edit) throw new Error("Account not found");


    const websiteName = formData.get("websiteName") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const hashedPassword = encryptPassword(password);

    const account = await prisma.account.update({
      where: {
        id: accountId,
        userId: userId
      },
      data: {
        websiteName,
        email,
        username,
        password: hashedPassword,
        
      },
    });
    const decryptedAccount = {
      ...account,
      password: decryptPassword(account.password),
    };

    revalidatePath('/dashboard'); // Revalidate after editing the account
    return { success: true, account: decryptedAccount };
  }catch (error) {
    console.error("Error updating account", error);
    return {success: false, error: "Failed to update account"}
  }
}

//delete
export async function deleteAccount(accountId: string) {
  try {
    const userId = await getDbUserId();
    
    const account = await prisma.account.findUnique({
      where: {id: accountId},
      select: {userId: true}
    });

    if (!account) throw new Error("Account not found");
    if (account.userId !== userId) throw new Error("Unauthorized - no delete permission");

    await prisma.account.delete({
      where: {id: accountId},
    });

    revalidatePath('/dashboard');
    return {success: true}

  } catch (error) {
    console.error("Failed to delete account:", error);
    return { success: false, error: "Failed to delete account" };
  }
}