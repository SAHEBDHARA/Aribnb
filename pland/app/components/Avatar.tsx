'use client'
import Image from "next/image"

interface AvatarProps{
  src: string | undefined | null;
}

const Avatar: React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <Image
    alt=""
    src={src || "/Images/placeholder.jpg"}
    className="rounded-full "
    height="30"
    width="30"

    />
  )
}

export default Avatar