import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { IoLocationSharp } from "react-icons/io5";
import { Rate } from 'antd';

import useWindowSize from '/functions/useWindowSize';

const Details = ({tour, detail}) => {
  
  const size = useWindowSize();
  
  return (
    <>
      {detail &&<>
      <div className='mt-4'>
      {size.width>400 && 
      <>
        <div className={`fs-35 fw-700 blue-txt`}>{tour.title}</div>
        <span>
          <Rate disabled defaultValue={5} style={{fontSize:12, color:'orange'}} />
        </span>
        <span className ='mx-2 fs-12' style={{color:'grey'}}>
          {"("}3 Reviews{")"}
        </span> 
        <IoLocationSharp size={15} style={{position:'relative', bottom:2}}/> 
        {" "}{tour.destination?.toUpperCase()}, {tour.city}
      </>
      }
        <h6 className='blue-txt mt-4'>Description</h6>
        <p className='fs-16 grey-txt'>
          {tour.tour_detail.slice(0,900)}...
        </p>
      </div>
      </>}
    </>
  )
}

export default Details