import {menu} from '@/constants/constants';
import Link from 'next/link';
import { CgClose } from 'react-icons/cg';
import { FaBarsStaggered } from 'react-icons/fa6';

type Props = {
  showNav: boolean,
  closeNav: () => void;
}
const MobileNavbar = ({showNav, closeNav}: Props) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-full";

  const openNav = () => {
    showNav = true;
  }

  return (
    <div className='md:hidden'>
      <div className={`${navOpen} mobile-bg-blur`}>
      </div>
      <FaBarsStaggered onClick={openNav}  />
      <div className={`${navOpen} nav-links`}>
        {menu.map((item) => {
          return (
            <Link href={item.href} key={item.name}>
              <p className=' w-fit text-[20px] ml-12 border-b-[1.5px] sm:text-[30px]'>{item.name}</p>
            </Link>
          )
})}

      <CgClose onClick={closeNav} className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6"/>
     
      </div>
    </div>
  )
}

export default MobileNavbar