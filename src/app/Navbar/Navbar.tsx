import { syncUser } from '@/actions/user.action';
import {SignInButton,SignOutButton,SignedIn,SignedOut,UserButton} from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { SiGoogletagmanager } from "react-icons/si";
import { FaUser } from "react-icons/fa6";

const menu = [
  {href:'#about', name:"About"},
  {href:'#skills', name:"Features"},
  {href:'#projects', name:"Pricing"},
  {href:'#contact', name:"Support"},
]

const Navbar = async() => {
  const user = await currentUser();
  if (user) await syncUser();
  return (
    <nav className='max-container flex justify-between h-14 mt-4 items-center bg-white drop-shadow-3xl rounded-2xl px-2 border'>
      <div className='flex gap-1 align-middle text-black bg-white px-2 py-1 rounded-full items-center'>
      <SiGoogletagmanager className='text-sky-600 size-6' />
      <h1 className='py-0.5 font-bold text-lg'>PASMAN</h1>
      </div>
        
        <div>
          <ul className='flex gap-6'>
          {menu.map((item) => (
            <li key={item.name}>
              <Link href={item.href}
              className='font-semibold text-lg '>
              {item.name}
              </Link>
            </li>
          ))}
          </ul>
        </div>
        <div className='flex'>
          <Link href='/dashboard'>
            <button className="btn-primary mr-4">
              Dashboard
            </button>
          </Link>

        <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard' mode='modal'>

              <button className='btn-secondary flex items-center gap-2'>
              <FaUser />
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          
            <SignedIn>
              <SignOutButton>
                <button className='btn-primary'>
                    Logout
                  </button>
              </SignOutButton>
          </SignedIn>

          
      </div>
      </nav>

  )
}

export default Navbar