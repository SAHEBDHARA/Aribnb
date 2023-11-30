import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"

import getCurrnetUser from "../actions/getCurrentUser"
import getReservation from "../actions/getReservation"
import TripsClient from "./TripsClient"


const TripsPage = async () => {
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

    const reservations = await getReservation({
        userId: currentUser.id
    });

    if(reservations.length ==0){
        return(
            <ClientOnly>
                <EmptyState
                title="No Trips Found"
                subtitle="You haven't reservated yet"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <TripsClient
            reservations = {reservations}
            currentUser = {currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage