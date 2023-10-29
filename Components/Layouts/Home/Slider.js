import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

const Slider = () => {
  return (
    <div className='home-slider-styles'>
        <Swiper navigation={true} pagination={true} modules={[Autoplay, Navigation, Pagination]} className="mySwiper">
            <SwiperSlide>
                <div className='desert-safari'>
                    <h1 className='heading-main'>DESERT<span className='mx-3'></span>SAFARI</h1>
                    <p className='heading'> BOOK NOW </p>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='desert-safari'></div>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default Slider