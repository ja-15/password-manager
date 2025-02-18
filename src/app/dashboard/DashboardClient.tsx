"use client";

import AddAccount from '@/components/AddAccount'
import { Account } from '@prisma/client';
import { useState } from 'react';

const DashboardClient = ({accounts}: {accounts: Account[]}) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClose = () => {
    setIsVisible(false);
  }

  return (
    <div className="max-container items-center justify-center flex">
      
      <div className="border border-slate-500/30 w-[80%] mt-20 h-[70vh] rounded-lg bg-slate-100 px-6">
      <div className="flex justify-between items-center my-4 mx-1">
        <h3 className="text-xl font-semibold text-start">List of Accounts</h3>
        
        <button 
          onClick={() => setIsVisible(true)}
          className="border border-sky-600 p-2 rounded-lg hover:bg-sky-600 hover:text-white">Add Account</button>
        </div>
        {/* table */}
         {/* Table */}
         <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-slate-200">
                <th className="border border-gray-300 px-4 py-2">No.</th>
                <th className="border border-gray-300 px-4 py-2">Website</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Password</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              {(accounts || []).map((account, index) => (
                <tr key={account.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{account.websiteName}</td>
                  <td className="border border-gray-300 px-4 py-2">{account.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{account.username}</td>
                  <td className="border border-gray-300 px-4 py-2">{account.password}</td>
                  <td className="border border-gray-300 px-4 py-2">{account.createdAt.toISOString().split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddAccount
        isVisible={isVisible}
        onClose={onClose}
       />
    </div>
  )
}

export default DashboardClient