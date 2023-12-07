import { NextResponse } from "next/server";

// import getCurrentUser from "@/app/actions/getCurrentUser";
import getCurrnetUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";
import prisma from '@/app/libs/prismadb'


interface IParams {
  reservationid?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrnetUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationid } = params;

  if (!reservationid || typeof reservationid !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationid,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } }
      ]
    }
  });

  return NextResponse.json(reservation);
}