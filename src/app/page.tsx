import { SignUpButton } from '@clerk/nextjs';
import { IoIosArrowDroprightCircle } from "react-icons/io";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col">
     <h1 className="head_text">Generate, store, and autofill complex <span className="hidden sm:inline"> <br /> </span>
     <span> passwords effortlessly.</span>
     </h1>
     <p className="mt-6 text-[16px] md:text-lg text-slate-500 text-center font-medium">Stay Secure, Stay In Control Stop worrying about forgotten passwords or security breaches. 
     <span className="hidden sm:inline"> <br /> </span>
      Start managing your credentials the smart way today!</p>

      <SignUpButton mode='modal'>
      <button className="btn-primary mt-10 flex items-center gap-2">
        Get Started 
        <IoIosArrowDroprightCircle className="size-5" />
      </button>
      </SignUpButton>
    </div>
  );
}