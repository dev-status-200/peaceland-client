import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { CiLocationOn } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import { Rate } from 'antd';

import useWindowSize from '/functions/useWindowSize';

const Details = ({tour, detail, BookCompTwo}) => {
  
  const size = useWindowSize();
  
  return (
  <>
    {detail &&
    <>
    <div className='mt-4'>
    {size.width>500 && 
    <>
      <div className={`fs-33 fw-700 blue-txt`}>{tour.title}</div>
      <span>
        <Rate disabled defaultValue={5} style={{fontSize:12, color:'orange'}} />
      </span>
      <span className ='mx-2 fs-12' style={{color:'grey'}}>
        {"("}3 Reviews{")"}
      </span> 
      {/* <IoLocationSharp size={15} style={{position:'relative', bottom:2}}/>  */}
      <div className='grey-txt-2 mt-2 flex'>
        <CiLocationOn size={16} />{" "}
        <span className='fs-16 mx-1'>Travel <b>{tour.packageTravel}</b> Days</span> 
        <span className='mx-2'>|</span>
        <span className='fs-16 mx-1'><b>{tour.packageCountry}</b> Country</span>
        <span className='mx-2'>|</span>
        <span className='fs-16 mx-1'><b>{tour.packageCity}</b> City</span>
      </div>
    </>
    }
    {size.width>600 && <>
    <div className='mt-3' >
      {BookCompTwo}
    </div>
    <hr/>
    </>}
    <h6 className='blue-txt mt-4'>Description</h6>
    <p className='fs-16 grey-txt'>
      {tour?.tour_detail.slice(0,940)} ...
    </p>
    </div>
    </>
    }
  </>
  )
}

export default React.memo(Details)