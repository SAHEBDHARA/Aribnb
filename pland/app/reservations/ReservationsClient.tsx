'use client'
import toast from "react-hot-toast"
import axios from "axios"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { SafeReservation, SafeUser } from "../types"
import Heading from "../components/Heading"
import Container from "../components/Container"
import ListingCart from "../components/Listings/ListingCart"

interface ReservationsClientProps{
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')
    const onCancle = useCallback((id:string)=>{
        setDeletingId(id)

        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
           toast.success('Reservation Cancled')
           router.refresh()
        })
        .catch((error)=>{
            toast.error("Something Went Wrong.")
        }).finally(()=>{
            setDeletingId('')
        })
    },[router])
  return (
    <Container>
        <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
        />
        <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((reservation)=>(
                <ListingCart
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancle}
                disabled={deletingId === reservation.id}
                actionLable="Cancel guest Reservation"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default ReservationsClient