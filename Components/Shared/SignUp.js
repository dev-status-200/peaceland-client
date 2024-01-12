import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { Row, Col } from 'react-bootstrap';
import Router from 'next/router';
import Cookies from 'js-cookie';

const SignUp = ({mobile}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    checkUser()
  }, [])
  async function checkUser(){
    const token = await Cookies.get("token");
    if(token){
      
    } else {
      //!isModalOpen?showModal():null
    }
  }
  
  return (
  <>
    <Modal title="Become a Member" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
    <Row>
      <Col md={12} className='my-2'>
        <Row>
          <Col md={3}>
          <IoMailUnreadOutline size={90}/> 
          </Col>
          <Col md={9}>
            <div className={`${"fs-20"}`}>Your Travel Journey Starts Here</div>
            <div className={`${"fs-20 mb-3"}`}>Signup and we'll send the best deals to you</div>
          </Col>
        </Row>
      </Col>
      <Col md={12} className=''>
        <div className='subscribe-btn' onClick={()=>Router.push("/auth")}>SUBSCRIBE</div>
      </Col>
    </Row>
    </Modal>
  </>
  )
}

export default React.memo(SignUp)
