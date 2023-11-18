import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismadb'

export async function getSession(){
    return await getServerSession(authOptions)
}


export default async function getCurrnetUser(){
    try {
        const session = await getSession()

        if(!session?.user?.email){
            return null; 
        }
        const currnetUser = await prisma.user.findUnique({
            where:{
                email: session.user.email as string
            }
        })

        if(!currnetUser){
            return null;
        }
        return currnetUser; 
    } catch (error: any) {
        return null; 
    }
}