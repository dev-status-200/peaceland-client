// import React, { useEffect } from 'react';

// import useWindowSize from '/functions/useWindowSize';

// const Images = ({mainImage, setMainImage, tour, detail}) => {

//   const size = useWindowSize();

//   useEffect(() => {
//     setMainImage(tour.main_image);
//     console.log(tour)
//   }, [detail])
  
//   return (
//   <>
//     <img className='my-3' src={mainImage} style={{borderRadius:size.width<500?10:8, width:'100%'}} alt="Tour" />
//   </>
//   )
// }
// export default React.memo(Images)

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const Carasoul = (props) => {
  
  const [images, setImags] = useState([])
  useEffect(()=>{
    let tempImages = props?.tour?.more_images?.split(",")||[];
    tempImages.unshift(props.tour.main_image)
    setImags(tempImages)
  }, []);


  return (
    <>
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {images.map((x, i)=>{
        return(
        <SwiperSlide key={i}>
          <img src={x} alt="Tour Gallery" width={'100%'} style={{borderRadius:15}} />
        </SwiperSlide>
        )
      })}
    </Swiper>
  </>
  )
}

export default React.memo(Carasoul)