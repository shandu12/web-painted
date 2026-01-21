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
import ProductsComponent from "@/components/productsComponent";

export default function Products() {
    return (
        <Suspense fallback={<>...</>}>
            <ProductsComponent />
        </Suspense>
    );
}