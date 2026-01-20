import type { Dinero as DineroType } from "dinero.js";
import wrappedDinero from "dinero.js";

export function dinero(amount: number) {
    // dinero's default implementation is not serializable, so we wrap it to make it so
    let initialDinero = wrappedDinero({ amount });
    let serializableDinero = { ...initialDinero, toString: function () { return this.toFormat(); } };
    return serializableDinero;
}

export type ProductsTypeType = {
    id: string;
    name: string;
}

export type ProductType = {
    id: string;
    name: string;
    thumbnail: string;
    pictures: string[];
    price: DineroType;
    availability: number;
    description: string;
    category: string;
};

export type ProductListType = {
    id: string;
    name: string;
    thumbnail: string;
    price: DineroType;
    availability: number;
    category: string;
};
export type CartItemsType = {
    id: string;
    count: number;
};

export type ProductCartType = {
    id: string;
    name: string;
    thumbnail: string;
    price: DineroType;
    count: number;
};

export type UserType = {
    name: string;
    favouriteProducts?: string[];
};

export type SlideType = {
    id: number;
    title?: string;
    image: string;
    link?: string;
};