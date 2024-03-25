import { ConfigProvider, Slider, Select, Checkbox, Input } from 'antd';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import useWindowSize from '/functions/useWindowSize';
import React, { useEffect, useState } from 'react';
import SignUp from '/Components/Shared/SignUp';
import { useRouter } from 'next/router';
import Tours from './Tours';
import axios from 'axios';
import aos from "aos";

const Package = ({destination, city, date, category, tourData}) => {

  const size = useWindowSize();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [load, setLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState([]);
  const [index, setIndex] = useState(1);
  const [pages, setPages] = useState(0);
  const tempDuration = {
    uptoOne:false,
    oneToFour:false,
    fourToDat:false
  };

  const [duration, setDuration] = useState({...tempDuration});
  const [pagination, setPagination] = useState(false);
  const [price, setPrice] = useState(3000);

  useEffect(() => {
    aos.init({duration:500});
    let tempData = tourData.result.map((x)=>{
      return { ...x, includes:JSON.parse(x.packageIncludes), hide:true }
    })
    setRecords(tempData);
    console.log(tempData)
    setLoad(false);
  }, [])

return(
  <div className='home-styles'>
  <div className={` white-bg ${size.width>500?'pt-5':''} `} data-aos="fade-in">
    <Container className={`${size.width>500?'pt-5':''}`}>
      <Row>
        <Col md={9} className={`${size.width>500?"px-5":"p-0 m-0 px-3"}`}>
          {!load &&
            <Tours
              search={search} size={size} 
              setSearch={setSearch} records={records}
              searchTerm={searchTerm} setRecords={setRecords}
              index={index} pages={pages} pagination={pagination}
              price={price} category={category} setIndex={setIndex} 
            />
          }
          {load && <div className='text-center pb-3 mt-5'><Spinner variant='dark' className='mt-5' /></div>}
        </Col>
        <Col md={3} className="pt-4 mb-5" style={{paddingRight:10}}>
          <div className='tour-filters mt-1'>
            <Row className='tour-fltr-locate px-3 py-3 my-2'>
              {/* <Col md={12} className='mt-1 fs-12'>
                <div><b>City</b></div>
                  <ConfigProvider theme={{ token:{ colorPrimary: '#b8d233', borderRadius:0 }}}>
                    <Select  style={{minWidth:"100%"}} value={city} 
                      onChange={(e)=> router.push({pathname:'/activities', query:{destination:destination, city:e, category:category }})}
                      options={list||[]} />
                  </ConfigProvider>
              </Col> */}
              <h5 className='mt-4 mb-0 blue-txt px-1'><b>Price</b></h5>
              <h6 className='mt-1 px-1 mx-2 pb-0 mb-0'>0 - {price}</h6>
              <div className='pr-3'>
                <ConfigProvider theme={{token:{ colorPrimary:'#b8d233', borderRadius:0 }}}>
                  <Slider className='' defaultValue={price} max={3000} onChange={(e)=>setPrice(e)} />
                </ConfigProvider> 
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
  <SignUp mobile={size.width>500?false:true} />
  </div>
)}

export default React.memo(Package)