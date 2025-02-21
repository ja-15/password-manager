"use client";

import AddAccount from '@/components/AddAccount';
import { Account } from '@prisma/client';
import { useState } from 'react';
import PasswordToggle from '@/components/PasswordToggle';

const DashboardClient = ({accounts}: {accounts: Account[]}) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClose = () => {
    setIsVisible(false);
  }

  return (
    <div className="max-container items-center justify-center flex">
      
      <div className="border border-slate-500/30 w-[1300px] mt-20 h-[70vh] rounded-lg bg-slate-100 px-6 pt-4 overflow-hidden">
      <div className="flex justify-between items-center my-4 mx-1">
        <h3 className="text-xl font-semibold text-start">List of Accounts</h3>
        
        <button 
          onClick={() => setIsVisible(true)}
          className="btn-secondary">Add Account</button>
        </div>
        {/* table */}
         <div className="overflow-y-scroll h-[60vh]">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-slate-200">
                <th className="border border-gray-300 px-4 py-2">No.</th>
                <th className="border border-gray-300 px-4 py-2">Website</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Password</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              {(accounts || []).map((account, index) => (
                <tr key={account.id} className="text-start">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{account.websiteName}</td>
                  <td className="border border-gray-300 px-4 py-2">{account.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{account.username}</td>
                  <PasswordToggle password={account.password} />
                  <td className="border border-gray-300 px-4 py-2">{account.createdAt.toISOString().split('T')[0]}</td>
                  <td className="border border-gray-300 px-4 py-2 space-x-4">
                    <button className="text-sky-600 hover:underline hover:text-sky-400 cursor-pointer transition-all duration-300 ease-in-out">Edit</button>
                    <button className="text-red-500 hover:underline hover:text-red-400 cursor-pointer transition-all duration-300 ease-in-out">Delete</button>
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
       />
    </div>
  )
}

export default DashboardClient