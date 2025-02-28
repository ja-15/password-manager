"use client";

import {SignInButton,SignOutButton, SignUpButton, SignedIn,SignedOut,UserButton} from '@clerk/nextjs'
import Link from 'next/link';
import { SiGoogletagmanager } from "react-icons/si";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { CgClose } from 'react-icons/cg';
import { FaUser } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import DarkModeToggle from "@/components/DarkModeToggle";

export const menu = [
  {href:'#about', name:"About"},
  {href:'#skills', name:"Features"},
  {href:'#projects', name:"Pricing"},
  {href:'#contact', name:"Support"},
]


const NavbarClient = () => {
  const [isShow, setIsShow] = useState(false);
  const navOpen = isShow ? "translate-x-0" : "translate-x-[-100%]"

  const handleClick = () => {
    setIsShow(true)
  }

  const closeNav = () => {
    setIsShow(false)
  }

  return (
    <div className='dark:slate-950 pt-4'>
    <nav className='md:max-container flex justify-between h-14 mt-4  items-center dark:bg-slate-800 dark:border-slate-700 bg-white drop-shadow-3xl rounded-xl px-2 border'>
    <Link href='/'>
    <div className='flex gap-1 align-middle text-black py-1 items-center'>
    <SiGoogletagmanager className='size-6 text-sky-600'/>
    <h1 className='font-semibold text-lg py-0.5 dark:text-slate-300'>PASMAN</h1>
    </div>
      </Link>
    <div className='flex gap-4 font-semibold max-lg:hidden'>
    {menu.map((item) => {
      return (
        <Link href={item.href} key={item.name}>
          <p className='dark:text-slate-300'>{item.name}</p>
        </Link>
      )
     })}
    </div>

    <div className='flex gap-2 items-center'>
          <SignedOut>
          <SignInButton forceRedirectUrl='/dashboard' mode='modal'>
            <button className='btn-primary max-lg:hidden flex gap-2 items-center'>
              Sign in
              <IoIosLogIn className='size-5' />
            </button>
          </SignInButton>
            <SignUpButton mode='modal'>
              <button className='btn-secondary max-lg:hidden flex gap-2 items-center'>
              
                Sign up
                <FaUser className='size-4' />
              </button>
            </SignUpButton>
          </SignedOut>

          <div className='max-lg:hidden'>
          <SignedIn>
            <UserButton />
          </SignedIn>
          </div>

          <div className='lg:hidden'>
            <FaBarsStaggered className='size-6 text-sky-600 cursor-pointer'
              onClick={handleClick} />
          </div>
          <DarkModeToggle />
        </div>
        </nav>

        {/* mobile nav */}

    <div className={`${navOpen} text-white fixed inset-0 z-50 bg-black/70 w-full h-screen backdrop-blur-sm transform transition-all duration-500`}>

    <div className={`${navOpen}text-white px-6 bg-black fixed flex flex-col h-full transform transition-all duration-500 w-[80%]`} >
   
     {menu.map((item) => {
      return (
        <Link href={item.href} key={item.name}>
          <p className='pt-4 mt-3 font-semibold text-2xl dark:text-slate-300'>{item.name}</p>
        </Link>
      )
     })}
  <div className='flex flex-col mt-4'>
    <SignedOut>
          <SignInButton forceRedirectUrl='/dashboard' mode='modal'>
            <button className='btn-primary w-fit mt-4 text-2xl font-semibold flex items-center gap-2'>
              Sign in
              <IoIosLogIn className='size-7' />
            </button>
          </SignInButton>
            <SignUpButton mode='modal'>
              <button className='btn-secondary w-fit mt-4 text-2xl font-semibold flex items-center gap-2'>
                Sign up
                <FaUser className='size-5' />
              </button>
            </SignUpButton>
          </SignedOut>

          </div>
 


     <CgClose onClick={closeNav} className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6"/>
     </div>
    </div>
    
    </div>
  )
}

export default dynamic (() => Promise.resolve(NavbarClient), {ssr: false})