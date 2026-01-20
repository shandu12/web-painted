'use client';
import useSwr from "swr";
import { server } from "@/utils/server";
import { dinero } from "@/types";
import type { CartItemsType, ProductCartType } from "@/types";

export default function productsGet(category?: string, id?: string, search?: string): { data: any; error: any; isLoading: any } {
    let api = `${server}/products`;
    if (category) {
        api += `?category=${category}`;
    } else if (id) {
        api += `/${id}/`;
    } else if (search) {
        api += `?search=${search}`
    }
    const fetcher = (url: string) => fetch(url).then(
        (res) => {
            return res.json().then((data) => {
                for (let i = 0; i < (Array.isArray(data) ? data.length : 1); i++) {
                    if (Array.isArray(data)) {
                        data[i].price = dinero(data[i].price.amount);
                    } else {
                        data.price = dinero(data.price.amount);
                    }
                }
                if (Array.isArray(data)) {
                    return data.sort((a: { price: { getAmount: () => number } }, b: { price: { getAmount: () => number } }) => b.price.getAmount() - a.price.getAmount());
                } else {
                    return data;
                }
            });
        }
    );
    return useSwr(api, fetcher);
}

export const cartProductsGet = (cartItems: CartItemsType[]): { data: any; error: any; isLoading: any } => {
    let api = `${server}/products/cart/`;
    const fetcher = (url: string) => fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: cartItems.map((item) => item.id) }),
    }).then(
        (res) => {
            let responseData: ProductCartType[] = [];
            return res.json().then((data) => {
                for (let i = 0; i < data.length; i++) {
                    responseData.push({
                        id: data[i].id,
                        name: data[i].name,
                        thumbnail: data[i].thumbnail,
                        price: dinero(data[i].price.amount),
                        count: cartItems.find((item) => item.id === data[i].id)?.count || 0,
                    });
                }
                return responseData;
            });
        }
    );
    return useSwr(api, fetcher);
}