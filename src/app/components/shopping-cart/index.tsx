'use client';
import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Item from "./item";
import type { ProductCartType } from "@/types";
import { cartProductsGet } from "@/utils/products_get";
import React from "react";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import { server } from "@/utils/server";
import Spinner from "@/components/spinner";

const ShoppingCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const { mutate } = useSWRConfig();
  let { data, error, isLoading } = cartProductsGet(cartItems);
  let cartList: ProductCartType[] = data || [];
  const [cart, setCart] = React.useState<ProductCartType[]>(cartList);
  useEffect(() => {
    // setCartItems(newCartItems);
    mutate(`${server}/products/cart/`);
  }, [cartItems]);
  useEffect(() => {
    if (data && data != cart) {
      setCart(data);
    }
  }, [data]);

  if (isLoading) {
    return <div className="p-2 w-auto max-h-52 flex items-center justify-center lg:max-h-96 overflow-scroll"><div className="h-10 w-10"><Spinner/></div></div>;
  }

  if (error) {
    return <div>Failed to load cart items.</div>;
  }

  const priceTotal = () => {
    let totalPrice = 0;
    if (cart.length > 0) {
      cart.map((item) => (totalPrice += item.price.getAmount() / 100 * item.count));
    }
    return totalPrice;
  };

  return (
    <section className="p-4 w-80 lg:w-96 max-h-[60vh] lg:max-h-96 overflow-scroll">
      <div className="">
        <div className="">
          <h3 className="text-tertiary text-center text-xl uppercase font-bold">Shopping Cart</h3>
        </div>
        <div className="cart-list">
          {cart.length > 0 && (
            <>
              {cart.map((item) => (
                <Item
                  key={item.id}
                  id={item.id}
                  thumbnail={item.thumbnail}
                  name={item.name}
                  price={item.price}
                  count={item.count}
                />
              ))}
            </>
          )}
          {cartItems.length === 0 && <p>Nothing in the cart</p>}
        </div>
        <div className="">
          <div className="">
            <p className="">
              Total cost <strong className="text-contrast-text">${priceTotal().toFixed(2)}</strong>
            </p>
            <Link
              href="/cart/checkout"
              className="bg-tertiary text-contrast-text hover:text-text px-4 py-2 rounded-full block text-center mt-4"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
