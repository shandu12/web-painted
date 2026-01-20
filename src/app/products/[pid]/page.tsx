'use client'
import React, { useEffect } from 'react'
import { notFound } from "next/navigation";
import productsGet from "@/utils/products_get";
import Gallery from '@/components/gallery/gallery';
import { ProductType } from '@/types';
import AmountButton from '@/components/amountButton';
import Button from '@/components/button';
import FavouriteButton from '@/components/favouriteButton';
import { RootState, checkIsLogged } from '@/store';
import { useSelector } from 'react-redux';
import { addProduct } from '@/store/reducers/cart';
import { useDispatch } from 'react-redux';
import ProductsCarousel from "@/components/products-carousel";
import products from '@/utils/data/products';
import Link from 'next/link';
import { openCart } from '@/components/header';
import Spinner from '@/components/spinner';

export default function ProductDetailPage({ params }: { params: Promise<{ pid: string }> }) {
    const { pid } = React.use(params);
    const { data, error, isLoading } = productsGet(undefined, pid);
    let product: ProductType = data || null;
    const cartItems = useSelector((state: any) => state.cart.cartItems);
    const [stateProduct, setstateProduct] = React.useState(product);
    const [availability, setAvailability] = React.useState<number>(0);
    const [cartableAmount, setCartableAmount] = React.useState<number>(1);
    const [cartAmount, setCartAmount] = React.useState<number>(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setstateProduct(data);
        if (data) {
            const cartItem = cartItems.find((item: any) => item.id === data?.id);
            if (cartItem && data.availability) {
                setCartAmount(cartItem.count);
                setAvailability(data.availability - cartItem.count);
            } else if (data) {
                setAvailability(data.availability);
            }
        }
    }, [data, cartItems]);

    const isLogged = checkIsLogged(useSelector((state: RootState) => state.user));
    if (!stateProduct && error) {
        notFound();
    }

    if (isLoading || !stateProduct) {
        return <div className='flex items-center justify-center h-60'><div className="h-10 w-10"><Spinner/></div></div>;
    }

    return (
        <>
            <div className='container !pt-3'>
                <p><Link className='text-tertiary hover:text-contrast-text' href="/products">Products</Link> / <Link className='text-tertiary hover:text-contrast-text' href={"/products/?category=" + stateProduct.category}>{stateProduct.category}</Link> / {stateProduct.name}</p>
                <div className="pt-3 flex flex-col items-center md:flex-row md:items-start gap">
                    <div className='md:mr-10 mb-6'>
                        <h1 className='main-title md:hidden'>{stateProduct.name}</h1>
                        {stateProduct.pictures && stateProduct.pictures.length > 0 && <Gallery pictures={stateProduct.pictures} />}
                    </div>
                    <div>
                        <h1 className='main-title hidden md:block'>{stateProduct.name}</h1>
                        <p className='text-2xl font-bold mb-3'>
                            {stateProduct.price.toString()}
                        </p>
                        {availability > 0 && <p className='font-semibold mb-3'>In Stock:{cartAmount > 0 ? ` ${cartAmount} in cart -` : ''} {availability} available </p>}
                        <div className='flex mb-3 gap-4 items-center'>
                            {availability > 0 && <>
                                <AmountButton onChange={setCartableAmount} max={availability} />
                                <Button onClick={() => { dispatch(addProduct({ id: stateProduct.id, count: cartableAmount })); openCart() }} background='bg-tertiary'>Add to Cart</Button>
                            </>}
                            {availability === 0 && <p className='text-tertiary font-bold'>Out of stock</p>}
                            {isLogged && <FavouriteButton size={35} productId={stateProduct.id.toString()} />}
                        </div>
                        <p>{stateProduct.description}</p>
                    </div>
                </div>
            </div>
            <ProductsCarousel products={products} title={"See also..."} />
        </>
    );
}
