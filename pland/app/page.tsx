import getCurrnetUser from "./actions/getCurrentUser";
import getListings, { IlistingsParams } from "./actions/getListing";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCart from "./components/Listings/ListingCart";

interface HomeProps{
  searchParams: IlistingsParams
}

const Home = async ({ searchParams}: HomeProps)=> {

  const listings =await getListings(searchParams);
  const currentUser = await getCurrnetUser(); 

   
  if(listings.length == 0){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }

  
  return (
   <ClientOnly>
     <Container>
      <div  
      className=" pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 "
      >
          {listings.map((listing: any) => {
            return (
              <ListingCart
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              />
            )
          })}
      </div>
     </Container>
   </ClientOnly>
  )
}

export default Home; 
