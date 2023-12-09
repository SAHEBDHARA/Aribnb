'use client'
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'
import { useCallback, useState } from 'react'
import MenuItem from './MenuItem'
import useRegisterModel from '@/app/hooks/UseRegisterModel'
import useLoginModel from '@/app/hooks/UserLoginModel'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import useRentModel from '@/app/hooks/UseRentModel'
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/app/types'

interface UsermanueProps {
    currentUser?: SafeUser | null; 
}

const Usermanu: React.FC<UsermanueProps> = ({
    currentUser
}) => {
    const [isOpen, setIsopen] = useState(false); 
    const registerModel = useRegisterModel(); 
    const loginModel = useLoginModel(); 
    const rentModel = useRentModel()
    const router = useRouter()

    const toggleOpen = useCallback(()=>{
        setIsopen((value)=> !value)
    },[])

    const onRent = useCallback(()=>{
        if(!currentUser){
            return loginModel.onOpen(); 
        }
        // Open model
        rentModel.onOpen();
        
    },[currentUser, loginModel, rentModel])
  return (
    <div className="relative ">
        <div className="flex flex-row items-center gap-3 ">
            <div 
            onClick={onRent} 
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                Aribnb Your home 
            </div>
            <div 
            onClick={toggleOpen} 
            className="p-4 md:px-2 md:py-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition ">
                <AiOutlineMenu/>
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image} /> 
                </div>
            </div>
        </div>
        {isOpen && (
            <div className=' absolute rounded-xl shadow-md w-[40vh] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm '>
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                     <MenuItem
                      onClick={()=> router.push('/trips')}
                      label='My trips'
                     />
                     <MenuItem
                      onClick={()=>router.push('/favorites')}
                      label='My Fevorites'
                     />
                     <MenuItem
                      onClick={()=>router.push('/reservations')}
                      label='My reservatioins'
                     />
                     <MenuItem
                      onClick={()=>router.push('/properties')}
                      label='My properties'
                     />
                     <MenuItem
                      onClick={rentModel.onOpen}
                      label='Airbnb My home'
                     />
                     <hr/>
                     <MenuItem
                      onClick={()=>signOut()}
                      label='Logout'
                     />
                    </>
                    ):(
                    <>
                     <MenuItem
                      onClick={loginModel.onOpen}
                      label='login'
                     />
                     <MenuItem
                      onClick={registerModel.onOpen}
                      label='Sign Up'
                     />
                    </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default Usermanu