"use client";

import useCountries from "@/app/hooks/UseCountry";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import format from "date-fns/format";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

interface ListingCartProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLable?: string;
  actionId?: string;
  currentUser?: SafeUser | null ;
}

const ListingCart: React.FC<ListingCartProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLable,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }
    onAction?.(actionId);

  }, [onAction, actionId, disabled]);

  const price = useMemo(()=>{
    if(reservation){
        return reservation.totalPrice; 
    }
    return data.price;
  },[reservation, data.price]);

  const reservationDate = useMemo(()=>{
    if(!reservation){
        return null;
    }
    const start = new Date(reservation.startDate) 
    const end = new Date(reservation.endDate) 

    return `${format(start, 'PP')} - ${format(end,'PP')}`; 

  },[reservation])

  return (
  <div 
  onClick={()=> router.push(`/listing/${data.id}`)}
  className=" col-span-1 cursor-pointer group"
  >
    <div className="flex flex-col gap-2 w-full">
        <div className=" aspect-square relative w-full rounded-xl overflow-hidden">
            <Image
            fill
            alt="listing"
            src={data.imageSrc}
            className=" h-full w-full object-cover group-hover:scale-110 transition"
            />
            <div className=" absolute top-3 right-3">
                <HeartButton
                listingId={data.id}
                currentUser={currentUser}
                />
            </div>
        </div>
        <div className=" font-semibold text-lg ">
            {location?.region}, {location?.label}
        </div>
        <div className=" font-light text-neutral-500">
            {reservationDate || data.catagory }
        </div>
        <div className=" flex flex-row items-center gap-1">
            <div className=" font-semibold">
                ${price}
            </div>
            {!reservation && (
                <div className=" font-light">
                    night
                </div>
            )}
        </div>
        {onAction && actionLable && (
            <Button
            disabled={disabled}
            small
            label={actionLable}
            onClick={handleCancle}
            />
        )}
    </div>
  </div>
  );
};

export default ListingCart;
