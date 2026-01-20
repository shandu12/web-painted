'use client';
import type { ProductListType } from "@/types";
import FavouriteButton from "../favouriteButton";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useRouter } from 'next/navigation';
import { checkIsLogged } from "@/store";
import React from "react";
const ProductItem = ({
  id,
  name,
  thumbnail,
  price,
  availability,
  category,
}: ProductListType) => { 
  const [hover, setHover] = React.useState<boolean>(false);
  const isLogged = checkIsLogged(useSelector((state: RootState) => state.user));
  const router = useRouter()
  return (
    <div className="w-40 lg:w-60"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="h-64 lg:h-96 overflow-hidden rounded-tr-2xl relative">
        {isLogged && hover && <div className="absolute top-2 right-2 z-10">
          <FavouriteButton size={40} productId={id.toString()} />
        </div>
        }
        <img onClick={() => router.push(`/products/${id}`)} src={thumbnail ? thumbnail : ""} className="object-cover hover:cursor-pointer hover:scale-130 transition-all w-full h-full" alt="product" />
      </div>
      <div className="">
        <h3 className="text-xl text-tertiary pt-2 font-bold">{name}</h3>
        <div
          className="">
          <span className="text-xl text-contrast-text">{price.toString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
