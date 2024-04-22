import React from 'react';
import { Container } from 'react-bootstrap';
import ActivityIcons from '../../Shared/ActivityIcons';
import dynamic from 'next/dynamic';

const MobileSearch = dynamic(() => import('./MobileSearch'), {
  loading: () => <div className='text-center'> <img src='/loader.svg' alt="Loader" /> </div>,
});

const MobileSlieder = dynamic(() => import('./MobileSlieder'), {
  loading: () => <div className='text-center'> <img src='/loader.svg' alt="Loader" /> </div>,
});

const Adventures = dynamic(() => import('./AdventureTours'), {
  loading: () => <div className='text-center'> <img src='/loader.svg' alt="Loader" /> </div>,
});

const Combos = dynamic(() => import('./Combos'), {
  loading: () => <div className='text-center'> <img src='/loader.svg' alt="Loader" /> </div>,
});

const PromoSection = dynamic(() => import('../../Shared/PromoSection'), {
  ssr:false,
});

const Mobile = () => {
  return (
    <div className='bg-white py-2'>
      <MobileSearch />
      <MobileSlieder />
      <ActivityIcons/> 
      <PromoSection mobile={true} />
      <div className='home-styles'>
      <div id="parallax-world-of-ugg">
        <section>
          <div className="title-mobile">
            <h3 className=''>Let's go for a</h3>
            <hr/>
            <h1 className='blue-txt'><b className='fw-900'>HOLIDAY</b></h1>
          </div>
        </section>
        <section>
          <div className="parallax-one-mobile text-center">
            <h2 className='text-shade-mobile'>BOOK YOUR VACATION NOW</h2>
          </div>
        </section>
      </div>
      </div>
      <div className=' bg-02' style={{backgroundColor:"white"}}>
        <Container className='my-5' data-aos='fade-up'>
          <h3 className='mt-3 fw-700 text-center'>ADVENTURES & TOUR<span className='blue-txt'> ACTIVITIES</span></h3>
          <Adventures/>
        </Container>
        <Container className='my-0 pb-5' data-aos='fade-up'>
          <h3 className=' fw-700 text-center'>COMBO TOUR<span className='blue-txt'>  ACTIVITIES</span></h3>
          <Combos/>
        </Container>
      </div>
    </div>
  )
}

export default React.memo(Mobile)