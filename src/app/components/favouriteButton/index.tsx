import React from "react";
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { toggleFavProduct } from "@/store/reducers/user";
import { useDispatch } from "react-redux";

interface FavouriteButtonProps {
    productId: string;
    size?: number;
    onClick?: (productId: string) => void;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
    productId,
    size = 32,
}) => {

    const iconSize = Math.round(size * 0.6);
    const isFavourite = useSelector((state: RootState) => state.user?.favouriteProducts || []).includes(productId);
    const dispatch = useDispatch();
    const toggleFav = () => {
        dispatch(toggleFavProduct({ id: productId }));
    }
    let classes = `${isFavourite ? "text-favorite" : "text-background"}`;
    classes += ` hover:${isFavourite ? "text-background" : "text-favorite"}`;
    return (
        <button
            type="button"
            onClick={toggleFav}
            className={ classes +` bg-gray-300 rounded-full flex items-center justify-center cursor-pointer p-0 border-none`}
            style={{ width: size, height: size }}
            aria-label="Add to favourites"
        >
            { isFavourite && <Favorite style={{ fontSize: iconSize, }} />}
            { !isFavourite && <FavoriteBorder style={{ fontSize: iconSize, }} />}
        </button>
    );
};

export default FavouriteButton;