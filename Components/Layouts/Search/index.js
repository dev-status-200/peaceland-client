import { ConfigProvider, Slider, Select, Checkbox, Input } from 'antd';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import React, {useEffect, useState, useMemo} from 'react';
import useWindowSize from '/functions/useWindowSize';
import SignUp from '/Components/Shared/SignUp';
import { useRouter } from 'next/router';
import Tours from './Tours';
import axios from 'axios';
import aos from "aos";

const Search = ({destination, city, date, category, tourData}) => {

  const size = useWindowSize();
  const [search, setSearch] = useState("");
  
  const router = useRouter();
  const [load, setLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState([]);
  const [index, setIndex] = useState(1);
  const [pages, setPages] = useState(0);
  const [pagination, setPagination] = useState(false);
  const [price, setPrice] = useState(3000);

  const [list, setList] = useState([]);

  useEffect(() => {
    aos.init({duration:500});
    setRecords(tourData.result);
    setLoad(false);

    axios.get(process.env.NEXT_PUBLIC_GET_ALL_CITIES)
    .then((x)=>{
      let tempList = [];
      tempList = x.data.result.map((y, i)=>{
        return {
          value:y.name,
          label:y.name
        }
      });
      setList(tempList)
    })

  }, [router])

  const adjustCategory = (cat) => {
    router.push({
      pathname: '/activities',
      query: { destination:destination, city:city, category:cat }
    })
  }

return(
  <div className='home-styles'>
  <div className='white-bg mt-3' data-aos="fade-in">
  <Container className='pt-5'>
    <Row>
      <Col md={9} className={`${size.width>500?"px-5":"p-0 m-0 px-3"}`}>
        {!load &&
          <Tours 
            search={search} size={size} 
            setSearch={setSearch} records={records}
            index={index} pages={pages} pagination={pagination}
            price={price} category={category} setIndex={setIndex} searchTerm={searchTerm} 
          />
        }
        {load && <div className='text-center pb-3 mt-5'><Spinner variant='dark' className='mt-5' /></div>}
      </Col>
      <Col md={3} className="pt-4 mb-5" style={{paddingRight:10}}>
        <div className='tour-filters mt-1'>
          <Row className='tour-fltr-locate px-3 py-3 my-2'>
            <Col md={12} className='fs-12 '>
              <div><b>Destination</b></div>
                <ConfigProvider
                  theme={{ token:{ colorPrimary: '#b8d233', borderRadius:0 } }}>
                  <Select style={{minWidth:"100%"}} value={"uae"} 
                    options={[{ value: 'uae', label: 'UAE', }]}
                    onChange={(e)=> router.push({ pathname:'/activities', query:{ destination:e, city:city, category:category }})}
                  />
                </ConfigProvider>
            </Col>
            <Col md={12} className='mt-3 fs-12'>
              <div><b>City</b></div>
                <ConfigProvider theme={{ token:{ colorPrimary: '#b8d233', borderRadius:0 }}}>
                  <Select  style={{minWidth:"100%"}} value={city} 
                    onChange={(e)=> router.push({pathname:'/activities', query:{destination:destination, city:e, category:category }})}
                    options={list||[]} />
                </ConfigProvider>
            </Col>
            <h5 className='mt-4 mb-0 blue-txt px-1'><b>Price</b></h5>
            <h6 className='mt-1 px-1 mx-2 pb-0 mb-0'>0 - {price}</h6>
            <div className='pr-3'>
              <ConfigProvider theme={{token:{ colorPrimary:'#b8d233', borderRadius:0 }}}>
                <Slider className='' defaultValue={price} max={3000} onChange={(e)=>setPrice(e)} />
              </ConfigProvider> 
            </div>
            <div className='px-1'>
            <h5 className='mt-4 mb-2 blue-txt'><b>Duration</b></h5>
            <ConfigProvider
              theme={{ token:{ colorPrimary:'#b8d233', padding:50, height:40, borderRadius:0, size:'large' }}}>
              <Checkbox><h6 className='plt-2'>Upto 1 hour</h6></Checkbox><br/>
              <Checkbox><h6 className='plt-2'>1 to 4 hours</h6></Checkbox><br/>
              <Checkbox><h6 className='plt-2'>4 hours to 1 day</h6></Checkbox><br/>
            </ConfigProvider>
            </div>
            <div className='px-1 mb-5'>
            <h5 className='mt-4 mb-2 blue-txt'><b>Category</b></h5>
            <ConfigProvider theme={{token:{ colorPrimary:'#b8d233', padding:50, height:40, borderRadius:0, size:'large' }}}>
              <Checkbox checked={category=="Theme Parks"?true:false}  onChange={()=>adjustCategory("Theme Parks")}><h6 className='plt-2'>Theme Parks</h6></Checkbox><br/>
              <Checkbox checked={category=="City Tours"?true:false}   onChange={()=>adjustCategory("City Tours")}><h6 className='plt-2'>City Tours</h6></Checkbox><br/>
              <Checkbox checked={category=="Luxury Tours"?true:false} onChange={()=>adjustCategory("Luxury Tours")}><h6 className='plt-2'>Luxury Tours</h6></Checkbox><br/>
              <Checkbox checked={category=="Adventure"?true:false}    onChange={()=>adjustCategory("Adventure")}><h6 className='plt-2'>Adventure</h6></Checkbox><br/>
              <Checkbox checked={category=="Water Parks"?true:false}  onChange={()=>adjustCategory("Water Parks")}><h6 className='plt-2'>Water Parks</h6></Checkbox><br/>
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

export default React.memo(Search)