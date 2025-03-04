import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props ={
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const PasswordInput = ({value, onChange, name}: Props) => {
  const [showPassword, setShowPassword] = useState(false);


  return (
    <div className="passwordinput-div">
      <input 
        className="w-full outline-none px-1 py-2 text-gray-900 bg-transparent text-sm placeholder-slate-500 dark:text-slate-300"
        type={showPassword ? 'text': 'password'}
        placeholder="password..."
        value={value}
        onChange={onChange}
        name={name}
        required
       />
      <button type="button" className="">
        {showPassword ? 
        <FaEyeSlash
          className="cursor-pointer text-sky-600"
          onClick={() => setShowPassword(!showPassword)}
         /> : 
         <FaEye
          className="cursor-pointer text-sky-600"
          onClick={() => setShowPassword(!showPassword)} />}
        
      </button>
      
    </div>
  )
}

export default PasswordInput