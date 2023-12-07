import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'
import getCurrnetUser from '../actions/getCurrentUser'
import getReservation from '../actions/getReservation'
import ReservationsClient from './ReservationsClient'




const ReservationPage  = async () => {
    const currentUser = await getCurrnetUser();
    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                title='Unathorized'
                subtitle='Please Login'
                />
            </ClientOnly>
        )
    }

    const reservations =await getReservation({
        authorId: currentUser.id
    })


    if(reservations.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                title='No reservation found'
                subtitle='Looks like you have no reservation on your properties'
                />
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ReservationPage; 