"use client";

import { addNewAccount } from "@/actions/account.action";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import GeneratePassword from "./GeneratePassword";
import { newPassword } from "@/utils/newPassword";

const AddAccount = ({isVisible, onClose}: {isVisible: boolean, onClose: () => void}) => {
  const [formData, setFormData] = useState({
    websiteName: "",
    username: "",
    email: "",
    password: ""
  });
  if (!isVisible) return null;

  const handleSubmit = async(e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const result = await addNewAccount(formData.websiteName, formData.username, formData.email, formData.password)
      if (result?.success) {
        console.log("New account added");
        onClose();
      }
    } catch (error) {
      console.error("Failed to add new account", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const generatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const password = newPassword();
    setFormData((prev) => ({
      ...prev,
      password
    }))
  }


  return (

    <div className='fixed inset-0 bg-black/40 flex justify-center items-center backdrop-blur-sm'>
      <div className='relative h-[500px] w-[400px] bg-white backdrop-blur-sm rounded-xl shadow-xl flex flex-col shrink-0 p-4 items-center'>
      <h3 className="mt-4 font-bold text-2xl">Enter your details below</h3>
        <div className="absolute right-2 top-2 rounded-full">
          <button className="" onClick={() => onClose()}>
            <IoCloseCircleOutline className="size-8 hover:text-slate-600 text-sky-600 transition-all duration-300 ease-in-out cursor-pointer" />
          </button>
        </div>

      <form className="flex flex-col items-center mx-auto">

          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="websiteName" className=" text-gray-900 font-semibold">Website Name</label>
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
              <label htmlFor="username" className=" text-gray-900 font-semibold">Username</label>
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
              <label htmlFor="email" className=" text-gray-900 font-semibold">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange} 
                className="input-text" 
                placeholder="john@email.com..." required />
            </div>

            <div className="mb-3 flex flex-col">
              <div className="flex justify-between">
                <label htmlFor="password" className=" text-gray-900 font-semibold">Password</label>
                <button 
                  onClick={generatePassword}
                  className="text-sm pr-2 text-sky-600 hover:underline hover:text-sky-400 cursor-pointer transition-all duration-300">
                  
                  Generate</button>
              </div>
              <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange} 
                className="input-text" 
                placeholder="password..." required />
            </div>
          </div>
      <button type="submit" 
        onClick={handleSubmit}
        className="mt-4 btn-primary">
        Add new account
        </button>
    </form>

    
    </div>
    <div>
    </div>
   
    </div>
  )
}

export default AddAccount