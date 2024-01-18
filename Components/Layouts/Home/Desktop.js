import React, { useEffect } from 'react';
import Aos from 'aos';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";
import dynamic from 'next/dynamic';
import Slider from './Slider';
import { Container } from 'react-bootstrap';

const SignUp = dynamic(() => import('../../Shared/SignUp'), {
  ssr:false,
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
          <h3 className=''>Let's go for a</h3>
          <hr/>
          <h1 className='blue-txt'><b className='fw-900'>HOLIDAY</b></h1>
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
            <h1 className='text-center blue-txt' ><b className='fw-900'>Recommended Tours</b></h1>
          </div>
          <div className='px-2 mx-4'>
            <Adventures/>
          </div>
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
            <h1 className='text-center blue-txt'><b className='fw-900'>Combo Packages  </b></h1>
          </div>
          <div className='px-2 mx-4'>
            <Combos/>
          </div>
          <div className='my-5'></div>
        </div>
      </section>
      <section>
        <SignUp/>
      </section>
    </div>
  </div>
  </>
  )
}

export default React.memo(Desktop)