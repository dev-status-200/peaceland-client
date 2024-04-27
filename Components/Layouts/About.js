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
            <p className={`mb-2 fw-700 green-txt fs-22`}>COMPANY OVERVIEW</p>
            <div className={`mb-4 mt-3 fw-700 fs-${size.width>500?"55":"30"} black-txt`} style={{lineHeight:1}}>
              DISCOVER THE <span className='blue-txt'>WORLD</span> WITH OUR GUIDE
            </div>
            {/* <p className={`mb-2 fw-700 green-txt fs-22`}>WHY CHOOSE US?</p> */}
            <span className={`${size.width>500?"fs-20":"fs-15"} black-txt fw-500`}>
              <p>
                  Peace Land Travel and Tourism has grown and evolved from an SME in the UAE to a well-established and recognized Travel and
                  Tour Management Company, contributing to all the sectors of the travel industry in the UAE.
                  <br/>
                  <br/>
                  We proudly offer our services to almost all nationalities, warmly welcomed by us in the UAE.
              </p>
            </span>
          </Col>
          <Col md={5} className='py-1' xs={12}>
            <div style={{float:'right'}}>
              <img src={'/images/whyusnew.png'} style={{width:size.width>500?'32vw':320}} alt="Why Us" />
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
              <img src={'/images/uae-about-us.png'} style={{width:'33vw'}} alt="About Us" />
            </div>
          </Col>
          }
          <Col className='grey-txt' md={6}>
            <div className={`fw-500 fs-${size.width>500?"55":"30"} blue-txt`}>About US!</div>
            <div className={`${size.width>500?"fs-20":"fs-15"} black-txt fw-400`}>
              <p>
                Peace land Travel and Tourism is a renowned travel agency based in UAE, Dubai, and was founded in 
                the year 2006. It has been over a decade since we have served as a recognized travel agency in Dubai 
                offering a wide range of travel and tourism management services including UAE tourists{"’"} 
                visas, resident visas, work visas, airline tickets, hotel accommodations, and excursion packages. 
                We offer all these services on both corporate and individual customer levels and make sure to build a 
                long-term business relationship with our B2B clients and individuals to make their Dubai Tour a memorable 
                experience.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>  
    <div style={{backgroundColor:"white"}}>
      <Container>
        <Row data-aos='fade-up'>
          <Col className='grey-txt my-5 px-5' md={6} style={{borderRight:'1px solid black', textAlign:size.width>500?'right':'center'}}>
            <div className='blue-txt mb-3 fw-900 fs-20' style={{letterSpacing:7}}>
              OUR MISSION
            </div>
            <span className='fs-20 black-txt fw-400'>
              <p>
                Our mission is to offer fast, hassle-free, and one-stop destination management services to our customers.
              </p>
            </span>
          </Col>
          <Col className='grey-txt my-5 px-5' md={6}>
            <div className='blue-txt mb-3 fw-900 fs-20' style={size.width>500?{letterSpacing:7}:{textAlign:'center'}}>
              OUR VISION
            </div>
            <span className='fs-20 black-txt fw-400' style={size.width>500?{}:{textAlign:'center'}}>
              <p>
                We strive to lead destination management services in the UAE by offering the best travel and tourism services to our customers.
              </p>
            </span>
          </Col>
        </Row>
      </Container>
    </div>  
    <div className='py-5'>
      <Container className='my-5'>
        <Row  data-aos='fade-up'>
          <Col className='grey-txt my-5' md={6}>
            {/* <div className='green-txt fw-600 fs-22'>
              PEACE LAND TRAVEL’S B2B MODEL
            </div> */}
            <div className={`mb-3 fw-500 fs-${size.width>500?"55":"30"} blue-txt`} style={{lineHeight:1}}>
              PEACE LAND TRAVEL{"’"}S B2B MODEL
            </div>
            <span className={`${size.width>500?"fs-20":"fs-15"} black-txt fw-400`}>
              <p>
                As times are evolving in the travel and tourism industry, we{"’"}re adapting to the change.
                We are looking forward to creating a “One Stop Shop” for our B2B partners so they can easily access all our 
                services with the help of our B2B Portal.
              </p>
            </span>
            <div className='green-txt fw-600 fs-22'>
              Hotel Extranet
            </div>
            <span className={`${size.width>500?"fs-20":"fs-15"} black-txt fw-400`}>
              <p>
                We are heading towards the advanced Hotel extranet tool that will allow our B2B partners to access and 
                manage Hotel room inventories like, room availability, room allocation, blackout dates, room rates, etc.
              </p>
            </span>
            <div className='green-txt fw-600 fs-22'>
              Payment Gateway
            </div>
            <span className={`${size.width>500?"fs-20":"fs-15"} black-txt fw-400`}>
              <p>
                Our B2B partners can easily accept payments from anywhere in the world.
                Our payment gateway is fast, reliable, and secure with an in-built fraud detection system.
              </p>
            </span>
          </Col>
          <Col md={6} xs={12} className='py-1'>
              <div style={{float:'right'}}>
                <img src={'/images/about-us-image.png'} style={{width:size.width>500? '32vw':320}}  alt="About Us" />
              </div>
          </Col>
        </Row>
      </Container>
    </div>
    <div className='py-4'></div>
  </div>
  )
}

export default React.memo(About)