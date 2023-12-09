import prisma from '@/app/libs/prismadb'
import getCurrnetUser from './getCurrentUser'

export default async function getFavoriteListing(){
    try {
        const currentUser = await getCurrnetUser();
        if(!currentUser){
            return [];
        }
        const favorites  = await prisma.listing.findMany({
            where:{
                id:{
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        })
        const safeFavorite = favorites.map((favorite) =>({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }))

        return safeFavorite;
    } catch (error: any) {
        throw new Error(error)
    }
}