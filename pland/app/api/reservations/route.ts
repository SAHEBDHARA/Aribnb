
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrnetUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
){
    const currentUser = await  getCurrnetUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const body = await request.json();

    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;

    if(!listingId || !startDate || !endDate || !totalPrice){
        return NextResponse.error();
    }
    const absoluteTotalPrice = Math.abs(totalPrice);

    const listingAndReservation = await prisma.listing.update({
        where:{
            id: listingId,
        },
        data:{
            reservation:{
                create:{
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice: absoluteTotalPrice
                }
            }
        }
    });
    return NextResponse.json(listingAndReservation)
}
