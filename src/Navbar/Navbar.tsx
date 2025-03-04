
import { currentUser } from '@clerk/nextjs/server';
import NavbarClient from './NavbarClient';
import { syncUser } from '@/actions/user.action';


const Navbar = async() => {
 const user = await currentUser();
 if(user) await syncUser();

 
  return (

    <NavbarClient />
  )

}

export default Navbar