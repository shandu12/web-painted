'use client';
import "@/globals.css";
import { homeSlides } from "@/utils/data/home-slides"
import SwiperBanner from "@/components/slider"
import ShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import CashIcon from '@mui/icons-material/MonetizationOn';
import MaterialsIcon from '@mui/icons-material/Category';
import ProductsCarousel from "@/components/products-carousel";
import products from "@/utils/data/products";

export default function Home() {
  return (
    <div>
      <SwiperBanner slides={homeSlides} />
      <div className="container !pt-12 pb-6">
        <section className="section">
          <div className="container">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
              <li>
                <ShippingIcon fontSize="inherit" className="!text-4xl mb-2 text-tertiary" />
                <div>
                  <h4 className="font-bold uppercase text-xl text-tertiary pb-2">Shipping</h4>
                  <p>
                    We do indeed ship, or we would if this were a real shop
                  </p>
                </div>
              </li>
              <li>
                <PaymentIcon fontSize="inherit" className="!text-4xl mb-2 text-tertiary" />
                <div>
                  <h4 className="font-bold uppercase text-tertiary text-xl pb-2">Easy Payments </h4>
                  <p>
                    We accept payments, but the payment process isn't actually implemented
                  </p>
                </div>
              </li>
              <li>
                <CashIcon fontSize="inherit" className="!text-4xl mb-2 text-tertiary" />
                <div>
                  <h4 className="font-bold uppercase text-xl text-tertiary pb-2">Money-Back Guarantee</h4>
                  <p>
                    Some shops give money back guarantees so we add it too
                  </p>
                </div>
              </li>
              <li>
                <MaterialsIcon fontSize="inherit" className="!text-4xl mb-2 text-tertiary" />
                <div>
                  <h4 className="font-bold uppercase text-xl text-tertiary pb-2">Finest Quality</h4>
                  <p>
                    These miniatures were actually painted by me so they are basically perfect
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <ProductsCarousel products={products} title={"Featured"} />
    </div>
  );
}