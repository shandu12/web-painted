'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { ProductListType } from "@/types";
import ProductItem from "../product-item";

const SwiperProducts = ({ products = [], title }: { products?: ProductListType[], title?: string }) => {
  return (
    <section className="py-8">
      {title && <div className="container mb-6">
        <h2 className="text-3xl text-tertiary font-bold mb-4">{title}</h2>
        </div>
      }
      <Swiper spaceBetween={30} slidesPerView={"auto"} loop className="swiper-wrapper" >
        {products.map((product) => (
          <SwiperSlide className="!w-auto" key={product.id}>
            <ProductItem
              id={product.id.toString()}
              name={product.name}
              thumbnail={product.thumbnail}
              price={product.price}
              availability={product.availability}
              category={product.category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SwiperProducts;
