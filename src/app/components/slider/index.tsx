'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay, } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';
import { SlideType } from "@/types";
import Button from "../button";
import ArrowRight from '@mui/icons-material/ArrowRight';

const SwiperBanner = ({ slides = [] }: { slides?: SlideType[] }) => {
  return (
    <section className="">
      <Swiper modules={[EffectFade, Autoplay]} autoplay={{delay: 5000}} touchStartPreventDefault={false} loop effect="fade" className="swiper-wrapper" navigation={false} >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-52 lg:h-96 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              <div className="container relative h-full">
                <div className="absolute left-8 xl:left-0 bottom-8 w-[250px] md:w-[300px] lg:w-[500px]">
                  {slide.title && <h1 className="mb-3 text-gray-100 !text-shadow-md/60 text-4xl lg:text-[80px] lg:leading-20 uppercase font-bold text-shadow-xl">{slide.title}</h1>}
                  {slide.link && <Button link={slide.link}>see more<ArrowRight className="mb-1 mr-[-10px]" /></Button>}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SwiperBanner;
