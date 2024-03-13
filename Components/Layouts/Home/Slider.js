import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper";

const Carasoul = () => {
  
  const [images, setImags] = useState([
    "home-slider/01.jpg",
    "home-slider/02.jpg",
    "home-slider/03.jpg",
    "home-slider/04.jpg",
  ])

  return (
    <div style={{backgroundColor:'white'}}>
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
          <img src={x} alt="Tour Gallery" height={850} width={'100%'} />
        </SwiperSlide>
        )
      })}
    </Swiper>
  </div>
  )
}

export default React.memo(Carasoul)