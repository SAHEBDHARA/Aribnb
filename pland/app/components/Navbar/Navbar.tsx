'use client'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import Usermanue from './Usermanue'

const Navbar = () => {
  return (
    <div className='fixed bg-white w-full z-10 shadow-sm'>
     <div className='py-4 border-b-[1px]'>
      <Container>
        <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
          <Logo/>
          <Search/>
          <Usermanue/>
        </div>
      </Container>
     </div>
      </div>
  )
}

export default Navbar