import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"

import getCurrnetUser from "../actions/getCurrentUser"
import getListings from "../actions/getListing"
import PropartiesClient from "./PropartiesClient"


const PropartiesPage = async () => {
    const currentUser = await getCurrnetUser();
    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                title="Unauthorized"
                subtitle="please login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    if(listings.length ==0){
        return(
            <ClientOnly>
                <EmptyState
                title="No Properties Found"
                subtitle="Looks like you don't have any properties"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <PropartiesClient
            listings = {listings}
            currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default PropartiesPage;