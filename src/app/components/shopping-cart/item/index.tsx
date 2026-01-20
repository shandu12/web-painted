import { useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { removeProduct } from "@/store/reducers/cart";
import type { ProductCartType } from "@/types";

const ShoppingCart = ({
  thumbnail,
  name,
  id,
  count,
  price,
}: ProductCartType) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(
      removeProduct(id),
    );
  };

  return (  
    <div className="flex flex-row justify-between items-start my-3 border-b pb-3 !border-secondary">
        <div className="flex flex-row gap-2">
            <img onClick={()=> {window.location.href=`/products/${id}`}} className="hover:scale-110 cursor-pointer h-18 w-18" src={thumbnail} alt="" />
            <div >
              <h3 onClick={()=> {window.location.href=`/products/${id}`}} className="text-contrast-text hover:text-tertiary cursor-pointer">{name}</h3>
              <p className="">{count}x<span className="text-contrast-text">{price.toString()}</span></p>
            </div>
        </div>
          <DeleteIcon onClick={()=>{removeFromCart()}} className="interactable-tertiary text-tertiary mt-2 mr-4" />
    </div>
  );
};

export default ShoppingCart;
