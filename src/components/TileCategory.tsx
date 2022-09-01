import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { TiChevronRight, TiChevronLeft } from "react-icons/ti";

interface Subcategory {
  id: string;
  name: string;
}
interface Props {
  name: string;
  type: string;
  subcategories: Subcategory[];
}

const TileCategory = ({ name, subcategories, type }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClicked = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" w-full ">
      <button
        onClick={handleClicked}
        className="hover:bg-purple-900 text-white  p-2 w-full flex  flex-row justify-between bg-transparent"
      >
        <p>{name}</p>
        {isOpen ? <TiChevronLeft /> : <TiChevronRight />}
      </button>
      {isOpen && (
        <ul className={"w-full text-white transition-all overflow-hidden  "}>
          {subcategories.map((subcategory) => (
            <li key={subcategory.id} className=" flex w-full cursor-pointer  px-6 py-2">
              <Link className="w-full hover:bg-white hover:text-gray-900 text-white" href={`/${type}/${subcategory.id}`}>
                <a className="w-full p-2 hover:bg-white rounded-[20px]  hover:text-gray-900 text-white">{subcategory.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TileCategory;
