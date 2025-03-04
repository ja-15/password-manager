"use client";

import AddAccount from '@/components/AddAccount';
import { Account} from '@/actions/account.action';
import { useState } from 'react';
import PasswordToggle from '@/components/PasswordToggle';
import { deleteAccount } from '@/actions/account.action';
import { Toaster, toast } from "sonner";
import DeleteModal from '@/components/DeleteModal';
import { TbInfoTriangle } from "react-icons/tb";


const DashboardClient = ({accounts}: {accounts: Account[]}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState("add");
  const [isDeleteModelVisible, setIsDeleteModelVisible] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accountList, setAccountList] = useState(accounts);


  const onClose = () => {
    setIsVisible(false);
    setSelectedAccount(null);
  }

  const editButton = (account: Account) => {
    setIsVisible(true)
    setType("edit")
    setSelectedAccount(account);
  }

  const handleDelete = async(accountId: string) => {
    try {
      const result = await deleteAccount(accountId)
      if (result.success) {
        console.log("Account deleted successfully");
        setAccountList((prev) => prev.filter((account) => account.id !== accountId));
        toast.info("Account deleted successfully!", {style: {background: '#33150e'}})
      }
    } catch (error) {
      console.log("Error deleting account: ", error)
    }
  }

  const addAccount = () => {
    setIsVisible(true);
    setType("add")
  }
  
  const DeleteModalClose = () => {
    setIsDeleteModelVisible(false)
  }

  const handleAddAccount = (newAccount: Account) => {
    setAccountList((prev) => [newAccount, ...prev]);
  };

  const handleUpdateAccount = (updatedAccount: Account) => {
    setAccountList((prev) =>
      prev.map((account) => (account.id === updatedAccount.id ? updatedAccount : account))
    );
  };

  
  return (
    <div className="max-container items-center justify-center flex dark:bg-slate-950">

      <Toaster 
        position="top-center"
        offset="9vh"
        icons={{info: <TbInfoTriangle />}}
        toastOptions={{
        style: {
          background: '#204d28',
          border: 'none',
          color: "white"
        }
        }}  />
      
      <DeleteModal 
        isDeleteModelVisible={isDeleteModelVisible}
        onDelete={handleDelete}
        onClose={DeleteModalClose}
        accountId={selectedAccount ? selectedAccount.id : null} // Pass selectedAccount id
      />

      <div className="border border-slate-500/30 w-[1300px] mt-20 h-[70vh] rounded-lg bg-slate-100 px-6 pt-4 overflow-hidden dark:bg-slate-950">
      <div className="flex justify-between items-center my-4 mx-1">
        <h3 className="text-xl font-semibold text-start dark:text-slate-300">List of Accounts</h3>
        
        <button 
          onClick={addAccount}
          className="btn-secondary">Add Account</button>
        </div>
        {/* table */}
         <div className="overflow-auto rounded-sm shadow-sm dark:shadow-slate-800">
         <table className="w-full dark:text-slate-300 dark:bg-slate-950">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800 border-b-2 dark:border-slate-700/50 border-slate-500/20">
                <th className="table-border w-10">No.</th>
                <th className="table-border">Website</th>
                <th className="table-border">Email</th>
                <th className="table-border max-md:hidden">Username</th>
                <th className="table-border">Password</th>
                <th className="table-border w-20 max-lg:hidden">Created At</th>
                <th className="table-border">Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y dark:divide-slate-700/40'>
              {/* Example row */}
              {(accountList || []).map((account, index) => (
                <tr key={account.id}  
                className="text-start text-sm hover:bg-slate-700/20 dark:hover:bg-slate-500/20 cursor-pointer dark:bg-slate-950 bg-slate-50">
                  <td className="table-border">{index + 1}</td>
                  <td className="table-border">{account.websiteName}</td>
                  <td className="table-border">{account.email}</td>
                  <td className="table-border max-md:hidden">{account.username}</td>
                  <PasswordToggle password={account.password} />
                  <td className="table-border max-lg:hidden">{account.createdAt.toISOString().split('T')[0]}</td>
                  <td className="table-border space-x-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        editButton(account);
                      }}
                      className="text-sky-600 hover:underline hover:text-sky-400 cursor-pointer transition-all duration-300 ease-in-out">Edit</button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAccount(account); // Set the selected account
                        setIsDeleteModelVisible(true)
                      }}

                      className="text-red-500 hover:underline hover:text-red-400 cursor-pointer transition-all duration-300 ease-in-out">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddAccount
        isVisible={isVisible}
        onClose={onClose}
        type={type}
        account={type === "edit" ? selectedAccount : null}  
        onAddAccount={handleAddAccount}
        onUpdateAccount={handleUpdateAccount}
       />
    </div>
  )
}

export default DashboardClient