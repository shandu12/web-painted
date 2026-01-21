'use client'
import ProductItem from "@/components/product-item";
import { useSearchParams } from 'next/navigation'
import React, { useEffect, createRef } from "react";
import { ProductListType, ProductsTypeType } from "@/types";
import productsGet from "@/utils/products_get";
import typesGet from "@/utils/types_get";
import Spinner from "@/components/spinner";
import TuneIcon from "@mui/icons-material/Tune"
import ArrowRight from "@mui/icons-material/ArrowBackIos"
import { Suspense } from 'react'

export default function Products() {
    const searchParams = useSearchParams()
    const category = searchParams?.get('category')
    const search = searchParams?.get('search')
    const { data, error, isLoading } = productsGet(category || undefined, undefined, search || undefined);
    let productsList: ProductListType[] = data || [];
    const [stateProducts, setstateProducts] = React.useState(productsList);
    useEffect(() => {
        setstateProducts(data);
    }, [data]);

    const { data: typesData, error: typesError } = typesGet();
    const productsTypes: ProductsTypeType[] = typesData || [];
    const [typesState, setTypesState] = React.useState(productsTypes);
    useEffect(() => {
        setTypesState(typesData);
    }, [typesData]);

    const filterRef = createRef<HTMLDivElement>();
    const [filtersOpen, setFiltersOpen] = React.useState(false);
    const handleClick = (onClickOutside: Function, ref: any) => {
        return (event: MouseEvent) => {
            if (ref?.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        };
    }
    useEffect(() => {
        if (filterRef) {
            window.addEventListener("mousedown", handleClick(() => setFiltersOpen(false), filterRef));
        }

        return () => {
            window.removeEventListener("mousedown", handleClick(() => setFiltersOpen(false), filterRef));
        };
    }, [filterRef]);


    return (
        <Suspense fallback={<>...</>}>
            <div className="container !pt-6 pb-10 flex flex-col items-center md:items-start">
                <div ref={filterRef} className={filtersOpen ? "fixed top-14 pt-4 lg:pt-6 left-0 px-5 h-full bg-primary flex flex-col z-10" : "hidden"}>
                    <button className="absolute -right-10 top-2 lg:top-4 -z-10 flex items-center rounded-r-4xl bg-primary" onClick={() => setFiltersOpen(false)}>
                        <ArrowRight className="!text-3xl text-tertiary interactable-tertiary m-2 mr-1" />
                    </button>

                    {(!typesState || typesState.length == 0) && <select className="mb-4 p-2 px-3 border border-gray-300 rounded-3xl" onChange={(e) => {
                        const selectedCategory = e.target.value;
                        const url = new URL(window.location.href);
                        if (selectedCategory) {
                            url.searchParams.set('category', selectedCategory);
                        } else {
                            url.searchParams.delete('category');
                        }
                        window.location.href = url.toString();
                    }} defaultValue={category || ''}>
                        {!typesState && !typesError && category && <option>{category}</option>}
                        {typesState && typesState.length > 0 &&
                            <>
                                <option className="" value=''>All Categories</option>
                                {typesState.map((type) => (
                                    <option key={type.id} value={type.name}>{type.name}</option>
                                ))}
                                <option selected={category == "News"} value='News'>New arrivals</option>
                            </>
                        }
                    </select>}
                    {typesState && typesState.length > 0 && <select className="mb-4 p-2 px-3 border border-gray-300 rounded-3xl" onChange={(e) => {
                        const selectedCategory = e.target.value;
                        const url = new URL(window.location.href);
                        if (selectedCategory) {
                            url.searchParams.set('category', selectedCategory);
                        } else {
                            url.searchParams.delete('category');
                        }
                        window.location.href = url.toString();
                    }} defaultValue={category || ''}>
                        <option value=''>All Categories</option>
                        {typesState.map((type) => (
                            <option key={type.id} value={type.name}>{type.name}</option>
                        ))}
                        <option value='News'>News</option>
                    </select>}
                    <select className="mb-4 p-2 px-3 border border-gray-300 rounded-3xl" onChange={(e) => {
                        const sortBy = e.target.value;
                        let sortedProducts = [...stateProducts];
                        if (sortBy === 'price-asc') {
                            // @ts-ignore
                            setstateProducts(sortedProducts.sort((a, b) => a.price.getAmount() - b.price.getAmount()));
                        } else if (sortBy === 'name-asc') {
                            setstateProducts(sortedProducts.sort((a, b) => a.name.localeCompare(b.name)));
                        } else if (sortBy === 'name-desc') {
                            setstateProducts(sortedProducts.sort((a, b) => b.name.localeCompare(a.name)));
                        } else {
                            // @ts-ignore
                            setstateProducts(sortedProducts.sort((a, b) => b.price.getAmount() - a.price.getAmount()));
                        }
                    }} defaultValue={searchParams?.get('sort') || ''}>
                        <option value=''>Price: High to Low</option>
                        <option value='price-asc'>Price: Low to High</option>
                        <option value='name-asc'>Name: A to Z</option>
                        <option value='name-desc'>Name: Z to A</option>
                    </select>
                </div>
                <h1 className="main-title flex items-center">
                    <button className={filtersOpen ? "invisible" : "flex items-center"} onClick={() => setFiltersOpen(true)}>
                        <TuneIcon className="!text-4xl interactable-tertiary mr-4" />
                    </button>
                    {category ? category : "Products"}</h1>
                <div className="flex items-center flex-col md:grid grid-cols-4 gap-6">
                    {error && <p>Failed to load products.</p>}
                    {isLoading && <div className="h-10 w-10"><Spinner /></div>}
                    {data && data.length === 0 && <p>No products found.</p>}
                    {data && data.length > 0 && stateProducts === undefined && <div className="h-10 w-10"><Spinner /></div>}
                    {data && data.length > 0 && stateProducts && stateProducts.map((product: ProductListType) => (
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
                </div>
            </div>
        </Suspense>
    );
}