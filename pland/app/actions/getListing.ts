
import prisma from '@/app/libs/prismadb'

export interface IlistingsParams{
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    catagory?: string; 
}

export default async function getListings(
    params: IlistingsParams
){
    try {

        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            catagory
        } = params; 

        let quary: any = {};
        if (userId){
            quary.userId = userId;
        }
        if(catagory){
            quary.catagory = catagory;
        }
        if(roomCount){
            quary.roomCount = {
                gte: +roomCount
            }
        }
        if(guestCount){
            quary.guestCount = {
                gte: +guestCount
            }
        }
        if(bathroomCount){
            quary.bathroomCount = {
                gte: +bathroomCount
            }
        }
        if(locationValue){
            quary.locationValue = locationValue;
        }

        if(startDate && endDate){
            quary.NOT = {
                reservation:{
                    some:{
                        OR:[
                            {
                                endDate:{ gte: startDate },
                                startDate: { lte: startDate}
                            },
                            {
                                startDate: { lte: endDate},
                                endDate:{ gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const listing = await prisma.listing.findMany({
            where:quary,
            orderBy:{
                createdAt: 'desc'
            }
        })
        const safelisting = listing.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safelisting; 
    } catch (error: any) {
        throw new Error(error); 
    }
}