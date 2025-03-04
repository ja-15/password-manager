import { getAccounts } from "@/actions/account.action";
import DashboardClient from "./DashboardClient";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const Dashboard = async() => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");

  
  }
  const { success, accounts, error } = await getAccounts();
  if (!success) {
    console.error(error);
    return <div>Failed to load accounts</div>;
  }

  return (
    <DashboardClient accounts={accounts || []}  />
  )
}

export default Dashboard