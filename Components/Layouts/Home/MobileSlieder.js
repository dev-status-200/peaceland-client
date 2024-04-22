import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper";

const Carasoul = () => {

  const images = [
    "home-slider/01.png",
    "home-slider/02.png",
    "home-slider/03.png",
    "home-slider/04.png",
  ]

  return (
  <div>
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={true}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {images.map((x, i)=>{
        return(
        <SwiperSlide key={i}>
          <img src={x} alt="Tour Gallery" height={250} width={'100%'} />
        </SwiperSlide>
        )
      })}
    </Swiper>
  </div>
  )
}

export default React.memo(Carasoul)