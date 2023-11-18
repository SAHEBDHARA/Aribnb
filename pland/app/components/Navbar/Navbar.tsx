'use client'
import { User } from '@prisma/client'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import Usermanue from './Usermanue'

interface NavbarProps {
  currentUser?: User  | null; 
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  return (
    <div className='fixed bg-white w-full z-10 shadow-sm'>
     <div className='py-4 border-b-[1px]'>
      <Container>
        <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
          <Logo/>
          <Search/>
          <Usermanue currentUser={currentUser}/>
        </div>
      </Container>
     </div>
      </div>
  )
}

export default Navbar