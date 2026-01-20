'use client';
import { checkIsLogged } from "@/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Button from "@/components/button";
import productsGet from "@/utils/products_get";
import { ProductListType } from "@/types";
import ProductItem from "@/components/product-item";
import Spinner from "@/components/spinner";
const ProfilePage = () => {
    const isLogged = checkIsLogged(useSelector((state: RootState) => state.user));

    useEffect(() => {
        if (!isLogged) {
            window.location.href = "/profile/login";
        }
    }, [isLogged]);

    const user = useSelector((state: RootState) => state.user);
    const favourites = useSelector((state: RootState) => state.user.favouriteProducts) || [];
    const { data, error, isLoading } = productsGet();
    let productsList: ProductListType[] = data || [];
    const [stateProducts, setstateProducts] = React.useState(productsList);

    useEffect(() => {
        setstateProducts(data);
    }, [data]);

    const products = productsList.filter((product) => favourites.includes(product.id));

    return (
        <section className="">
            <div className="mt-4 container relative min-h-screen">
                <div className="p-4 py-2 bg-primary rounded-lg mb-4 w-fit h-fit flex flex-col items-center lg:absolute top-3 right-20 mx-auto my-5 lg:m-0">
                    <h1 className="main-title !text-2xl mb-3">{user.name}</h1>
                    <img
                        src="/profile-picture.jpg"
                        alt="Profile Picture"
                        width={60}
                        height={60}
                        className="rounded-full mb-3">
                    </img>
                    <Button background="bg-tertiary" padding="py-1 px-2" onClick={() => {
                        window.location.href = "/profile/logout";
                    }}>
                        <p className=""> Log out </p>
                    </Button>
                </div>
                <div className="my-5 lg:mb-12">
                    <h1 className="main-title">Profile</h1>
                    <p className="text-center md:text-left">Welcome back, {user.name}! <br/> Here you can see your favourite products or logout</p>
                </div>
                <div className="" >
                    <h1 className="main-title">Favourites</h1>
                    {error && <p>Failed to load products.</p>}
                    {isLoading && <div className="h-10 w-10"><Spinner/></div>}
                    {data && products.length > 0 && <div className="flex items-center flex-col md:grid grid-cols-4 gap-6">
                        {products.map((product: ProductListType) => (
                            <ProductItem
                                key={product.id}
                                id={product.id.toString()}
                                name={product.name}
                                thumbnail={product.thumbnail}
                                price={product.price}
                                availability={product.availability}
                                category={product.category}
                            />
                        ))}
                    </div>}
                    {data && products.length == 0 && <>
                        <p>You have no favourites yet...</p>
                    </>}
                    
                </div>

            </div>
        </section>
    );
}

export default ProfilePage;