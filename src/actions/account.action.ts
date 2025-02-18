"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";

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

  try {
    const userId = await getDbUserId();

    if (!userId) return;

    const account = await prisma.account.create({
      data: {
        websiteName,
        email,
        username,
        password,
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

    // const formattedAccounts = accounts.map(account => ({
    //   ...account,
    //   createdAt: account.createdAt.toISOString()
    // }));
    
    return {success: true, accounts};
  } catch (error) {
    console.log("Error in getAccounts", error);
    throw new Error("Failed to get Accounts");
  };
}
