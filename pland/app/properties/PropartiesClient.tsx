'use client'
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import { SafeListing, SafeUser } from "../types"
import axios from "axios"
import toast from "react-hot-toast"
import ListingCart from "../components/Listings/ListingCart"

interface PropartiesClientProps{
    listings: SafeListing[],
    currentUser?: SafeUser | null 
}

const PropartiesClient: React.FC<PropartiesClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingid] = useState('');

    const onCancle = useCallback((id: string)=>{
        setDeletingid(id);
      
        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success('listings deleted');
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
        title="Properties"
        subtitle="List of your Properties"
        />
        <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing)=>(
                <ListingCart
                key={listing.id}
                data={listing}
                actionId={listing.id}
                onAction={onCancle}
                disabled={deletingId === listing.id}
                actionLable="Delete Property"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default PropartiesClient; 