import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import useWindowSize from '/functions/useWindowSize';
import Aos from 'aos';

const About = () => {

    const size = useWindowSize();
    useEffect(() => {
        Aos.init({duration:300})
    }, [])

  return (
    <div className='home-styles' style={{backgroundColor:'white'}}>
        <div className='pb-5 pt-5'>
        <Container className='mb-5 pb-3 pt-5'>
            <Row  data-aos='fade-up'>
                <Col className='grey-txt' md={7}>
                    <p className={`mb-2 fw-700 green-txt fs-22`}>WHY CHOOSE US?</p>
                    <div className={`mb-5 fw-700 fs-${size.width>500?"55":"30"} black-txt`} style={{lineHeight:1}}>DISCOVER THE <span className='blue-txt'>WORLD</span> WITH OUR GUIDE</div>
                    <span className={`${size.width>500?"fs-20":"fs-15"} black-txt fw-500`}>
                        <p>
                            It{"’"}s our passion and our expertise, and has been for over two decades.
                            We know the trails and the towns inside and out. We know the hoteliers and their rooms,
                            and restauranteurs and their menus. We don{"’"}t guide on any route we haven{"’"}t done many times before.
                            Our expertise gives you a richer, more enjoyable experience, and we will makes better use of your time. 
                        </p>
                        <p>
                            We provide a thorough and complete orientation, so you are fully prepared to make the most of your Swiss vacation or Alps hiking adventure.
                            Your expert trip leader is with you for the entire trip
                        </p>
                    </span>
                </Col>
                <Col md={5} className='py-1' xs={12}>
                    <div style={{float:'right'}}>
                        <img src={'images/whyusnew.png'} style={{width:size.width>500?'32vw':320}} alt="Why Us" />
                    </div>
                </Col>
            </Row>
        </Container>
        </div>

        <div className='py-5 '>
        <Container className='my-5 py-3'>
            <Row  data-aos='fade-up'>
                {size.width>500 && 
                <Col md={6} className='py-1'>
                    <div className=''>
                        <img src={'images/uae-about-us.png'} style={{width:'33vw'}} alt="About Us" />
                    </div>
                </Col>}
                <Col className='grey-txt' md={6}>
                    <div className={`fw-400 fs-${size.width>500?"55":"30"} blue-txt`}>About US!</div>
                    <div className={`${size.width>500?"fs-20":"fs-15"} black-txt fw-500`}>
                        <p>
                            It{"’"}s our passion and our expertise, and has been for over two decades.
                            We know the trails and the towns inside and out. We know the hoteliers and their rooms,
                            and restauranteurs and their menus. We don{"’"}t guide on any route we haven{"’"}t done many times before.
                            Our expertise gives you a richer, more enjoyable experience, and we will makes better use of your time. 
                        </p>
                        <p>
                            We provide a thorough and complete orientation, so you are fully prepared to make the most of your Swiss vacation or Alps hiking adventure.
                            Your expert trip leader is with you for the entire trip
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>

        <div className='' style={{backgroundColor:"white"}}>
        <Container className=''>
            <div>
            <Row  data-aos='fade-up'>
                <Col className='grey-txt my-5 px-5' md={6} style={{borderRight:'1px solid black', textAlign:size.width>500?'right':'center'}}>
                <div className='blue-txt mb-3 fw-700 fs-20' style={{letterSpacing:7}}>OUR MISSION</div>
                    <span className='fs-20 black-txt fw-500'>
                        <p>
                        Our mission is to provide our customers with access to the most exciting events and thrilling experiences
                        in the United Arab Emirates through a user-friendly and hassle-free ticketing portal.
                        We strive to create a seamless ticket buying experience that is tailored to the needs and preferences of each customer.
                        </p>
                    </span>
                </Col>
                <Col className='grey-txt my-5 px-5' md={6}>
                <div className='blue-txt mb-3 fw-700  fs-20' style={size.width>500?{letterSpacing:7}:{textAlign:'center'}} >OUR VISION</div>
                    <span className='fs-20 black-txt fw-500' style={size.width>500?{}:{textAlign:'center'}}>
                        <p>
                        Our vision is to become the leading ticketing company in the UAE, known for our exceptional customer service, competitive pricing, and wide range of ticket choices. We aim to be the go-to destination for anyone looking to purchase tickets to explore UAE, and to constantly innovating our services for customers.
                        </p>
                    </span>
                </Col>
            </Row>
            </div>
        </Container>
        </div>

        <div className='py-5'>
        <Container className='my-5'>
            <div>
            <Row  data-aos='fade-up'>
                <Col className='grey-txt my-5' md={6}>
                <div className='green-txt fw-600 fs-22' style={{}}>OUR HISTORY</div>
                    <div className={`mb-3 fw-400 fs-${size.width>500?"55":"30"} blue-txt`} style={{lineHeight:1}}>FOUNDED IN 2000</div>
                    <span className={`${size.width>500?"fs-20":"fs-15"} black-txt fw-500`}>
                        <p>
                        Tickets Valley is a one-stop shop for all your ticketing needs.
                        The company is based in the United Arab Emirates.
                        We specialize in providing a wide range of tickets for events and experiences throughout the UAE.
                        Our team consists of professional travel experts who have deep knowledge and understanding of different destinations around the world. 
                        With Tickets Valley, customers can browse our extensive selection of tickets and pick the ones that fit their budget and preferences best.

                        </p>
                        <p>
                        We offer tickets to all adventures, activities and attractions in the UAE.
                        We are constantly updating to ensure that our customers have access to the latest and greatest experiences. 
                        </p>
                    </span>
                </Col>
                <Col md={6} xs={12} className='py-1'>
                    <div style={{float:'right'}}>
                        <img src={'images/about-us-image.png'} style={{width:size.width>500? '32vw':320}}  alt="About Us" />
                    </div>
                </Col>
            </Row>
            </div>
        </Container>
        </div>

        <div className='py-4'></div>
    </div>
  )
}

export default About