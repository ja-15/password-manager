"use client";

import { addNewAccount, editAccount } from "@/actions/account.action";
import { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { newPassword } from "@/utils/newPassword";
import PasswordInput from "./PasswordInput";
import { Account } from "@prisma/client";

const AddAccount = ({type, isVisible, onClose, account}: {type: string, isVisible: boolean, onClose: () => void, account: Account | null}) => {
  const [formData, setFormData] = useState({
    websiteName: "",
    email: "",
    username: "",
    password: ""
  });
  const [error, setError] = useState("")

  useEffect(() => {
    if (account) {
      setFormData({
        websiteName: account.websiteName,
        email: account.email,
        username: account.username || '',
        password: account.password,
      });
    }
  }, [account]);

  if (!isVisible) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const generatePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const password = newPassword();
    setFormData((prev) => ({
      ...prev,
      password
    }))
  }

  //add
  const addAccount = async(e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!formData.websiteName || !formData.password) {
      setError("Please fill all required fields");
      return;
    };
    if (!formData.email || !formData.email.includes('@')) {
      setError("Invalid email address");
      return;
    }
    try {
      const result = await addNewAccount(formData.websiteName, formData.email, formData.username, formData.password)
      if (result?.success) {
        console.log("New account added");
        onClose();
      }
    } catch (error) {
      console.error("Failed to add new account", error)
    }finally {
      setFormData({
        websiteName: "",
        email: "",
        username: "",
        password: ""
      })
    }
  }


  //edit
  const updateAccount = async(e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!account) return;

    try {
      const formDataObj = new FormData();
      formDataObj.append('websiteName', formData.websiteName);
      formDataObj.append('email', formData.email);
      formDataObj.append('username', formData.username);
      formDataObj.append('password', formData.password);

      const result = await editAccount(account.id, formDataObj);
      if (result.success) {
        console.log('Account updated successfully');
        onClose();
      } else {
        setError(result.error || 'Failed to update account');
      }
    } catch (error) {
      console.error('Failed to update account', error);
      setError('Failed to update account');
    }
  };

  //submit button
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (type === "add") {
      addAccount(e)
    }else {
      updateAccount(e)
    }
  }

  return (

    <div className='fixed inset-0 bg-black/40 flex justify-center items-center backdrop-blur-sm'>
      <div className='relative w-[380px] bg-white backdrop-blur-sm rounded-xl shadow-xl flex flex-col shrink-0 items-center justify-center py-6 dark:bg-slate-950/20 dark:border dark:border-slate-500 dark:text-slate-300'>
      <h3 className="font-bold text-2xl">{type === "add" ? "Register Account" : "Edit Account"}</h3>
        <div className="absolute right-2 top-2 rounded-full">
          <button className="" onClick={() => onClose()}>
            <IoCloseCircleOutline className="size-6 text-slate-600 dark:text-slate-300 dark:hover:text-sky-600 hover:text-sky-600 transition-all duration-300 ease-in-out cursor-pointer" />
          </button>
        </div>

      <form className="flex flex-col items-center mx-auto dark:text-slate-300" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="websiteName" className=" text-gray-900 font-semibold text-sm dark:text-slate-300">Website Name<span className="text-xs text-red-500">*</span></label>
              <input 
                type="text" 
                id="websiteName"
                name="websiteName"
                value={formData.websiteName}
                onChange={handleChange} 
                className="input-text" 
                placeholder="google.com" required />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className=" text-gray-900 font-semibold text-sm dark:text-slate-300">Email<span className="text-xs text-red-500">*</span></label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange} 
                className="input-text" 
                placeholder="john@email.com..." required />
            </div>

            <div className="flex flex-col">
              <label htmlFor="username" className=" text-gray-900 font-semibold text-sm dark:text-slate-300">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username"
                value={formData.username}
                onChange={handleChange} 
                className="input-text" 
                placeholder="myusername..." />
            </div>
            

            <div className="flex flex-col">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-gray-900 font-semibold text-sm dark:text-slate-300">Password<span className="text-xs text-red-500">*</span></label>
                <button 
                  onClick={generatePassword}
                  className="text-sm pr-2 text-sky-600 hover:underline hover:text-sky-400 cursor-pointer transition-all duration-300">
                  Generate</button>
              </div>
                <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                />
            </div>
          </div>
          {error && <p className="text-red-600 text-xs place-self-start mt-1">{error}</p>}
      <button type="submit" 

        className="mt-8 mb-2 btn-primary w-full py-2">
         {type === "add" ? "Add new account" : "Edit Account" }
        </button>
    </form>

    
    </div>
    <div>
    </div>
   
    </div>
  )
}

export default AddAccount