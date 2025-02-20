"use client";

import {SignInButton,SignOutButton, SignUpButton, SignedIn,SignedOut,UserButton} from '@clerk/nextjs'
import Link from 'next/link';
import { SiGoogletagmanager } from "react-icons/si";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { CgClose } from 'react-icons/cg';

export const menu = [
  {href:'#about', name:"About"},
  {href:'#skills', name:"Features"},
  {href:'#projects', name:"Pricing"},
  {href:'#contact', name:"Support"},
]


const NavbarClient = () => {
  const [isShow, setIsShow] = useState(false);
  const navOpen = isShow ? "translate-x-0" : "translate-x-[-100%]"
  console.log(isShow)

  const handleClick = () => {
    setIsShow(true)
  }

  const closeNav = () => {
    setIsShow(false)
  }

  return (
    <>
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
            <SignUpButton mode='modal'>
              <button className='btn-secondary hidden-lg'>
                Sign up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        
          <div className='hidden-sm'>
            <FaBarsStaggered className='size-6 text-sky-600 cursor-pointer'
              onClick={handleClick} />
          </div>
        </div>
        </nav>

        {/* mobile nav */}

    {/* <div className={`${navOpen} text-white fixed inset-0 z-50 bg-black/70 w-full h-screen backdrop-blur-sm`}> */}
    <div className={`${navOpen}text-white bg-slate-300 fixed justify-center flex flex-col h-full transform transition-all duration-500 w-[80%] sm:w-[60%]`} >
     {menu.map((item) => {
      return (
        <Link href={item.href} key={item.name}>
          <p className=''>{item.name}</p>
        </Link>
      )
     })}
     <CgClose onClick={closeNav} className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6"/>
     </div>
    {/* </div> */}
    </>
  )
}

export default dynamic (() => Promise.resolve(NavbarClient), {ssr: false})