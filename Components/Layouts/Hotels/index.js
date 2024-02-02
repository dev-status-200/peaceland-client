import React, { useState, useEffect } from 'react';
import { ConfigProvider, Select, DatePicker, InputNumber, Rate, Modal, Button } from 'antd';
import useWindowSize from '/functions/useWindowSize';
import { Row, Col } from "react-bootstrap";
import { LoadingOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { delay } from "/functions/delay"
import dayjs from 'dayjs';
import axios from 'axios';
import Router, { useRouter } from 'next/router';

const Hotels = () => {

    const router = useRouter()
    const size = useWindowSize();
    const [form, setForm] = useState({
        checkin:dayjs().format("YYYY-MMM-DD"),
        checkout:dayjs().format("YYYY-MMM-DD"),
        rating:'3'
    });
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        getValues();
    }, [])

    async function getValues(){
        let token = await Cookies.get("token");
        let formValues = await Cookies.get("hotelForm");

        formValues?
            setForm(JSON.parse(formValues)):
            null
        await token?setUser({...(JSON.parse(token)), loggedIn:true}):null;
    }

    async function handleOk(){
        setLoading(true)
        await Cookies.set("hotelForm", JSON.stringify(form));
        Router.push("/auth")
    }

    async function submission(e){
        e.preventDefault();  
        if(user.email){
            setLoading(true);
            await delay(3000);
            setSuccess(true)
            setOpen(true);
            await axios.post(process.env.NEXT_PUBLIC_POST_BOOK_HOTEL,{...form, email:user.email})
            .then((x)=>{
                Cookies.remove("hotelForm")
                setLoading(false);
                Router.push("/")
            })
        } else {
            await Cookies.set("redirect",`${router.pathname}`) 
            setOpen(true);
        }
    }
    
  return (
    <>
    <ConfigProvider theme={{token:{ colorPrimary:'#b8d233' }}}>
    <div className='hotel-styles'>
    <div className='main-container'>
        <div className='first-box'></div>
        <div className='second-box'></div>
        <div className='hotel-box'>
        <form onSubmit={submission}>
        <Row className=''>
            <Col md={12} className='text-center px-5'>
                <h2 className='blue-txt'>Hotel Booking Form</h2>
                <div className='px-5 mx-5'>
                    <hr/>
                </div>
            </Col>
            <Col md={1}></Col>
            <Col md={8}>
            <h5 className='mt-3 fw-700 fs-20 blue-txt'>Rating</h5>
            <Select
                required
                size={'large'}
                style={{width:'100%'}}
                placeholder="Please select Hotel Rating"
                value={form.rating}
                onChange={(e)=>setForm((x)=>{return {...x, rating:e}})}
            >
                <option value={'6'}> <Rate value={6} style={{fontSize:14}} /> <span className='mx-1'>6 Star</span> </option>
                <option value={'5'}> <Rate value={5} style={{fontSize:14}} /> <span className='mx-1'>5 Star</span> </option>
                <option value={'4'}> <Rate value={4} style={{fontSize:14}} /> <span className='mx-1'>4 Star</span> </option>
                <option value={'3'}> <Rate value={3} style={{fontSize:14}} /> <span className='mx-1'>3 Star</span> </option>
                <option value={'2'}> <Rate value={2} style={{fontSize:14}} /> <span className='mx-1'>2 Star</span> </option>
            </Select>
            </Col>
            <Col md={2}>
                <h5 className='mt-3 fw-700 fs-20 blue-txt'>Rooms</h5>
                <InputNumber style={{width:'100%'}} size={'large'} placeholder='No. of Rooms' required
                    value={form.rooms} min={1}
                    onChange={(e)=>setForm((x)=>{return {...x, rooms:e}})}
                />
            </Col>
            <Col md={1}></Col>
        </Row>
        <Row className='my-3'>
            <Col md={1}></Col>
            <Col md={3}>
                <h5 className='mt-3 fw-700 fs-20 blue-txt'>Check - In</h5>
                <DatePicker required
                    style={{width:'100%'}} size={'large'} placeholder='Enter Check-in Date' 
                    value={form.checkin?dayjs(form.checkin):dayjs()} allowClear={false}
                    onChange={(e)=>setForm((x)=>{return {...x, checkin:`${dayjs(e).format("YYYY-MMM-DD")}` }})}
                />
            </Col>
            <Col md={3}>
                <h5 className='mt-3 fw-700 fs-20 blue-txt'>Check - Out</h5>
                <DatePicker style={{width:'100%'}} size={'large'} placeholder='Enter Checkout Date' 
                    value={form.checkout?dayjs(form.checkout):dayjs()} allowClear={false}
                    onChange={(e)=>setForm((x)=>{return {...x, checkout:`${dayjs(e).format("YYYY-MMM-DD")}` }})}
                />
            </Col>
            <Col md={2}>
                <h5 className='mt-3 fw-700 fs-20 blue-txt'>Adults</h5>
                <InputNumber style={{width:'100%'}} size={'large'} placeholder='No. of Adults' required
                    value={form.adults} min={1}
                    onChange={(e)=>setForm((x)=>{return {...x, adults:e }})}
                />
            </Col>
            <Col md={2}>
                <h5 className='mt-3 fw-700 fs-20 blue-txt'>Children</h5>
                <InputNumber style={{width:'100%'}} size={'large'} placeholder='No. of Children' 
                    value={form.children} required min={0}
                    onChange={(e)=>setForm((x)=>{return {...x, children:e }})}
                />
            </Col>
            <Col md={1}></Col>
        </Row>
        <Row>
            <Col md={4}></Col>
            <Col md={4} className='text-center pt-4 pb-1'>
                <button className='book-btn-2'>{loading?<LoadingOutlined />:"Submit"}</button>
            </Col>
            <Col md={4}></Col>
        </Row>
        </form>
        </div>
    { size.width<600 && <div className='py-3' ></div> }
    </div>
    </div>
    </ConfigProvider>
    <Modal title={success?"":"Attention"}
        open={open}
        centered
        footer={[
            <Button
              type="primary"
              onClick={success?()=>setOpen(false):handleOk}
            >
              {success?"OK":"Login"}
            </Button>,
        ]}
    >   
    {!success &&
    <div className='fs-17'>
        <hr/>
        <h5>Email is required for Submission</h5>
        <p className='mt-3'>Login with Google in just on click to continue!</p>
        <br/>
    </div>
    }
    {success &&
        <div className='p-2'>
        <div className='text-center' data-aos="fade-in">
            <img src={"/other-assets/payment_done.png"} height={100} className='mt-4' alt="Success"/>
            <h1 style={{color:"#20bf55", fontWeight:700}} className="my-3">Success</h1>
            <p style={{color:"grey"}}>Form Submitted successfully, you'll be receiving hotel offers according to your requirements from out team in 24 hours</p>
        </div>
        </div>
    }
    </Modal>
    </>
  )
}

export default React.memo(Hotels)