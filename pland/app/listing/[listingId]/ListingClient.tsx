'use client'
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/Listings/ListingHead';
import { catagories } from '@/app/components/Navbar/Catagory';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ListingInfo from '@/app/components/Listings/ListingInfo';
import useLoginModel from '@/app/hooks/UserLoginModel';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingReservations from '@/app/components/Listings/ListingReservations';
import {Range} from 'react-date-range'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingClientProps{
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    curretnUser?: SafeUser | null; 
}
 const ListingClient: React.FC<ListingClientProps> = ({
    reservations = [],
    listing,
    curretnUser
 }) => {

  const LoginModel = useLoginModel(); 
  const router = useRouter(); 

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any)=>{
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });
      dates = [...dates, ...range];
    });
    return dates; 
  },[reservations]);


  const [isLoading, setIsloading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(()=>{
    if(!curretnUser){
      return LoginModel;
    }
    setIsloading(true);
    
    axios.post('/api/reservations',{
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
    .then(()=>{
      toast.success('Listing Reserved')
      setDateRange(initialDateRange);
      // redirect to trips 
      router.refresh()
    })
    .catch((error)=>{
      toast.error(error.message)
    })
    .finally(()=>{
      setIsloading(false)
    })
  },[
    totalPrice,
    dateRange,
    listing,
    router,
    curretnUser,
    LoginModel
  ])

  useEffect(()=>{
    if(dateRange.startDate && dateRange.endDate){
      const dayCount = differenceInCalendarDays(
        dateRange.startDate,
        dateRange.endDate
      );
      if(dayCount && listing.price){
        setTotalPrice(dayCount * listing.price)
      }else{
        setTotalPrice(listing.price)
      }
    }
  },[dateRange, listing.price])



  const catagory = useMemo(()=>{
    return catagories.find((item)=>
      item.label === listing.catagory
    )
  },[listing.catagory])


  return (
    <Container>
      <div className=" max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
          title = {listing.title}
          imageSrc = {listing.imageSrc}
          locationValue = {listing.locationValue}
          id = {listing.id}
          currentUser = {curretnUser}
          />
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
          <ListingInfo
          user= {listing.user}
          category = {catagory}
          description = {listing.description}
          roomCount = {listing.roomCount}
          guestCount = {listing.guestCount}
          bathroomCount = {listing.bathroomCount}
          locationValue = {listing.locationValue}
          />
          <div className=" order-first mb-10 md:order-last md:col-span-3">
            <ListingReservations
             price = {listing.price}
             totalPrice = {totalPrice}
            onChangeDate={(val)=> setDateRange(val)}
             dateRange = {dateRange}  
             onSubmit = {onCreateReservation}
             disabled = {isLoading}
             disabledDates = {disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient; 
