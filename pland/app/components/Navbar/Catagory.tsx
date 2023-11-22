"use client";

import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { BsSnow } from "react-icons/bs";
import {IoDiamond} from 'react-icons/io5'
import { FaSkiing } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import CatagoryBox from "../CatagoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const catagories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmill",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is Modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in countryside",
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near lake",
  },
  {
    label: "Sking",
    icon: FaSkiing,
    description: "This property has sking activities",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property in castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has canping activities",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has canping activities",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is no a cave",
  },
  {
    label: "Dasert",
    icon: GiCactus,
    description: "This property is in the dasert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the dasert",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is Luxurious",
  },
];

const Catagory = () => {
  const params = useSearchParams();
  const catagory = params?.get("catagory");
  const pathname = usePathname();

  const isMainpage = pathname === "/";

  if (!isMainpage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
        pt-4
        flex 
        flex-row
        items-center
        justify-between
        overflow-x-auto
        "
      >
        {catagories.map((item) => (
          <CatagoryBox
            key={item.label}
            label={item.label}
            description={item.description}
            selected={catagory == item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Catagory;
