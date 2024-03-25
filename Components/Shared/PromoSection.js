import React, { useState, useEffect } from 'react'
import { message, Modal } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import 'swiper/css/autoplay';
import moment from 'moment';
import axios from 'axios';
import 'swiper/css';

const PromoSection = ({mobile}) => {

  const [promos, setPromos] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_GIT_VISIBLE_PROMOS)
    .then((x)=>{
      setPromos(x?.data?.result);
    })
  }, [])

  return (
  <div className='bg-white'>
    <Container className='pt-5 pb-3'>
    <Row>
      <Col md={12} className='text-center' xs={12}>
        <p style={{letterSpacing:7, fontWeight:400}}>CHECKOUT WITH AMAZING DISCOUNT</p>
        <hr/>
        <h2 style={{letterSpacing:6, fontWeight:800}} className='blue-txt '>PROMO CODES</h2>
      </Col>
    </Row>
    <div className='my-5'>
      <Swiper
        slidesPerView={mobile==true?1:3}
        autoplay={{
          delay: 2500,
          disableOnInteraction:false
        }}
        modules={[Autoplay]}
      >
      {promos.slice(0,5).map((x, i)=>{
        return(
          <SwiperSlide key={i}>
            <div className='promo' style={{width:350}}>
              <div className='promo-left'>
                <div className='fs-20 fw-700 mb-1'>{x.name}</div>
                <div>Get a discount of {x.amount} {x.byPercentage=="0"?"AED":"%"}</div>
                <span style={{color:'silver'}}>Validity: {moment(x.validity).format("MM/DD/YYYY")}</span>
              </div>
              <div className='promo-right text-center'>
                <span className='orange-txt'>Flat off</span>
                <h5 className='orange-txt fw-700'>
                  {x.amount} {x.byPercentage=="0"?"AED":"%"}
                </h5>
                <button className='orange-btn'
                  onClick={()=>{
                    navigator.clipboard.writeText(`i${x.code}`);
                    message.info(`PROMO Code Copied!`)
                  }}
                >COPY</button>
              </div>
            </div>
          </SwiperSlide>
        )})
      }
      </Swiper>
    </div>
    <Row>
      <Col md={5} xs={3}></Col>

      <Col md={2} xs={6} className='text-center'>
        <div className='btn-blue cur' onClick={()=>setOpen(true)}>Show More</div>
      </Col>
      <Col md={5} xs={3}></Col>
    </Row>
    </Container>
    <Modal
      open={open}
      onCancel={()=>setOpen(false)}
      centered
      footer={[]}
      width={mobile==true?'100vw':'70%' }
    >   
    <div className='mt-4' style={{height:400, overflowY:'auto', overflowX:'hidden'}}>
      <Row>
        <h3>Promo Codes</h3>
        {promos.map((x, i)=>{
        return(
          <Col md={4} key={i}>
            <div className='promo'>
              <div className='promo-left'>
                <div className='fs-20 fw-700 mb-1'>{x.name}</div>
                <div>Get a discount of {x.amount} {x.byPercentage=="0"?"AED":"%"}</div>
                <span style={{color:'silver'}}>Validity: {moment(x.validity).format("MM/DD/YYYY")}</span>
              </div>
              <div className='promo-right text-center'>
                <span className='orange-txt'>Flat off</span>
                <h5 className='orange-txt fw-700'>
                  {x.amount} {x.byPercentage=="0"?"AED":"%"}
                </h5>
                <button className='orange-btn'
                  onClick={()=>{
                    navigator.clipboard.writeText(`i${x.code}`);
                    message.info(`PROMO Code Copied!`)
                  }}
                >COPY</button>
              </div>
            </div>
          </Col>
        )})
      }
        
      </Row>
    </div>
    </Modal>
  </div>
  )
}

export default PromoSection