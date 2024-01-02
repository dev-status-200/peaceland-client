import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import { PiShoppingBagFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Router, { useRouter } from 'next/router';
import Cookies from "js-cookie";
import { fetchCurrencyData } from '/functions/fetchCurrencyData';
import { GrLogout } from "react-icons/gr";
import { HiShoppingCart } from "react-icons/hi";
import { BsCurrencyExchange } from "react-icons/bs";
import { Dropdown, Popover, Modal, Badge } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addCurrency, changeCurrency } from '/redux/currency/currencySlice';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import MyOffers from "/Components/Shared/MyOffers";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from 'next/link';

const Desktop = ({user}) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const [showOffers, setShowOffers] = useState(false);
  const currencyList = useSelector((state) => state.currency.value);
  const conversion = useSelector((state) => state.currency.conversion);
  
    useEffect(() => {
        if(Object.keys(currencyList).length==0){
            setCurrency();
        }
    }, [])

    const setCurrency = async() => {
        let items = await fetchCurrencyData();
        dispatch(addCurrency(items));
    }

  const items = [
    { label: <div className='text-center px-3' onClick={()=>router.push('/myBookings')}>My Bookings</div>, key: '0' },
    { label: <div className='text-center px-3' onClick={()=>setShowOffers(true)}>My Offers</div>, key: '1' }
  ];

  const adjustCurrency = (curr) => {
    dispatch(changeCurrency({currency:curr, rate:currencyList[`${curr}`]}));
  }

  return (
    <div className='header-styles' style={{backgroundColor:'white'}}>
        <div className='fixed'>
            <div className='container header-container py-2'>
                <div style={{width:"20%", textAlign:'left'}} >
                    <img src='/images/logo.png' height={80} className='cur' onClick={()=>router.push("/")} />
                </div>
                <div className='text-center'>
                    <Link href={"/"} className='nav-link-item'>Home</Link>
                    <Link href={{pathname:'/search',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}} className='nav-link-item'>Destinations</Link>
                    <Link href={{pathname:'/activities',  query:{destination:"uae", city:"Dubai City", category:'Theme Parks' }}} className='nav-link-item'>Activities</Link>
                    <Link href={"/"} className='nav-link-item'>Hotels</Link>
                    <Link href={"/visa"} className='nav-link-item'>Visa</Link>
                    <Link href={"/about"} className='nav-link-item'>About</Link>
                    <Link href={"/contact"} className='nav-link-item'>Contact Us</Link>
                </div>
                <div style={{width:"20%", textAlign:'right' }}>
                    <FaUserCircle className='header-icons' style={{position:'relative', bottom:2}} />
                    <Badge count={cart.length} showZero color="#faad14" size="small">
                        <FaCartShopping className='header-icons cur' onClick={()=>Router.push("/cart")} />
                    </Badge>
                    <span className='fs-20' style={{marginLeft:26, marginRight:18}}>|</span>
                    <SiFacebook  className='header-icons' style={{color:'#2b67b6'}} />
                    <SiInstagram className='header-icons' style={{color:'#e425b4'}} />
                    <FaSquareXTwitter className='header-icons' style={{color:'#grey'}} size={19} />
                </div>
            </div>
        </div>
        <div style={{margin:62}}></div>
        
        {/* <Row className='px-5 pt-1 m-0 white-bg' style={{paddingBottom:5}}>
            <Col md={6}>
                <div style={{fontSize:11}}>
                    <span ><FaPhoneAlt/></span>
                    <span className='mx-2' style={{position:'relative', top:2}}>+971 55 998 6370</span>
                    <span style={{marginLeft:1, marginRight:10, position:'relative', top:1}}>|</span>
                    <span style={{position:'relative', bottom:0}}><FaRegEnvelopeOpen/></span>
                    <span className=' mx-2' style={{position:'relative', top:2}}>info@peacelandtravel.com</span>
                </div>
            </Col>
            <Col md={6}>
                <div style={{float:'right', fontSize:11}}>
                    <Popover placement="bottom" content={
                        <div className='text-center' style={{minHeight:60}}>
                            <div>Select Currency</div>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('AED')}><span className="fi fi-ae"></span></span>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('USD')}><span className="fi fi-um"></span></span>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('AUD')}><span className="fi fi-au"></span></span>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('GBP')}><span className="fi fi-gb"></span></span>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('PKR')}><span className="fi fi-pk"></span></span>
                            <span className='cur mx-1 flag-hov' onClick={()=>adjustCurrency('INR')}><span className="fi fi-in"></span></span>
                        </div>
                    } trigger="click">
                        <span className='cur mx-2'>Change Currency <BsCurrencyExchange size={15} className='blue-txt' /></span>
                    </Popover>
                    <span className='cur mx-1'onClick={()=>router.push("/cart")}>{"("} {cart.length} {")"} <HiShoppingCart size={15} className='blue-txt' /></span>
                    <span className='mx-2'> | </span>
                    <span className='cur mx-1' style={{color:'#2b67b6'}}><SiFacebook/></span>
                    <span className='cur mx-1' style={{color:'#e425b4'}}><SiInstagram/></span>
                    <span className='cur mx-1' style={{color:'#25a1e4'}}><SiTwitter/></span>
                    {!user.loggedIn &&
                    <span className='cur mx-2' style={{position:'relative', top:2}}
                        onClick={()=>{
                            // This Logic sets the redirected URL to get back to this page
                            if(Object.keys(router.query).length>0){ 
                                Cookies.set("redirect",`${router.pathname}?id=${router.query.id}`)  
                            }
                            else { 
                                Cookies.set("redirect",`${router.pathname}`) 
                            }
                            router.push("/auth")
                        }}
                    >My Login</span>
                    }
                    {user.loggedIn &&
                    <>
                    <span className='cur mx-2' style={{position:'relative', top:2, }}>
                    <Dropdown menu={{ items }}>
                        <span onClick={(e) => e.preventDefault()}>
                            <span className='' style={{fontSize:13, marginLeft:10, position:'relative', bottom:2, marginRight:4}}><AiOutlineUser/></span>
                            {user.name}
                        </span>
                    </Dropdown>
                    </span>
                    <span className='cur  mx-2'  style={{position:'relative', top:2}} 
                        onClick={()=>{Cookies.remove("token"); Router.reload("/")}}
                    >
                        <GrLogout className='mx-1' style={{position:'relative', bottom:2, fontSize:13}}  />Logout
                    </span>
                    </>
                    }
                </div>
            </Col>
        </Row> */}
        {showOffers &&  <>
            <Modal title="My Offers" open={showOffers} onCancel={()=>setShowOffers(false)} footer={false} centered>
                <hr/>
                <MyOffers selectable={false} email={user.email} />
            </Modal>
        </>}
    </div>
  )
}

export default React.memo(Desktop)