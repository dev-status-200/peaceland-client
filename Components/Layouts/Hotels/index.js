import React, { useState, useEffect } from 'react';
import { ConfigProvider, Select, DatePicker, InputNumber, Input, Rate, Modal, Button, Popover } from 'antd';
import useWindowSize from '/functions/useWindowSize';
import { Row, Col } from "react-bootstrap";
import { LoadingOutlined, CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { delay } from "/functions/delay"
import dayjs from 'dayjs';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import hotels from "/JSONData/hotels.json";
import codes from "/JSONData/codes.json";

const Hotels = () => {

    const router = useRouter()
    const size = useWindowSize();
    const [form, setForm] = useState({
        name:"",
        email:"",
        nationality:"AE",
        destination:"ajman",
        nights:"",
        currency:"AED",
        rooms:[],
        checkin:dayjs().format("YYYY-MMM-DD"),
        checkout:dayjs().format("YYYY-MMM-DD"),
        rating:'3'
    });
    const [roomInfo, setRoomInfo] = useState("");
    const [count, setCount] = useState(0);
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
            setSuccess(true)
            setOpen(true);
            await axios.post(process.env.NEXT_PUBLIC_POST_BOOK_HOTEL,{...form})
            .then(async(x)=>{
                Cookies.remove("hotelForm")
                await delay(7000);
                Router.push("/")
            })
        } else {
            await Cookies.set("redirect",`${router.pathname}`) 
            setOpen(true);
        }
    }

    useEffect(() => {
      let infoString = "";
      if(form.rooms.length>0){
        let guests = 0;
        form.rooms.forEach((x)=>{
            guests = guests + parseInt(x.adult) + parseInt(x.child);
        })
        infoString = `(${guests}) Guests in (${form.rooms.length}) Rooms`
      }
      setRoomInfo(infoString)
    }, [form])

    const content = (
    <div>
        <p className='red-txt mx-2'>Children cannot be above age 17 *</p>
        <div className='px-3'>
            {form.rooms.map((x, i)=>{
                return(
                    <Row key={x.pid} className='mt-1'>
                        <Col md={1} className='px-1 pt-4'><b> {i+1}.</b></Col>
                        <Col md={5} className='px-1'>
                            Adults<br/>
                            <InputNumber min={1} value={x.adult} onChange={(e)=>{
                                let tempState = {...form};
                                tempState.rooms[i].adult = e;
                                setForm(tempState)
                            }} />
                        </Col>
                        <Col md={5} className='px-1'>
                            Children <br/>
                            <InputNumber min={0} value={x.child} onChange={(e)=>{
                                let tempState = {...form};
                                tempState.rooms[i].child = e;
                                setForm(tempState)
                            }}  />
                        </Col>
                        <Col md={1} className='py-1 px-1'>
                            <br/>
                            <CloseCircleOutlined className='fs-17' onClick={()=>{
                                let tempForm = {...form};
                                let rooms = tempForm.rooms;
                                rooms = rooms.filter((y, j)=>{
                                    if(y.pid !=x.pid){
                                        return y
                                    }
                                });
                                tempForm.rooms = rooms;
                                setForm(tempForm);
                            }} /> 
                        </Col>
                    </Row>
                )
            })}
        </div>
        <button className='custom-btn mx-2 mt-3 mb-1' onClick={()=>{
            let tempState = {...form};
            tempState.rooms.push({adult:'1', child:'0', age:'1', pid:count});
            setCount(count + 1);
            setForm(tempState)
        }}>Add</button>
    </div>
    );

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
                <h2 className='blue-txt fw-600'>Hotel Booking Form</h2>
                <div className='px-5 mx-5'>
                    <hr/>
                </div>
            </Col>
            <Col md={1}></Col>
            <Col md={3}>
            <div className='mt-3 fw-700 fs-18 blue-txt'>Name</div>
                <Input style={{width:'100%'}} placeholder='Your Name' required
                    value={form.name} min={1}
                    onChange={(e)=>setForm((x)=>{return {...x, name:e.target.value }})}
                />
            </Col>
            <Col md={3}>
            <div className='mt-3 fw-700 fs-18 blue-txt'>E-mail</div>
                <Input style={{width:'100%'}} placeholder='Your Email' required type='email'
                    value={form.email} min={1}
                    onChange={(e)=>setForm((x)=>{return {...x, email:e.target.value }})}
                />
            </Col>
            <Col md={2}>
            <div className='mt-3 fw-700 fs-18 blue-txt'>Nationality</div>
            <Select  defaultValue="AE"
              style={{width:"100%"}}
              onChange={(e)=>setForm((x)=>{return {...x, nationality:e }})}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                ((option?.value) ?? '').toLowerCase().includes(input.toLowerCase())||
                ((option?.label) ?? '').toLowerCase().includes(input.toLowerCase())||
                ((option?.code) ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={codes}
            />
            </Col>
            <Col md={2}>
            <div className='mt-3 fw-700 fs-18 blue-txt'>Contact No.</div>
                <Input style={{width:'100%'}} placeholder='Your Phone ' required
                    value={form.contact} min={1}
                    onChange={(e)=>setForm((x)=>{return {...x, contact:e.target.value }})}
                />
            </Col>
            <Col md={1}></Col>
            <Col md={1}></Col>
            <Col md={3}>
            <div className='mt-3 fw-700 fs-18 blue-txt'>Rating</div>
            <Select
                required
                style={{width:'100%'}}
                placeholder="Please select Hotel Rating"
                value={form.rating}
                onChange={(e)=>setForm((x)=>{return {...x, rating:e}})}
            >
                <option value={'5'}> <Rate value={5} style={{fontSize:14}} /> <span className='mx-1'>5 Star</span> </option>
                <option value={'4'}> <Rate value={4} style={{fontSize:14}} /> <span className='mx-1'>4 Star</span> </option>
                <option value={'3'}> <Rate value={3} style={{fontSize:14}} /> <span className='mx-1'>3 Star</span> </option>
                <option value={'2'}> <Rate value={2} style={{fontSize:14}} /> <span className='mx-1'>2 Star</span> </option>
                <option value={'1'}> <Rate value={1} style={{fontSize:14}} /> <span className='mx-1'>1 Star</span> </option>
            </Select>
            </Col>
            <Col md={3}>
            <div className='mt-3 fw-700 fs-18 blue-txt'>Destination</div>
            <Select
                required
                style={{width:'100%'}}
                placeholder="Please select Destination"
                value={form.destination}
                onChange={(e)=>setForm((x)=>{return {...x, destination:e}})}
            >
                <option value={'abudhabi'}> <span className='mx-1'>Abu Dhabi</span> </option>
                <option value={'ajman'}> <span className='mx-1'>Ajman</span> </option>
                <option value={'dubai'}> <span className='mx-1'>Dubai</span> </option>
                <option value={'fujairah'}> <span className='mx-1'>Fujairah</span> </option>
                <option value={'rak'}> <span className='mx-1'>Rais Al Khaimah</span> </option>
                <option value={'sharjah'}> <span className='mx-1'>Sharjah</span> </option>
                <option value={'uaq'}> <span className='mx-1'>Umm Al Quwain</span> </option>
            </Select>
            </Col>
            <Col md={4}>
            <div className='mt-3 fw-700 fs-18 blue-txt'>Hotel</div>
            <Select
                required
                style={{width:'100%'}}
                placeholder="Please select Destination"
                value={form.hotel}
                onChange={(e)=>setForm((x)=>{return {...x, hotel:e}})}
                options={hotels[form.destination].map((x)=>{return { label:x.ProductName, value:x.ProductName }})}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  ((option?.value) ?? '').toLowerCase().includes(input.toLowerCase())||
                  ((option?.label) ?? '').toLowerCase().includes(input.toLowerCase())
                }
            />
            </Col>
            <Col md={1}></Col>
        </Row>
        <Row className='my-3'>
            <Col md={1}></Col>
            <Col md={3}>
                <div className=' fw-700 fs-18 blue-txt'>Check - In</div>
                <DatePicker required
                    style={{width:'100%'}} placeholder='Enter Check-in Date' 
                    value={form.checkin?dayjs(form.checkin):dayjs()} allowClear={false}
                    onChange={(e)=>setForm((x)=>{return {...x, checkin:`${dayjs(e).format("YYYY-MMM-DD")}` }})}
                />
            </Col>
            <Col md={3}>
                <div className='fw-700 fs-18 blue-txt'>Check - Out</div>
                <DatePicker style={{width:'100%'}} placeholder='Enter Checkout Date' 
                    value={form.checkout?dayjs(form.checkout):dayjs()} allowClear={false}
                    onChange={(e)=>setForm((x)=>{return {...x, checkout:`${dayjs(e).format("YYYY-MMM-DD")}` }})}
                />
            </Col>
            <Col md={4}>
                <div className=' fw-700 fs-18 blue-txt'>Room Info</div>
                <div style={{display:'flex'}}>
                    <Popover content={content} trigger="click">
                        <Button><EditOutlined style={{position:'relative', bottom:2}} /></Button>
                    </Popover>
                    <Input style={{marginLeft:5}} value={roomInfo} />
                </div>
            </Col>
            <Col md={1}></Col>
            <Col md={1}></Col>
        </Row>
        <Row>
            <Col md={4}></Col>
            <Col md={4} className='text-center pt-4 pb-1'>
                <button className='book-btn-2'>
                    {loading?<LoadingOutlined />:"Submit"}
                </button>
            </Col>
            <Col md={4}></Col>
        </Row>
        </form>
        </div>
    {size.width<600 && <div className='py-3' ></div> }
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