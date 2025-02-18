import { syncUser } from '@/actions/user.action';
import {SignInButton,SignOutButton,SignedIn,SignedOut,UserButton} from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { LuKey } from "react-icons/lu";

const Navbar = async() => {
  const user = await currentUser();
  if (user) await syncUser();
  return (
    <nav className='max-container flex justify-between h-14 mt-4 items-center bg-white drop-shadow-3xl rounded-full px-2 border'>
      <div className='flex gap-1 align-middle text-black bg-white px-2 py-1 rounded-full'>
      <LuKey className='' /> 
      <h1 className='font-light py-0.5'>Pasman</h1>
      </div>
        

        <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard' mode='modal'>
              <button className=' bg-sky-600 text-white px-6 py-2 rounded-full hover:bg-sky-500'>
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          
            <SignedIn>
              <SignOutButton>
                <button className=' bg-sky-600 text-white px-6 py-2 rounded-full hover:bg-sky-500'>
                    Logout
                  </button>
              </SignOutButton>
          </SignedIn>
        

      </nav>

  )
}

export default Navbar