import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Aos from 'aos';
import { AiOutlineRight } from "react-icons/ai";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";
import SignUp from '../../Shared/SignUp';
import CircleIcons from '/Components/Shared/CircleIcons';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Slider from './Slider';

const BestSelling = dynamic(() => import('./BestSelling'), {
  loading: () => <div className='text-center'> <img src='/loader.svg'  alt="About Us" /> </div>,
})
const Adventures = dynamic(() => import('./AdventureTours'), {
  loading: () => <div className='text-center'> <img src='/loader.svg'  alt="About Us" /> </div>,
})
const Combos = dynamic(() => import('./Combos'), {
  loading: () => <div className='text-center'> <img src='/loader.svg'  alt="About Us" /> </div>,
})

const Desktop = () => {

    useEffect(() => {
      Aos.init({once: true, duration:700});
    }, [])

  return (
  <>
  <Slider/>
  <div className='home-styles'>
    <div id="parallax-world-of-ugg">
      <section>
        <div className="title">
          <h3>Let's go for a</h3>
          <hr/>
          <h1 className='blue-txt-2'><b>HOLIDAY</b></h1>
        </div>
      </section>
      <section>
          <div className="parallax-one">
            <h2 className='text-shade'>ANYWHERE IN THE WORLD</h2>
          </div>
      </section>
      <section>
        <div className="block">
          <div className='title py-4'>
            <h3>Peaceland's Most</h3>
            <h1 className='text-center blue-txt-2' ><b>Recommended Tours</b></h1>
          </div>
          <Adventures/>
          <div className='my-5'></div>
        </div>
      </section>
      <section>
        <div className="parallax-two">
          <h2 className='text-shade'>EXPLORE DUBAI</h2>
        </div>
      </section>
      <section>
        <div className="block">
          <div className='title py-4'>
            <h3>Peaceland's</h3>
            <h1 className='text-center blue-txt-2'><b>Combo Packages  </b></h1>
          </div>
          <Combos/>
          <div className='my-5'></div>
        </div>
      </section>
    </div>
  </div>
  </>
  )
}

export default React.memo(Desktop)