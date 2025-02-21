"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { encryptPassword, decryptPassword } from "@/utils/cryptoUtils";

type Account = {
  websiteName: string;
  email: string;
  username?: string | null;
  password: string;
  createdAt:  Date
};
type NewAccount = Omit<Account, 'createdAt'>;


export async function addNewAccount(
  websiteName: string,
  email: string,
  username: string | null,
  password: string
): Promise<{success: boolean; account?: NewAccount; error?: string} | undefined> {

  const hashedPassword = encryptPassword(password);
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
      }
    })
    
    revalidatePath('/dashboard')
    const {createdAt, ...accountWithoutCreatedAt} = account;
    
    return {success: true, account: accountWithoutCreatedAt}
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
    })


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
    console.log("Error in getAccounts", error);
    return { success: false, error: "Failed to get Accounts" }; // Return instead of throwing to prevent app crash
  };
}
