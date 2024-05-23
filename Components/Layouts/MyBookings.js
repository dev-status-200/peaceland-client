import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Row, Col, Container} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Link from 'next/link';
import moment from 'moment';
import Router from 'next/router';
import { Empty } from 'antd';
import Aos from 'aos';
import useWindowSize from '/functions/useWindowSize';

const MyBookings = () => {

    const conversion = useSelector((state) => state.currency.conversion);
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState({});

    const size = useWindowSize();

    useEffect(() => {
        Aos.init({duration:300});
        getValues()
    }, [])

    async function getValues(){
        let token = await Cookies.get("token");
        if(token){
            let data = JSON.parse(token)
            await token?setUser({...data, loggedIn:true}):null;
            retrive(data.email);
        }
    }

    const retrive = async(data) => {
        await axios.post(process.env.NEXT_PUBLIC_CREATE_GET_MY_RESERVATIONS,{
            email:data
        }).then((x) => {
            setBookings(x.data.result);
        })
    }

  return (
    <>
        <div className={`${size.width>600?"tickets-cont pt-5":"px-3 pt-1 "} pb-5 bg-white`}>
        {/* {(session && email=='') && <div>{retrive(session.user.email)}</div>} */}
        <h1 className='mt-4 grey-txt'>My Bookings</h1>
        <div className='mb-4'>All Your booking info will be diplayed here.</div>
        {user.loggedIn && <>
          {bookings.length!=0 &&<>
            {bookings.map((y, j)=>{
                return(
                <div key={j} className='booking-row p-3 my-1'>
                <Row className='' onClick={()=>Router.push(`/ticketPage?id=${y.id}`)}>
                <Col md={12} xs={12}>
                {y.BookedTours.map((x, i)=>{
                return(
                    <Row key={i} className="cart-item">
                        <Col md={12} xs={12}>
                        {i==0 &&
                            <Row>
                                <Col xs={7}>
                                <div className={`grey-txt fs-${size.width>500?"20":"15"} fw-500`}>Booking #{y.booking_no}</div>
                                <div className={`${size.width>500?'silver-2-txt':'silver-2-txt fs-12'}`}><span >{moment(y.moment).format('DD-MMM-YYYY, hh:ss a')}</span></div>
                                <div className='mt-2'>
                                    Discount:
                                    {" "}
                                    <span className='grey-txt'>
                                        {y.promo=="none"?
                                            <>No</>:
                                            <>
                                            <span style={{color:'goldenrod'}}>{JSON.parse(y.promo).name}</span> -
                                            <span style={{marginLeft:5}}>{JSON.parse(y.promo).price}</span>
                                            <span className=''>{JSON.parse(y.promo).byPercentage?'%':`${conversion.currency}`} OFF</span>
                                            </>
                                        }
                                    </span>
                                </div>
                                <div className='mt-2'>Total Price : {(y.final_price*conversion.rate).toFixed(2)} {conversion.currency}
                                </div>    
                                </Col>
                                <Col style={{textAlign:'end'}} xs={5}>
                                <img src={'/icons/reservation.png'} height={size.width>500? 90: 50}  alt="reservation"/>
                                
                                <div style={{color:'#2b55bf'}} className='mt-3'>View Tickets{">"}</div>
                                </Col>
                            </Row>
                        }
                        </Col>
                    </Row>
                )})}
                </Col>
                </Row>
                </div>
            )})}
          </>}
          {bookings.length==0 && <Container className='py-5' data-aos='fade-up'><Empty /> <h3 className='text-center fw-200 mt-5'>Looks like you haven't made any bookings yet!</h3></Container>}
        </>
        }
        {!user.loggedIn && <>
          <Container className='py-5 text-center' data-aos='fade-up'>
            <h3 className=' fw-200 mt-5'>Please Login to view bookings</h3>
            <h5 className='blue-txt cur' onClick={()=>Router.push("/auth")}>Login</h5>
          </Container>
        </>
        }
        </div>
    </>
  )
}

export default React.memo(MyBookings)