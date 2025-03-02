import { SignUpButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { IoIosArrowDroprightCircle } from "react-icons/io";

export default async function Home() {
  const user = await currentUser()
  return (
    <div className="w-full flex justify-center items-center flex-col z-50">
     <h1 className="head_text">Generate, store, and autofill complex <span className="hidden sm:inline"> <br /> </span>
     <span> passwords effortlessly.</span>
     </h1>
     <p className="mt-6 text-[16px] md:text-lg text-slate-500 dark:text-slate-400 text-center font-medium">Stay Secure, Stay In Control Stop worrying about forgotten passwords or security breaches. 
     <span className="hidden sm:inline"> <br /> </span>
      Start managing your credentials the smart way today!</p>

      {!user ? (
      <SignUpButton mode='modal'>
      <button className="btn-primary mt-10 flex items-center gap-2">
        Get Started 
        <IoIosArrowDroprightCircle className="size-5" />
      </button>
      </SignUpButton>
      ) : (
      <Link href={'/dashboard'}>
      <button className="btn-primary mt-10 flex items-center gap-2">
        Dashboard 
        <IoIosArrowDroprightCircle className="size-5" />
      </button>
      </Link>
      )}
    </div>
  );
}