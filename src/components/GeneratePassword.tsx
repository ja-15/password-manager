import React from 'react'
import { newPassword } from '@/utils/newPassword'

const GeneratePassword = () => {

  const handleChange = () => {

  }
  
  return (
    <div className='flex gap-4'>
      
      <div className="mb-3 flex flex-col">
        <label htmlFor="email" className=" text-gray-900 text-sm ">How many letters?</label>
        <input 
          type="number" 
          id="letter" 
          name="letter"
          // value={''}
          // onChange={handleChange} 
          className="generatePassword-text" 
          required />
      </div>

      <div className="mb-3 flex flex-col">
        <label htmlFor="email" className=" text-gray-900 text-sm ">How many numbers?</label>
        <input 
          type="number" 
          id="letter" 
          name="letter"
          // value={''}
          // onChange={handleChange} 
          className="generatePassword-text" 
          required />
      </div>

      <div className="mb-3 flex flex-col">
        <label htmlFor="email" className=" text-gray-900 text-sm ">How many symbols?</label>
        <input 
          type="number" 
          id="letter" 
          name="letter"
          // value={''}
          // onChange={handleChange} 
          className="generatePassword-text" 
          required />
      </div>
        <button>Add</button>
  
      
    </div>
  )
}

export default GeneratePassword