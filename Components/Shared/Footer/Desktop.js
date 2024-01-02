import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Router from 'next/router';
import { FaShieldAlt } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Desktop = () => {
  return (
    <>
    <div className='footer-styles'>
    <div className='bgTop pt-5 pb-2'>
        <Container className='px-5'>
            <Row>
                <Col className='px-3'>
                    <h6 className='heading'>CONTACT INFO</h6>
                    <div className='my-4 mt-4 wh-txt'>
                    <span className=''><FaPhoneAlt style={{position:'relative', bottom:2}}/></span>
                    <span className='fs-16 mx-2'>+ 971  55 998 6370</span>
                    <div className='mb-4'> 
                        <span className=''><MdEmail style={{position:'relative', bottom:2}}/></span><span className='fs-16 mx-2'>info@peacelandtravel.com</span>
                    </div>
                    </div>
                </Col>
                <Col className='px-3'>
                    <div className='heading'>ABOUT US</div>
                    <div className='mt-4 wh-txt cur' onClick={()=>Router.push("/about")}>- {" "}Our Story</div>
                    <div className='wh-txt cur' onClick={()=>Router.push("/contact")}>- {" "}Contact Us</div>
                </Col>
                <Col className='px-3'>
                    <div className='heading mb-4'>SOCIAL LINKS  </div>
                    <FaFacebook className='wh-txt mx-2 cur fs-18' />
                    <FaInstagram className='wh-txt mx-2 cur fs-18' />
                    <FaSquareXTwitter className='wh-txt mx-2 cur fs-18' />
                    <FaLinkedin className='wh-txt mx-2 cur fs-18' />
                </Col>
                <Col className='px-3'>
                    <div className='heading mb-3'>PAY SAFELY WITH US</div>
                    <img src='/images/creditcard-logo.png' alt='credit card' />
                    <div className='wh-txt'><FaShieldAlt color='gold' className='mb-1 mx-2' /> Strip protected payemnt gateway</div>
                </Col>
            </Row>
        </Container>
    </div>
    <div className='bgBt p-3 text-center wh-txt'>
        Copyright 2024 Peaceland Travel, All Rights Reserved
    </div>
    </div>
    </>
  )
}

export default React.memo(Desktop);