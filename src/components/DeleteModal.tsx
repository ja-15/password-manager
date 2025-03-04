import React from 'react'
import { FaCircleInfo } from "react-icons/fa6";

const DeleteModal = ({onDelete, onClose, isDeleteModelVisible, accountId}: {onDelete:(accountId: string) => void , onClose: () => void, isDeleteModelVisible: boolean, accountId: string | null}) => {

  if (!isDeleteModelVisible) return null
  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center backdrop-blur-xs '>
      <div className='delete-modal-div'>
      <FaCircleInfo className='dark:text-slate-300 text-slate-700 size-8 mb-4' />
      <p className='text-lg dark:text-slate-300 text-slate-950'>Are you sure you want to delete this account?</p>
      <div className='flex gap-10 mt-6'>
        <button 
             onClick={() => {
              if (accountId) onDelete(accountId); // Call onDelete with accountId
              onClose();
            }}
          className='btn-primary py-1.5'>Delete</button>
        <button 
          onClick={onClose}
          className='btn-secondary py-1.5'>Cancel</button>
      </div>
      </div> 
    </div>
  )
}

export default DeleteModal