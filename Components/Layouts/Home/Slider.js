import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import Router from 'next/router';
import { Autoplay, Navigation, Pagination } from "swiper";
import { Select } from 'antd';

const Slider = () => {

    const options = [
        {
            value: '1', label: 'Desert Safari',
        },
        {
            value: '2', label: 'Aquarium Mall',
        },
        {
            value: '3', label: 'Dhow Cruise',
        },
        {
            value: '4', label: 'Global Village',
        },
        {
            value: '5', label: 'Miracle Garden',
        },
        {
            value: '6', label: 'Burj Khalifa Inside',
        },
    ]

  return (
    <div className='home-slider-styles'>
        <Swiper navigation={true} pagination={true} modules={[Autoplay, Navigation, Pagination]} className="mySwiper">
            <SwiperSlide>
                <div className='desert-safari'>
                    <h1 className='heading-main'>DESERT<span className='mx-3'></span>SAFARI</h1>
                    <div className='search-bar-bg mt-3'>
                        <h3 className='wh-txt mb-3'>
                            <b>SEARCH TOURS</b>
                        </h3>
                        <Select showSearch style={{ width: 800 }} options={options} size='large' 
                            placeholder="Type to Search"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                            filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                        />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='aqua'>
                    <h1 className='heading-main'>AQUARIUM<span className='mx-3'></span>MALL</h1>
                    <div className='search-bar-bg mt-3'>
                        <h3 className='wh-txt mb-3'>
                            <b>SEARCH TOURS</b>
                        </h3>
                        <Select showSearch style={{ width: 800 }} options={options} size='large' 
                            placeholder="Type to Search"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                            filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                        />
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default Slider