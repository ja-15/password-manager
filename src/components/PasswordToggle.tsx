"use client"; 

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import dynamic from 'next/dynamic';



const PasswordToggle = ({password}: {password:string}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <td className="table-border flex items-center justify-between">
      {showPassword ? password : "●".repeat(16) }
      <button className="cursor-pointer hover:text-sky-600 transform transition-all duration-300 ease-in-out"
      onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <FaEyeSlash  /> : <FaEye />}
      </button>
    </td>
  )
}

export default dynamic(() => Promise.resolve(PasswordToggle), {ssr: false});