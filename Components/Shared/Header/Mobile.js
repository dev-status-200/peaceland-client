import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { DownCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { CgMenuLeft } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Cookies from "js-cookie";
// import { fetchCurrencyData } from '/functions/fetchCurrencyData';
// import { GrLogout } from "react-icons/gr";
// import { addCurrency, changeCurrency } from '/redux/currency/currencySlice';
import { Drawer } from "antd";
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import MyOffers from "/Components/Shared/MyOffers";

import { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import axios from 'axios';


function ContextAwareToggle({ children, eventKey, callback }) {

  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton( eventKey, () => callback && callback(eventKey), );

  return (
    <button className='link-dropdown-btn' type="button" onClick={decoratedOnClick} >
      {children}
    </button>
  );
}

function OffCanvasExample({ name, user, ...props }) {

  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const handleClose = () => !load?setShow(false):null;
  const toggleShow = () => setOpen((s) => !s);
  const navStyles = {color:'white', textDecoration:'none', fontSize:22, fontWeight:400, lineHeight:2}
  
  const router = useRouter();
  const cart = useSelector((state) => state.cart.value);

  const [showOffers, setShowOffers] = useState(false);
  // const currencyList = useSelector((state) => state.currency.value);
  // const conversion = useSelector((state) => state.currency.conversion);

  useEffect(() => {
    // let values = Cookies.get("token");
    // if(values){
    //   setImage(JSON.parse(values)?.picture)
    // }
    axios.get(process.env.NEXT_PUBLIC_GET_ALL_CITIES)
    .then((x)=>{
      let tempList = [];
      tempList = x?.data?.result?.map((y, i)=>{
        return {
          name:y.name,
          url:`/activities?destination=uae&city=${y.name}&category=`
        }
      });
      setList(tempList)
    })
  }, [])

  const [countdown, setCountdown] = useState(1);
  const [changeTag, setChangeTag] = useState(false);
  
  useEffect(() => {
    let timeout;
    if (countdown < 1000) {
      timeout = setTimeout(() => {
        setCountdown(countdown + 1);
      }, 1000);
    }
    countdown%10==0?setChangeTag(!changeTag):null;
    return () => clearTimeout(timeout);
  }, [countdown]);

  const logout = ()=>{
    setLoad(true); 
    Cookies.remove("token"); 
    Router.reload("/")
  }

  return (
    <>
    <div className='fixed'>
      <div className='top-bar fs-13 bg-blue text-center wh-txt'>
        {changeTag && <div data-aos='slide-down'>
            Are you a seller? then join our B2B portal <b><a href="https://b2b.peacelandtravel.com/" target='_blank' className='mx-1 wh-txt'> link</a></b>
        </div>}
        {!changeTag && <div data-aos='slide-down'>
            Are you a seller? then join our B2B portal <b><a href="https://b2b.peacelandtravel.com/" target='_blank' className='mx-1 wh-txt'> link</a></b>
        </div>}
      </div>
    </div>
    <div className='bg-white'>
    <Container>
      <Row className='py-2'>
        <Col xs={4} className='text-start pt-3'>
          <CgMenuLeft onClick={toggleShow} color='#194e9e' size={23}/>
        </Col>
        <Col xs={4} className='text-center'>
        <img src={'/images/logo.png'} height={50} style={{position:'relative', right:10}} onClick={()=>router.push("/")} alt='logo' />
        </Col>
        <Col xs={4} className='text-end'>
          <div className='mt-3'>
           <span className='mx-2 grey-txt-2'>{`(${cart.length})`}<HiShoppingCart color='#194e9e' size={23} onClick={()=>router.push("/cart")} /></span>
            {user.loggedIn && <img src={user.picture} style={{height:22, borderRadius:100}} />}
            {!user.loggedIn && <FaUserCircle color='#194e9e' size={21} style={{position:'relative', bottom:1}} onClick={()=>router.push("/auth")} />}
          </div>
        </Col>
      </Row>
    </Container>
    </div>
    <Drawer 
      style={{backgroundColor:'#194e9e'}}
      title={<h4 className="wh-txt pt-2">Menu</h4>}
      placement={"left"}
      onClose={()=>setOpen(false)}
      open={open}
      width={"65%"}
    >
    <div>
    {!load &&
      <div className='navBar'>
        <div className='mt-3'></div>
        <Link style={navStyles} href='/'>Home</Link><br/>
        <Link style={navStyles} href='/destinations'>Destination</Link><br/>
        {/* <Link style={navStyles} href={{pathname:'/activities'}} >Activities</Link><br/><br/> */}
        <Accordion defaultActiveKey="3">
          <Link style={navStyles} href={{pathname:'/activities'}} >Activities</Link>
          <ContextAwareToggle eventKey="1">
            <DownCircleOutlined style={{color:'white', position:'relative', bottom:1, fontSize:20}} />
          </ContextAwareToggle>
          <Accordion.Collapse 
            eventKey="1" 
          >
            <div className='wh-txt'>
            <div className='mx-2 p-1 fs-18' onClick={()=>router.push('/activities?destination=&city=&category=Adventure')}>   - Adventure Tours</div>
            <div className='mx-2 p-1 fs-18' onClick={()=>router.push('/activities?destination=&city=&category=Water+Parks')}> - Water Parks  </div>
            <div className='mx-2 p-1 fs-18' onClick={()=>router.push('/activities?destination=&city=&category=Family+Fun')}>  - Family Fun    </div>
            <div className='mx-2 p-1 fs-18' onClick={()=>router.push('/activities?destination=&city=&category=Theme+Parks')}> - Theme Parks  </div>
            <div className='mx-2 p-1 fs-18' onClick={()=>router.push('/activities?destination=&city=&category=City+Tours')}>  - City Tours    </div>
            <div className='mx-2 p-1 fs-18' onClick={()=>router.push('/activities?destination=&city=&category=Luxury+Tours')}>- Luxury Tours</div>
            </div>
          </Accordion.Collapse>
          <br/>
        </Accordion>
        <Link style={navStyles} href='/hotels' >Hotels</Link><br/>
        <Link style={navStyles} href='/visa' >Visa</Link><br/>
        <Link style={navStyles} href='/about' >About</Link><br/>
        <Link style={navStyles} href='/contact' >Contact</Link><br/>
          {/* {!user.loggedIn &&
            <span className='cur' style={navStyles}
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
          } */}

          {user.loggedIn && 
          <div style={{position:'absolute', bottom:10}}>
            <span style={{color:'white', fontSize:17}} onClick={()=>router.push('/myBookings')}>
              My Bookings
            </span>
            <span style={{color:'white', fontSize:20}} className='mx-3'> | </span>
            {/* <div style={navStyles} onClick={async()=>{ await handleClose(); setShowOffers(true)}}>
              My Offers
            </div> */}
            <span style={{color:'white', fontSize:17}} onClick={logout}>
              Logout<LogoutOutlined className='px-2 fs-15' />
            </span>
          </div>
          }
          {!user.loggedIn && <div style={{position:'absolute', bottom:10}}>
          <span style={{color:'white', fontSize:17}} onClick={()=>router.push('/auth')}>
            My Login
          </span>
          </div>}
        
      </div>
    }
    {load &&
      <div className='text-center' style={{paddingTop:'70%', color:'white'}} >
        <Spinner size='lg' />
        <p style={{margin:15, fontSize:22}}>Please Wait...</p>
      </div>
    }
    </div>
    </Drawer>

    <hr className='p-0 m-0' />
    {showOffers && 
      <Modal 
        title="My Offers" 
        centered 
        scroll={false} 
        backdrop={true} 
        open={showOffers} 
        footer={false}
        onCancel={()=>setShowOffers(false)}
      >
        <hr/>
        <MyOffers selectable={false} email={user.email} />
      </Modal>
    }
    </>
  );
}

export default function Mobile({user}) {
  return (
    <>
      <OffCanvasExample scroll={false} backdrop={true} user={user} />
    </>
  );
}
