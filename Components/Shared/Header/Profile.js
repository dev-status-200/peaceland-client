import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Dropdown, ConfigProvider } from 'antd';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";

const Profile = ({user}) => {

  const router = useRouter();
  const items = [
    { label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push('/myBookings')}>My Bookings</div>, key: '1' },
    { label: <div className='mx-2 p-1 fw-500' onClick={()=>{
      if(user.loggedIn){
        Cookies.remove("token"); 
        router.reload("/")
      } else {
        router.push('/auth')
      }
    }}>{!user.loggedIn?"Login":"Logout"}</div>, key: '2' },
  ];

  return (
  <>
  <ConfigProvider theme={{token:{ colorBgElevated:'#194e9e', colorText:'white', controlItemBgHover:'#0a0f57' }}}>
  {user && <Dropdown
      overlayStyle={{colorBgElevated:'green'}}
      menu={{
        items,
      }}
    >
      <span>
        {user && <img src={user.picture} style={{height:22, borderRadius:100}} />}
        {(!user.picture) && <FaUserCircle color='#499b2f' size={18} onClick={()=>router.push("/auth")} />}
      </span>
    </Dropdown>}
  </ConfigProvider>
  </>
  )
}

export default React.memo(Profile)