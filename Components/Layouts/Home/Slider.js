import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper";
import { Modal, ConfigProvider } from "antd";
import { delay } from "/functions/delay";
import useWindowSize from '/functions/useWindowSize';
import { CloseOutlined } from '@ant-design/icons';

const Carasoul = () => {
  
  const size = useWindowSize();
  const [open, setOpen] = useState(true);
  const [images, setImags] = useState([
    "home-slider/01.png",
    "home-slider/02.png",
    "home-slider/03.png",
    "home-slider/04.png",
  ]);

  useEffect(() => {
    // closeModal()
  }, []);

  async function closeModal(){
    await delay(12000);
    // setOpen(false)
  }

  return (
  <div style={{backgroundColor:'white'}}>
    <ConfigProvider theme={{
      components: {
          Modal: {
            contentBg:'none',
            boxShadow:'none'
          },
        },
      }}
    >
      {/* <Modal
        open={open}
        centered
        title={''}
        footer={[]}
        onCancel={()=>setOpen(false)}
        width={850}
        closeIcon={<div className="txt-close-icon"><CloseOutlined style={{fontSize:25}} /></div>}
      >
        <a className='cur' href='https://registration.iceni-es.com/atm/reg-contact.aspx?dc=PEA-864699&type=visitor&usertypeid=1' target='_blank'>
          <img src='/images/ATM.jpg' width={'100%'}  />
        </a>
      </Modal> */}
    </ConfigProvider>
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
          <img src={x} alt="Tour Gallery" height={550} width={'100%'} />
        </SwiperSlide>
        )
      })}
    </Swiper>
  </div>
  )
}

export default React.memo(Carasoul)