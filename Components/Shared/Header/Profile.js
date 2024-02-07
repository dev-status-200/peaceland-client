import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Dropdown, ConfigProvider } from 'antd';
import { useRouter } from 'next/router';

const Profile = () => {

  const router = useRouter();
  const items = [
    { label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push('/myBookings')}>My Bookings</div>, key: '1' },
    { label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push('/auth')}>Login</div>, key: '2' },
  ];

  return (
  <>
  <ConfigProvider theme={{token:{ colorBgElevated:'#194e9e', colorText:'white', controlItemBgHover:'#0a0f57' }}}>
    <Dropdown
      overlayStyle={{colorBgElevated:'green'}}
      menu={{
        items,
      }}
    >
      <FaUserCircle className='header-icons' size={18} style={{position:'relative', bottom:2}} />
    </Dropdown>
  </ConfigProvider>
  </>
  )
}

export default React.memo(Profile)