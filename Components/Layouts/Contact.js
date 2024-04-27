import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { ConfigProvider, notification, Input } from 'antd';
import useWindowSize from '/functions/useWindowSize';
import axios from 'axios';

const Contact = () => {

  const size = useWindowSize();
  const [ form, setForm ] = useState({});
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Success',
      description:
        'Your message has been submitted.',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    let tempForm = {...form, email:form.email +', '+ form.phone}
    axios.post(process.env.NEXT_PUBLIC_POST_CONTACT_US_MESSAGE,tempForm)
    .then((x)=>{
      // console.log(x.data);
      setForm({
        name:'',
        msg:'',
        email:'',
        phone:'',
      });
      openNotificationWithIcon('success')
    })
  }
  return (
  <div className='contact-styles bg-white'>
    {contextHolder}
    <Container>
    <Row className=''>
      <Col md={7} className={`${size.width>600?'pt-5 ':'pt-5'}`}>
        {size.width>600 &&<div className='my-5'></div>}
        <div className={`mb-2 fw-700 fs-${size.width>600?"45":"30"} black-txt`} style={{lineHeight:1}}>HAVE ANY <span className='blue-txt'>QUESTIONS?</span></div>
        <div className={`mb-5 fw-600 fs-${size.width>600?"35":"25"} black-txt`} style={{lineHeight:1}}>FEEL FREE TO REACH OUT</div>
        <p className='grey-txt fs-18' style={{maxWidth:'75%'}}>
        Have questions or need assistance with scheduling your trip? Do not hesitate to get in touch with us. Our team is here to assist you every step of the way, ensuring that your travel experience is hassle-free and memorable.
        </p>
        <p className='grey-txt fs-18'>Our Contact Form is Below</p>
        {size.width>600 && <div className='pt-5'></div>}
      </Col>
      <Col md={5} className='p-5 text-center'>
        {size.width>600 && <img src='images/contact.png' className='mt-4' height={450} />}
      </Col>
    </Row>
    <hr className='pt-0 mt-0' />
    <Row className='contact-bg mx-2'>
    {size.width>600 &&<Col md={3}></Col>}
      <Col md={6} className='text-center contact-box'>
        <ConfigProvider theme={{token:{ colorPrimary:'#ebf13c', borderRadius:0 }}}>
          <form className='fs-18' onSubmit={handleSubmit}>
            <div className='text-start'>Name</div>
            <Input placeholder="Enter Your Name" required className='' value={form.name} onChange={(e)=>setForm((x)=>{ return{...x, name:e.target.value} })} />
            <div className='text-start mt-3'>E-mail</div>
            <Input placeholder="Enter Email" type='email' required className='' value={form.email} onChange={(e)=>setForm((x)=>{ return{...x, email:e.target.value} })} />
            <div className='text-start mt-3'>Phone</div>
            <Input placeholder="Enter Contact No." type='text' required className='mb-3' value={form.phone} onChange={(e)=>setForm((x)=>{ return{...x, phone:e.target.value} })} />
            <div className='text-start'>Message</div>
            <Input.TextArea placeholder="Type Your Message" required className='mb-4' rows={6} value={form.msg} onChange={(e)=>setForm((x)=>{ return{...x, msg:e.target.value} })}  />
            <button className='green-btn mb-4'>Submit</button>
          </form>
        </ConfigProvider>
      </Col>
    </Row>
    </Container>
  </div>
  )
}

export default React.memo(Contact)