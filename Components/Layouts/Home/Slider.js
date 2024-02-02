import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import axios from 'axios';
import { DatePicker, ConfigProvider, Select } from "antd";
import Router from 'next/router';

const Slider = () => {

    const [options, setOptions] = useState([])
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.length>3?
        axios.get(process.env.NEXT_PUBLIC_GET_TOUR_SEARCH,{
            headers:{'search':search}
        }).then((x)=>{
            setOptions(x.data.result);
        }):null
    }
    const handleChange = (e) => {
        setSearch(e)
    }

  return (
    <div className='home-slider-styles'>
    <Swiper navigation={true} pagination={true} modules={[Autoplay, Navigation, Pagination]} className="mySwiper">
        <SwiperSlide>
            <div className='desert-safari'>
                <h1 className='heading-main mt-5'>PEACELAND<span className='mx-3'></span>TRAVEL & TOURISM</h1>
                <div className='search-bar-bg'>
                    <div className='search-bar-container'>
                    {/* <input className='custom-search' 
                        placeholder='Search Tours' 
                        value={search} 
                        onChange={(e)=>setSearch(e.target.value)} 
                        onBlur={async()=>{ await delay(100); setShow(false)}}
                    /> */}
                    <ConfigProvider theme={{token:{ colorPrimary:'green', borderRadius:0 }}}>
                        <Select
                            showSearch
                            style={{width:500, height:40, textAlign:'left'}}
                            value={search}
                            placeholder={"Search Tours"}
                            onSearch={handleSearch}
                            onChange={handleChange}
                            dropdownStyle={{
                                maxHeight:100
                            }}
                            placement={"bottomRight"}
                            options={options.map((x)=>{
                                return{ label:x.title, value:x.slug }
                            })}
                        />
                    </ConfigProvider>
                    <ConfigProvider theme={{token:{ colorPrimary:'green', borderRadius:0 }}}>
                        <DatePicker />
                    </ConfigProvider>
                    <button className='search-btn' onClick={()=>Router.push(`/product/${search}`)}>{"Go"}</button>
                    </div>
                </div>
            </div>
        </SwiperSlide>
    </Swiper>
    </div>
  )
}

export default React.memo(Slider)