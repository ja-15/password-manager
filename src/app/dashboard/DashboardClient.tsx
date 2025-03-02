"use client";

import AddAccount from '@/components/AddAccount';
import { Account } from '@prisma/client';
import { useState } from 'react';
import PasswordToggle from '@/components/PasswordToggle';
import { deleteAccount } from '@/actions/account.action';

const DashboardClient = ({accounts}: {accounts: Account[]}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState("add");
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);


  const onClose = () => {
    setIsVisible(false);
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
        console.log("Account delete successfully");
      }
    } catch (error) {
      console.log("Error deleting account: ", error)
    }
  }

  const addAccount = () => {
    setIsVisible(true);
    setType("add")
  }
  

  return (
    <div className="max-container items-center justify-center flex dark:bg-slate-950 z-50">
      
      <div className="border border-slate-500/30 w-[1300px] mt-20 h-[70vh] rounded-lg bg-slate-100 px-6 pt-4 overflow-hidden dark:bg-slate-950">
      <div className="flex justify-between items-center my-4 mx-1">
        <h3 className="text-xl font-semibold text-start dark:text-slate-300">List of Accounts</h3>
        
        <button 
          onClick={addAccount}
          className="btn-secondary">Add Account</button>
        </div>
        {/* table */}
         <div className="overflow-y-scroll h-[60vh] z-50">
         <table className="w-full border-collapse border border-slate-400/30 dark:text-slate-300 dark:bg-slate-950 dark:border-slate-700/30">
          <thead>
            <tr className="bg-slate-200 dark:bg-slate-800 dark:border dark:border-slate-700">
                <th className="border border-slate-400/30 px-4 py-2">No.</th>
                <th className="table-border">Website</th>
                <th className="table-border">Email</th>
                <th className="table-border">Username</th>
                <th className="table-border">Password</th>
                <th className="table-border">Created At</th>
                <th className="table-border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              {(accounts || []).map((account, index) => (
                <tr key={account.id}  
                  onClick={(e) => {
                  e.stopPropagation(); // Prevent row click
                  editButton(account);
                }} 
                className="text-start text-sm hover:bg-slate-700/20 cursor-pointer">
                  <td className="table-border">{index + 1}</td>
                  <td className="table-border">{account.websiteName}</td>
                  <td className="table-border">{account.email}</td>
                  <td className="table-border">{account.username}</td>
                  <PasswordToggle password={account.password} />
                  <td className="table-border">{account.createdAt.toISOString().split('T')[0]}</td>
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
                        handleDelete(account.id)
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
       />
    </div>
  )
}

export default DashboardClient