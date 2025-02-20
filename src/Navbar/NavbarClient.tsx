"use client";

import {SignInButton,SignOutButton,SignedIn,SignedOut,UserButton} from '@clerk/nextjs'
import Link from 'next/link';
import { SiGoogletagmanager } from "react-icons/si";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState } from 'react';

const NavbarClient = () => {
  const [isShow, setIsShow] = useState(false)
  return (
    <nav className='max-container flex justify-between h-14 mt-4 items-center bg-white drop-shadow-3xl rounded-xl px-2 border'>
      <div className='flex gap-1 align-middle text-black bg-white py-1 items-center'>
      <SiGoogletagmanager className='size-6 text-sky-600'/>
      <h1 className='font-semibold text-lg py-0.5'>PASMAN</h1>
      </div>
        
      <div className='flex gap-4 items-center'>
        <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard' mode='modal'>
              <button className='btn-primary hidden-lg'>
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          
            <SignedIn>
              <SignOutButton>
                <button className='btn-primary hidden-lg'>
                    Logout
                  </button>
              </SignOutButton>
          </SignedIn>
          
            <div className='hidden-sm'>
              <FaBarsStaggered className='size-6 text-sky-600 cursor-pointer'
                onClick={() => setIsShow(!isShow)} />
            </div>
          </div>
          </nav>
  )
}

export default NavbarClient