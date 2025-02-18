"use client";

import { addNewAccount } from "@/actions/account.action";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import GeneratePassword from "./GeneratePassword";

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


  return (

    <div className='fixed inset-0 bg-black/25 flex justify-center items-center'>
      <div className='relative h-[60%] w-[28%] bg-white backdrop-blur-lg rounded-xl shadow-xl'>
        <div className="absolute right-2 top-2 rounded-full cursor-pointer">
          <button className="" onClick={() => onClose()}>
            <IoCloseCircleOutline className="size-8 text-slate-300 hover:text-white transition-all duration-300 ease-in-out" />
          </button>
        </div>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center mx-auto">
      <div className="mt-6 mb-3 flex flex-col">
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

      <div className="mb-3 flex flex-col">
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

      <div className="mb-3 flex flex-col">
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
        <label htmlFor="password" className=" text-gray-900 font-semibold">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password"
          value={formData.password}
          onChange={handleChange} 
          className="input-text" 
          placeholder="password..." required />
      </div>
      <GeneratePassword />
      <button type="submit" 
        className="text-white bg-sky-600 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Add new account
        </button>
        
    </form>
    
        </div>
    </div>
  )
}

export default AddAccount