import React from 'react'
import { SafeListing, SafeUser } from '../types'
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCart from '../components/Listings/ListingCart';

interface FavoritesClientProps{
    listings: SafeListing[];
    currentUser: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser
}) => {
  return (
    <Container>
        <Heading
        title='Favorites '
        subtitle='Lists of place of your favorites'
        />
        <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) =>(
                <ListingCart
                 currentUser={currentUser}
                 key={listing.id}
                 data={listing}
                />
            ))}
        </div>
    </Container>
  )
}

export default FavoritesClient