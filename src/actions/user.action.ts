"use server";

import prisma from "@/lib/prisma";
import {auth, currentUser} from '@clerk/nextjs/server';

//Add User to Db
export async function syncUser() {
  try {
    const {userId} = await auth();
    const user = await currentUser();

    if (!userId || !user) return;
    
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId:userId
      }
    })
    if (existingUser) return existingUser;

    const dbUser = await prisma.user.create({
      data: {
        clerkId:userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl
      }
    })
    return dbUser;

  } catch (error) {
    console.log("Error adding user", error)
  }
}

//GEt - fetch data from PostgreSQL
export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId
    }
  })
}

//Get userId
export async function getDbUserId() {
  const {userId: clerkId} = await auth();
  if (!clerkId) return null;

  const user = await getUserByClerkId(clerkId);

  if (!user) throw new Error("User not found");

  return user.id
}