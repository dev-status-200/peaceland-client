import React from 'react';
import { ConfigProvider, Select, DatePicker, InputNumber } from 'antd';
import useWindowSize from '/functions/useWindowSize';
import { Row, Col } from "react-bootstrap";

const Hotels = () => {

    const size = useWindowSize();
    const ratingList = [
        {value:'4 Star', label:'4 Star' },
        {value:'5 Star', label:'5 Star' },
        {value:'6 Star', label:'6 Star' },
        {value:'7 Star', label:'7 Star' },
    ];

  return (
    <ConfigProvider theme={{token:{ colorPrimary:'#b8d233' }}}>
        <div className='hotel-styles'>
        <div className='main-container'>
            <div className='first-box'></div>
            <div className='second-box'></div>
            <div className='hotel-box'>
            <Row className='px-5'>
                <Col md={12} className='text-center px-5'>
                    <h2 className='blue-txt'>Hotel Booking Form</h2>
                    <div className='px-5 mx-5'>
                        <hr/>
                    </div>
                </Col>
                <Col md={1}></Col>
                <Col md={10}>
                <h5 className='mt-3 fw-700 fs-20 blue-txt'>Rating</h5>
                <Select
                    mode="multiple"
                    size={'large'}
                    style={{width:'100%'}}
                    placeholder="Please select Hotel Rating"
                    options={ratingList}
                />
                </Col>
                <Col md={1}></Col>
            </Row>
            <Row className='px-5 my-3'>
                <Col md={1}></Col>
                <Col md={3}>
                    <h5 className='mt-3 fw-700 fs-20 blue-txt'>Check - In</h5>
                    <DatePicker style={{width:'100%'}} size={'large'} placeholder='Enter Check-in Date' />
                </Col>
                <Col md={3}>
                    <h5 className='mt-3 fw-700 fs-20 blue-txt'>Check - Out</h5>
                    <DatePicker style={{width:'100%'}} size={'large'} placeholder='Enter Checkout Date' />
                </Col>
                <Col md={2}>
                    <h5 className='mt-3 fw-700 fs-20 blue-txt'>Adults</h5>
                    <InputNumber style={{width:'100%'}} size={'large'} placeholder='Enter No. of Adults' />
                </Col>
                <Col md={2}>
                    <h5 className='mt-3 fw-700 fs-20 blue-txt'>Children</h5>
                    <InputNumber style={{width:'100%'}} size={'large'} placeholder='Enter No. of Adults' />
                </Col>
                <Col md={1}></Col>
            </Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4} className='text-center pt-5 pb-1'>
                    <button className='book-btn-2'>Submit</button>
                </Col>
                <Col md={4}></Col>
            </Row>
            </div>
        </div>
        </div>
    </ConfigProvider>
  )
}

export default React.memo(Hotels)