import React, { useEffect, useState, useRef } from 'react';
import Header from './Header/';
import Footer from './Footer/';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cart/cartSlice';
import { retrieveCart } from '../../functions/cartFunction';
import { WhatsAppOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { delay } from "../../functions/delay";
import { useRouter } from 'next/router';
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const MainLayout = ({children}) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(router.pathname=="/"?true:false);

  useEffect(() => { 
    dispatch(addProduct(retrieveCart()));
    closeBar()
  }, []);

  const closeBar = async() => {
    await delay(2500);
    setOpen(false);
  }

  return (
  <>
    <Layout style={{fontFamily:'Alata'}}>
    <Header/>
      {children}
    <Footer/>
    <FloatingWhatsApp
      phoneNumber="971559986370"
      accountName="Peaceland"
      allowEsc
      avatar={'/images/peaceland.png'}
      allowClickAway
      notification
      notificationSound
    />
    </Layout>
  </>
  )
}

export default React.memo(MainLayout)
