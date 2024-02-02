import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Dropdown } from 'antd';
import { useRouter } from 'next/router';

const Profile = () => {

  const router = useRouter();
  const items = [
    { label: <div className='' onClick={()=>router.push('/myBookings')}>My Bookings</div>, key: '1' },
    { label: <div className='' onClick={()=>router.push('/auth')}>Login</div>, key: '2' },
  ];

  return (
  <>
    <Dropdown
        overlayStyle={{colorBgElevated:'green'}}
        menu={{
            items,
        }}
    >
        <FaUserCircle className='header-icons' size={18} style={{position:'relative', bottom:2}} />
    </Dropdown>
  </>
  )
}

export default React.memo(Profile)