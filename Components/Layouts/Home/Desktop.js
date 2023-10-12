import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Aos from 'aos';
import { AiOutlineRight } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper";
import "swiper/css/bundle";
import TourCardOne from '../../Shared/TourCardOne';
import SignUp from '../../Shared/SignUp';
import { Widget } from "@uploadcare/react-widget";
import CircleIcons from '/Components/Shared/CircleIcons';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Router from 'next/router';

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
  <div className='home-styles' data-aos="fade-in">
    <div data-aos="fade-in">
            <div className='hero activity py-4' style={{minHeight:500}}>
            <div className='navBar'>
            <Link className='navLink' href='/'>HOME</Link>
            <div className='dropdown'>
            <div className='navLink dropbtn' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>DESTINATION</div>
            <div className="dropdown-content">
                <a className='menu-drop-links pb-2' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>Dubai</a>
                <a className='menu-drop-links pb-2' onClick={()=>Router.push("/search?destination=uae&city=Abu+Dhabi")}>Abu Dhabi</a>
            </div>
            </div>
            <span className="navLink" style={{paddingLeft:50, paddingRight:5}}>
                <img src={'/images/logo.png'} height={70} alt="Logo" />
            </span>
            <div className='dropdown  mx-2'>
                <span className='navLink dropbtn' onClick={()=>Router.push("/search?destination=uae&city=Dubai+City")}>ACTIVITIES</span>
                <div className="dropdown-content">
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}}>Theme Parks</Link>
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Water Parks' }}}>Water Parks</Link>
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'City Tours'  }}}>City Tours</Link>
                    <Link className='menu-drop-links mx-3'      href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Luxury Tours'}}}>Luxury Tours</Link>
                    <Link className='menu-drop-links mx-3 pb-2' href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Adventure'   }}}>Adventure</Link>
                </div>
            </div>
            <Link className='navLink' href='/about'>ABOUT US</Link>
            </div>
            </div>
        </div>
    <div style={{backgroundColor:"white"}} className='bg-02'>
      <CircleIcons/>
      <Container className='pt-5 px-4'>
      <div className='blue-txt px-3' style={{letterSpacing:7}}>CHOOSE YOUR PLACE</div>
      <h1 className='fw-700 px-3'><span className='black-txt'>BEST</span> <span className='blue-txt'>SELLING ACTIVITIES</span></h1>
      <BestSelling/>
      </Container>
    </div>
    {/* <Slider/> */}
    <div className='py-5 bg-02' style={{backgroundColor:"white"}}>
    <Container className='my-5' data-aos='fade-up'>
      <h1 className='mt-3 fw-700 px-4'>ADVENTURES &<span className='blue-txt'> TOUR ACTIVITIES</span></h1>
      <Adventures/>
    </Container>
    <Container className='my-0 py-3' data-aos='fade-up'>
      <h1 className='mt-3 fw-700 px-4'>COMBO<span className='blue-txt'> TOUR ACTIVITIES</span></h1>
      <Combos/>
    </Container>
    </div>
    <SignUp/>
  </div>
  )
}

export default React.memo(Desktop)

{/*
<Widget publicKey='b88855950ae25756154e' id='file' multiple={true}
    onFileSelect={(file) => {
        console.log('File changed: ', file)
    
        if (file) {
            file.progress(info => console.log('File progress: ', info.progress))
            file.done(info => console.log('File uploaded: ', info))
        }
        }}
        onChange={info => console.log('Upload completed:', info)}
/>
*/}