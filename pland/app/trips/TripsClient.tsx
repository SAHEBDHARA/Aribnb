'use client'
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import { SafeReservation, SafeUser } from "../types"
import axios from "axios"
import toast from "react-hot-toast"
import ListingCart from "../components/Listings/ListingCart"

interface TripsClientProps{
    reservations: SafeReservation[],
    currentUser?: SafeUser | null 
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingid] = useState('');

    const onCancle = useCallback((id: string)=>{
        setDeletingid(id);
      
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('Reservation Cancelled');
            router.refresh()
        })
        .catch((error)=>{
            toast.error(error?.response?.data?.error)
        })
        .finally(()=>{
            setDeletingid('');
        })
    },[router])

  return (
    <Container>
        <Heading
        title="Trips"
        subtitle="Where you have been and where you are going to"
        />
        <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((reservation: any)=>(
                <ListingCart
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancle}
                disabled={deletingId === reservation.id}
                actionLable="Cancel Reservation"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default TripsClient