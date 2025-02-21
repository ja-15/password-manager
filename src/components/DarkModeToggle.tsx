import React from 'react'

const DarkModeToggle = () => {
  return (
    <label className="inline-flex items-center cursor-pointer flex-col max-md:hidden">
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
  <input type="checkbox" value="" className="sr-only peer"/>
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
   peer-focus:ring-sky-300 dark:peer-focus:ring-sky-600 rounded-full peer dark:bg-gray-700 
   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
   after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 
   after:border after:rounded-full after:h-5 after:w-5 after:transition-alldark:border-gray-600 
   peer-checked:bg-sky-600 dark:peer-checked:bg-sky-600"></div>
  
</label>
  )
}

export default DarkModeToggle