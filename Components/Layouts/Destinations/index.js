import { ConfigProvider, Slider, Checkbox } from 'antd';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import useWindowSize from '/functions/useWindowSize';
import React, { useEffect, useState } from 'react';
import SignUp from '/Components/Shared/SignUp';
import Tours from './Tours';
import aos from "aos";

const Package = ({tourData}) => {

  const size = useWindowSize();
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(true);
  const [records, setRecords] = useState([]);
  const tempDuration = {
    one:false,
    two:false,
    three:false,
    four:false,
    five:false,
    more:false,
  };
  const [duration, setDuration] = useState({...tempDuration});

  const checkBoxDown = {position:'relative', top:4}
  const [price, setPrice] = useState(3000);

  useEffect(() => {
    aos.init({duration:500});
    let tempData = tourData.result.map((x)=>{
      return { ...x, includes:JSON.parse(x.packageIncludes), hide:true }
    })
    setRecords(tempData);
    setLoad(false);
  }, [])

  const adjustDuration = (check, name) => {
    let temp = {...tempDuration};
    temp[name] = check.target.checked;
    setDuration(temp)
  }

  const Filter = () => {
    return(
      <Row className='tour-fltr-locate px-3 py-3 my-2'>
        <h5 className='mt-4 mb-0 blue-txt px-1'><b>Filter out Packages</b></h5>
        <hr className='mt-3' />
        <h5 className='mt-4 mb-0 blue-txt px-1'><b>Price</b></h5>
        <h6 className='mt-1 px-1 mx-2 pb-0 mb-0'>0 - {price}</h6>
        <div className='pr-3'>
          <ConfigProvider theme={{token:{ colorPrimary:'#b8d233', borderRadius:0 }}}>
            <Slider className='' defaultValue={price} max={3000} onChange={(e)=>setPrice(e)} />
          </ConfigProvider> 
        </div>
        <div className='px-1 mb-5'>
          <h5 className='mt-4 mb-2 blue-txt'><b>Travel Days</b></h5>
          <ConfigProvider
            theme={{ token:{ colorPrimary:'#b8d233', padding:50, height:40, borderRadius:50 }}}
          >
            <Checkbox checked={duration.one}  onChange={(e)=>adjustDuration(e,'one')}  ><h6 style={checkBoxDown}>1 Day</h6></Checkbox><br/>
            <Checkbox checked={duration.two}  onChange={(e)=>adjustDuration(e,'two')}  ><h6 style={checkBoxDown}>2 Days</h6></Checkbox><br/>
            <Checkbox checked={duration.three}onChange={(e)=>adjustDuration(e,'three')}><h6 style={checkBoxDown}>3 Days</h6></Checkbox><br/>
            <Checkbox checked={duration.four} onChange={(e)=>adjustDuration(e,'four')} ><h6 style={checkBoxDown}>4 Days</h6></Checkbox><br/>
            <Checkbox checked={duration.five} onChange={(e)=>adjustDuration(e,'five')} ><h6 style={checkBoxDown}>5 Days</h6></Checkbox><br/>
            <Checkbox checked={duration.more} onChange={(e)=>adjustDuration(e,'more')} ><h6 style={checkBoxDown}>More than 5</h6></Checkbox><br/>
          </ConfigProvider>
        </div>
      </Row>
    )
  }

return(
  <div className='home-styles'>
  <div className={` white-bg ${size.width>500?'pt-':''} `} data-aos="fade-in">
    <Container className={`${size.width>500?'pt-3':''}`}>
      <Row>
        <Col md={9} className={`${size.width>500?"px-5":"p-0 m-0 px-3"}`}>
          {!load &&
            <Tours
              search={search} 
              size={size} 
              setSearch={setSearch} 
              records={records}
              setRecords={setRecords}
              price={price}
              duration={duration}
              Filter={Filter}
            />
          }
          {load && <div className='text-center pb-3 mt-5'><Spinner variant='dark' className='mt-5' /></div>}
        </Col>
        {size.width>500 &&
        <Col md={3} className="pt-4 mb-5" style={{paddingRight:10}}>
          <Filter/>
        </Col>
        }
      </Row>
    </Container>
  </div>
  <SignUp mobile={size.width>500?false:true} />
  </div>
)}

export default React.memo(Package)