import React, { useEffect, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import Router, { useRouter } from 'next/router';
import { fetchCurrencyData } from '/functions/fetchCurrencyData';
import { Dropdown, Modal, Badge, ConfigProvider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addCurrency, changeCurrency } from '/redux/currency/currencySlice';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Link from 'next/link';
import Aos from 'aos';
import useWindowSize from '/functions/useWindowSize';
import dynamic from 'next/dynamic';

const SearchBar = dynamic(() => import('./SearchBar'), {
  ssr:false,
});
const MyOffers = dynamic(() => import('/Components/Shared/MyOffers'), {
  ssr:false,
});
const Destinations = dynamic(() => import('./Destinations'), {
  ssr:false,
});
const Profile = dynamic(() => import('./Profile'), {
  ssr:false,
});

const Desktop = ({user}) => {

  const size = useWindowSize();
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const [showOffers, setShowOffers] = useState(false);
  const currencyList = useSelector((state) => state.currency.value);
  const conversion = useSelector((state) => state.currency.conversion);

  useEffect(() => {
    Aos.init({ duration:300 });
    if(Object.keys(currencyList).length==0){
      // setCurrency();
    }
  }, [])

  const setCurrency = async() => {
    let items = await fetchCurrencyData();
    dispatch(addCurrency(items));
  }

  const items = [
    { label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push('/activities?destination=&city=&category=Adventure')}>Adventure Tours</div>, key: '1' },
    { label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push('/activities?destination=&city=&category=Water+Parks')}>Water Parks  </div>, key: '2' },
    { label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push('/activities?destination=&city=&category=Family+Fun')}>Family Fun    </div>, key: '3' },
    { label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push('/activities?destination=&city=&category=Theme+Parks')}>Theme Parks  </div>, key: '4' },
    { label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push('/activities?destination=&city=&category=City+Tours')}>City Tours    </div>, key: '5' },
    { label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push('/activities?destination=&city=&category=Luxury+Tours')}>Luxury Tours</div>, key: '6' }
  ];

  const adjustCurrency = (curr) => {
    dispatch(changeCurrency({currency:curr, rate:currencyList[`${curr}`]}));
  }

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

  return (
  <div className='header-styles' style={{backgroundColor:'white'}}>
    <div className='fixed'>
      <div className='top-bar wh-txt fs-13 fw-300'>
        {changeTag && <div data-aos='slide-down'>
          Are you a seller? then join our B2B portal by registering at this <b> <a href="https://b2b.peacelandtravel.com/" target='_blank' className='wh-txt'> link </a> </b>
        </div>}
        {!changeTag && <div data-aos='slide-down'>
          Are you a seller? then join our B2B portal by registering at this <b> <a href="https://b2b.peacelandtravel.com/" target='_blank' className='wh-txt'> link </a> </b>
        </div>}
      </div>
      <div className='header-container py-2'>
        <div style={{width:"20%", textAlign:'left'}} >
          <img src='/images/logo.png' height={size.width>1200?80:50} className='cur' onClick={()=>router.push("/")} />
        </div>
        <div className='text-center'>
          <Link href={"/"} className='nav-link-item'>Home</Link>
          <Destinations/>
          <ConfigProvider theme={{token:{ colorBgElevated:'#194e9e', colorText:'white', controlItemBgHover:'#0a0f57' }}}>
            <Dropdown menu={{ items }} >
              <Link href={{pathname:'/activities'}} className='nav-link-item'>Activities</Link>
            </Dropdown>
          </ConfigProvider>
          <Link href={"/hotels"} className='nav-link-item'>Hotels</Link>
          <Link href={"/visa"} className='nav-link-item'>Visa</Link>
          <Link href={"/about"} className='nav-link-item'>About</Link>
          <Link href={"/contact"} className='nav-link-item'>Contact</Link>
        </div>
        <div style={{width:"21%", textAlign:'flex-end'}}>
          <div style={{display:'flex', justifyContent:'center'}}>
            <Badge count={cart.length} showZero color="#faad14" size="small">
              <FaCartShopping className='header-icons cur green-txt' onClick={()=>Router.push("/cart")} />
            </Badge>
            <div className='fs-20' style={{marginLeft:16, marginRight:10, backgroundColor:'black', height:20, width:2}}></div>
             <Profile user={user} />
          </div>
        </div>
      </div>
      <div style={{borderBottom:'2px solid #b8d233'}}></div>
      {(router.asPath=="/#first-section"||router.asPath=="/") && <SearchBar/>}
    </div>
    <div style={{marginTop:110}}></div>
    {showOffers &&
      <Modal title="My Offers" open={showOffers} onCancel={()=>setShowOffers(false)} footer={false} centered>
        <hr/>
        <MyOffers selectable={false} email={user.email} />
      </Modal>
    }
  </div>
  )
}

export default React.memo(Desktop)