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
    axios.post(process.env.NEXT_PUBLIC_POST_CONTACT_US_MESSAGE,form)
    .then((x)=>{
      console.log(x.data);
      setForm({
        name:'',
        msg:'',
        email:''
      });
      openNotificationWithIcon('success')
    })
  }
  return (
  <div className='contact-styles bg-white'>
    {contextHolder}
    <Container>
    <Row className=''>
      <Col md={7} className={`${size.width>500?'pt-5 mt-5':''}`}>
        {size.width>500 &&<div className='my-5'></div>}
        <div className={`mb-2 fw-700 fs-${size.width>500?"45":"30"} black-txt`} style={{lineHeight:1}}>HAVE ANY <span className='blue-txt'>QUESTIONS?</span></div>
        <div className={`mb-5 fw-500 fs-${size.width>500?"35":"25"} black-txt`} style={{lineHeight:1}}>FEEL FREE TO REACH OUT</div>
        <p className='grey-txt fs-18' style={{maxWidth:'75%'}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
        </p>
        <p className='grey-txt fs-18'>Our Contact Form is Below</p>
        {size.width>500 && <div className='pt-5'></div>}
      </Col>
      <Col md={5} className='p-5 text-center'>
        <img src='images/contact.png' className='mt-4' height={450} />
      </Col>
    </Row>
    <hr className='pt-0 mt-0' />
    <Row className='contact-bg'>
    {size.width>500 &&<Col md={3}></Col>}
      <Col md={6} className='text-center contact-box'>
        <ConfigProvider theme={{token:{ colorPrimary:'#ebf13c', borderRadius:0 }}}>
          <form className='fs-18' onSubmit={handleSubmit}>
            <div className='text-start'>Name</div>
            <Input placeholder="Name" required className='' value={form.name} onChange={(e)=>setForm((x)=>{ return{...x, name:e.target.value} })} />
            <div className='text-start mt-3'>E-mail</div>
            <Input placeholder="Email" type='email' required className='mb-3' value={form.email} onChange={(e)=>setForm((x)=>{ return{...x, email:e.target.value} })} />
            <div className='text-start'>Message</div>
            <Input.TextArea placeholder="Your Message" required className='mb-4' rows={6} value={form.msg} onChange={(e)=>setForm((x)=>{ return{...x, msg:e.target.value} })}  />
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