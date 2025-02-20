import { syncUser } from '@/actions/user.action';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import DesktopNavbar from './NavbarClient';


const Navbar = async() => {
  const user = await currentUser();
  if (user) await syncUser();
  return (
    <>
    <DesktopNavbar />
    </>
        


  )
}

export default Navbar