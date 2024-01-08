import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { ConfigProvider, Slider, Select, Checkbox, Input } from 'antd';
import useWindowSize from '/functions/useWindowSize';

const Contact = () => {

  const size = useWindowSize();

  return (
  <div className='contact-styles bg-white'>
    <Container>
    <Row className=''>
      <Col md={7} className={`${size.width>500?'pt-5 mt-5':''}`}>
        {size.width>500 &&<div className='my-5'></div>}
        <div className={`mb-2 fw-700 fs-${size.width>500?"45":"30"} black-txt`} style={{lineHeight:1}}>HAVE ANY <span className='blue-txt'>QUESTIONS?</span></div>
        <div className={`mb-5 fw-500 fs-${size.width>500?"35":"25"} black-txt`} style={{lineHeight:1}}>FEEL FREE TO REACH OUT</div>
        <p className='grey-txt' style={{maxWidth:'75%'}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
        </p>

        <p className='grey-txt'>Our Contact Form is Below</p>
        {size.width>500 && <div className='py-5'></div>}
      </Col>
      <Col md={5} className='p-5 text-center'>
        <img src='images/contact.png' className='mt-4' height={450} />
      </Col>
      <Col md={12}><hr/></Col>
      
    </Row>
    <Row className='contact-bg'>
    {size.width>500 &&<Col md={3}></Col>}
    <Col md={6} className='text-center contact-box'>
        <ConfigProvider theme={{token:{ colorPrimary:'#ebf13c', borderRadius:0 }}}>
        <form>
          <div className='text-start'>Name</div>
          <Input placeholder="Name" required className='' />
          <div className='text-start mt-3'>E-mail</div>
          <Input placeholder="Email" type='email' required className='mb-3' />
          <div className='text-start'>Message</div>
          <Input.TextArea placeholder="Your Message" required className='mb-4' rows={6} />

          <button className='green-btn mb-4'>Submit</button>
        </form>
        </ConfigProvider>
      </Col>
    </Row>
    </Container>
  </div>
  )
}

export default Contact
