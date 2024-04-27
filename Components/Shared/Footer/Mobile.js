import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from 'next/link';
import { FaShieldAlt } from "react-icons/fa";

const Mobile = () => {
  return (
  <div className='footer-styles'>
    <div style={{minHeight:100}} className='bgTop'>
      <Row>
        <Col md={12} className='text-center'>
        <div className='my-3 wh-txt'>
          <span><FaPhoneAlt style={{position:'relative', bottom:2}}/></span><span className='fs-20 mx-2'>+ 971  55 998 6370</span>
          <div> 
            <span><MdEmail style={{position:'relative', bottom:2}}/></span><span className='fs-18 mx-2'>info@peacelandtravel.com</span>
          </div>
          </div>
        </Col>
        <Col xs={1}></Col>
        <Col xs={10} className='text-center my-4'>
            <div className='wh-txt'>
              <b>Address # 1</b><br/>
              <span className='fw-300'>Office # 302, Royal Plaza Bdg Opposite ADCB Bank Al Rigga Road, Deira - 1 B St Dubai-UAE</span>
              <div><b>Tell:</b> +971 50 337 4890</div>
            </div>
            <div className='wh-txt'>
              <b>Address # 2</b><br/>
              <span className='fw-300'>Shop # 4, Rahab Hotel Bldg, Beside Bori Masjid Eyal Nasser, Street # 16 Deira Dubai-UAE</span>
              <div><b>Tell:</b> +971 4 255 7003</div>
            </div>
        </Col>
        <Col xs={1}></Col>
        <Col xs={12} className='text-center my-2'>
          <h3 className='wh-txt'>Follow us on</h3>
          <div className='social-links-mobile'>
            <div className='social-white'>
            <Link href={'https://www.facebook.com/peacelandtraveltourism.official/'} target='_blank'>
              <img src='/icons/facebook.png' height={30} />
            </Link>
            <Link href="https://www.tiktok.com/@peacelandtravel" target='_blank'>
              <img src='/icons/tiktok.png' height={30} />
            </Link>
            <Link href="https://www.instagram.com/peacelandtravelandtourism/?fbclid=IwAR0Ol2E3QiKOWgGxlBu0vvIvYvwbKERTs_yo_-lnzLRY-5LOvbjykfR_7Nc" target='_blank'>
              <img src='/icons/insta.png' height={30} />
            </Link>
            <Link href={'https://twitter.com/peacelandgroup'} target='_blank'>
              <img src='/icons/x.png' height={30} />
            </Link>
            <Link href="https://www.linkedin.com/company/peaceland-travels-and-tourism/" target='_blank'>
              <img src='/icons/linked.png' height={30} />
            </Link>
            <Link href="https://www.youtube.com/@peacelandtravel/" target='_blank'>
              <img src='/icons/youtube.png' height={30} />
            </Link>
            </div>
          </div>
        </Col>
        <Col md={12} className='py-3 px-5 text-center my-2'>
          <div className='heading'>PAY SAFELY WITH US</div>
          <div className='wh-txt'>The payment is encrypted and transmitted securely with an SSL protocol.</div>
          <img src='/images/creditcard-logo.png' alt='credit card' />
        </Col>
      </Row>
    </div>
    <div className='bgBt text-center py-2'>
      <div className='wh-txt fs-12'>COPYRIGHT 2024 PEACELAND TRAVEL, ALL RIGHT RESERVED</div>
    </div>
  </div>
  )
}

export default React.memo(Mobile)