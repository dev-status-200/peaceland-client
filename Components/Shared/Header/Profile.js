import React from 'react';
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
  {user.loggedIn && 
    <Dropdown
      overlayStyle={{colorBgElevated:'green'}}
      menu={{
        items,
      }}
    >
      <span className='cur'>
        {user && 
          <span>
            <img 
              src={user.picture} 
              style={{height:25, borderRadius:100, position:'relative', bottom:2}}
            />
            <span className='mx-2 fs-11'>{user.name}</span>
          </span>
        }
      </span>
    </Dropdown>}
    {!user.loggedIn && 
      <span className='green-txt cur' onClick={()=>router.push("/auth")}>
        {/* <FaUserCircle size={18} onClick={()=>router.push("/auth")} /> */}
        <span className='px-2 fw-700 fs-18' style={{position:'relative', bottom:4}}>Login</span>
      </span>
    }
  </ConfigProvider>
  </>
  )
}

export default React.memo(Profile)