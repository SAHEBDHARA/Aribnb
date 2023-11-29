import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient  from "./ListingClient";
import getCurrnetUser from "@/app/actions/getCurrentUser";

interface Iparams{
    listingId?: string;
}

const ListingPage = async  ({params } : {params: Iparams}) => {

    const listing = await getListingById(params);
    const currentUser = await getCurrnetUser()
    if(!listing){
        return (
            <ClientOnly>
                <EmptyState/>
            </ClientOnly>
        )
    }


  return (
    <ClientOnly>
       <ListingClient
       listing = {listing}
       curretnUser = {currentUser}
       />
    </ClientOnly>
  )
}

export default ListingPage