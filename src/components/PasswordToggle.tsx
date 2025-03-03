"use client"; 

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import dynamic from 'next/dynamic';
import { IoIosCopy } from "react-icons/io";


const PasswordToggle = ({password}: {password:string}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = async() => {
    try {
      await navigator.clipboard.writeText(password);
      console.log("Password copied to clipboard");
    } catch (error) {
      console.error("Failed to copy password", error);
    }
  }
  return (
    <td className="table-border flex items-center justify-between">
      {showPassword ? password : "●".repeat(16) }
      <div className="flex gap-3 ml-4">
      <button className="cursor-pointer hover:text-sky-600 transform transition-all duration-300 ease-in-out"
      onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <FaEyeSlash  /> : <FaEye />}
      </button>
      <IoIosCopy 
        onClick={handleCopy}
        className="hover:text-sky-600 transition-all duration-300 ease-in-out" />
      </div>
    </td>
  )
}

export default dynamic(() => Promise.resolve(PasswordToggle), {ssr: false});