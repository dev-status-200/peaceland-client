import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Dropdown, ConfigProvider } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const Destinations = () => {

  const router = useRouter();
  const [items, setList] = useState([])

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_GET_ALL_CITIES)
    .then((x)=>{
      let tempList = [];
      tempList = x.data?.result?.map((y, i)=>{
        return {
          label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push(`/activities?destination=uae&city=${y.name}&category=`)}>{y.name}</div>, key: `${i+1}`
        }
      });
      setList(tempList)
    })
  }, [])
  
  // const items = [
  //   { label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push('/activities?destination=uae&city=Dubai+City&category=')}>Dubai</div>, key: '1' },
  //   { label: <div className='mx-2 p-1 fw-500' onClick={()=>router.push('/activities?destination=uae&city=Abu+Dhabi')}>Abu Dhabi</div>, key: '2' },
  // ];

  return (
  <>
  <ConfigProvider theme={{token:{ colorBgElevated:'#194e9e', colorText:'white', controlItemBgHover:'#0a0f57' }}}>
    {/* { items?.length>0 && <Dropdown
      overlayStyle={{colorBgElevated:'green'}}
      menu={{
        items,
      }}
    > */}
      <Link href={{pathname:'/destinations'}} className='nav-link-item'>Destinations</Link>
    {/* </Dropdown>
    } */}
  </ConfigProvider>
  </>
  )
}

export default React.memo(Destinations)