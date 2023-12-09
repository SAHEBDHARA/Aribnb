'use client'
import useCountries from "@/app/hooks/UseCountry";
import useSearchModel from "@/app/hooks/useSearchModel"
import { differenceInDays } from "date-fns";
import {  useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {BiSearch} from "react-icons/bi"


const Search = () => {
  const searchModle = useSearchModel(); 
  const params = useSearchParams(); 
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount');


  const locationLabel = useMemo(()=>{
    if(locationValue){
      return getByValue(locationValue as string)?.label;
    }
    return 'Anywhere'
  },[getByValue, locationValue])

  const durationLabel = useMemo(()=>{
    if(startDate && endDate){
      const start = new Date(startDate as string)
      const end = new Date(endDate as string)
      let diff = differenceInDays(end, start);

      if(diff === 0){
        diff = 1; 
      }

      return `${diff} Days`
    }
    return 'Any Week'
  },[startDate, endDate])

  const guestLable = useMemo(()=>{
    if(guestCount){
      return `${guestCount} Guests`
    }
    return ' Add Guest'
  },[guestCount])


  return (
    <div onClick={searchModle.onOpen} className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer '>
        <div className="flex flex-row justify-between items-center">
            <div className="text-sm font-semibold px-6">{locationLabel}</div>
            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center"> {durationLabel}</div>
                <div className="text-sm pr-2 pl-6 text-gray-600 flex flex-row items-center gap-3"> 
                    <div className="hidden sm:block">{guestLable}</div>
                    <div className="p-2 bg-rose-500 text-white rounded-full">
                        <BiSearch/>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Search