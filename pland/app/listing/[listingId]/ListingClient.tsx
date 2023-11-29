'use client'
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/Listings/ListingHead';
import { catagories } from '@/app/components/Navbar/Catagory';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import { useMemo } from 'react';
import ListingInfo from '@/app/components/Listings/ListingInfo';


interface ListingClientProps{
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    curretnUser?: SafeUser | null; 
}
 const ListingClient: React.FC<ListingClientProps> = ({
    reservations,
    listing,
    curretnUser
 }) => {

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
        </div>
      </div>
    </Container>
  )
}

export default ListingClient; 
