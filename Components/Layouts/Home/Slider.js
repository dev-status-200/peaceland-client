import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

const Slider = () => {
    const item = useRef(null)
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
    const [show, setShow] = useState(false)
    const [search, setSearch] = useState('');
    useEffect(() => {
      if(search.length>2 && show==false){
        setShow(true);
      }else if(search.length<=2 && show==true) {
        setShow(false);
      }
    }, [search]);

  return (
    <div className='home-slider-styles'>
    <Swiper navigation={true} pagination={true} modules={[Autoplay, Navigation, Pagination]} className="mySwiper">
        <SwiperSlide>
            <div className='desert-safari'>
                <h1 className='heading-main mt-5'>PEACELAND<span className='mx-3'></span>TRAVEL & TOURISM</h1>
                <div className='search-bar-bg'>
                    <div className='search-bar-container'>
                    <input className='custom-search' onBlur={()=>setShow(false)} placeholder='Search Tours' value={search} onChange={(e)=>setSearch(e.target.value)} />
                    <button className='search-btn'>Go</button>
                    </div>
                    {show && <div className='tour-list'>
                        {
                            options.map((x, i)=>{
                                return(
                                    <div key={i} className='search-item'>
                                        {x.label}
                                    </div>
                                )
                            })
                        }
                    </div>
                    }
                </div>
            </div>
        </SwiperSlide>
    </Swiper>
    </div>
  )
}

export default Slider