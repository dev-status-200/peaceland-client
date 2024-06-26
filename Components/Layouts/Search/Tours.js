import React, { useEffect } from 'react';
import { ConfigProvider, Button, Input, Popover  } from 'antd';
import { Row, Col } from 'react-bootstrap';
import Router from 'next/router';
import Link from 'next/link';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import Aos from 'aos';

const Tours = ({records, size, price, search, setSearch, duration, Filter}) => {

  useEffect(() => {
    Aos.init({duration:300});
  }, [])

  return (
    <>
    {records.length>0 &&<>
      <Row data-aos='fade-up' className='pb-3 pt-3 mt-4'>
        <Col md={size.width>500?12:12} data-aos='fade-up'>
          <div className={`${size.width>500?'fs-25':'fs-25'} blue-txt`}>
            <b>{records.filter((x)=>{
                return x.TourOptions[0]?.adult_price <= price
              }).filter((x)=>{
              if(search==""){
                return x
              } else if (x.title.toLowerCase().includes(search.toLowerCase())){
                return x
              }
              }).length} Activities Found
            </b>
          </div>
        </Col>
        {size.width>500 && <Col md={12}></Col>}
        <Col md={12} className='search-bar' xs={10}>
          <ConfigProvider theme={{ token:{ colorPrimary: '#b8d233' } }}>
            <Input 
              prefix={<SearchOutlined style={{ color: 'green', fontSize:20, marginRight:10 }} />}
              onChange={(e)=> setSearch(e.target.value)} value={search} placeholder='Search Activities' 
            />
          </ConfigProvider>
        </Col>
        {size.width<500 &&
          <Col xs={2} className='px-0 mx-0'>
          <Popover 
            placement="topLeft" 
            title={"Filter Activities"} 
            content={
              <div style={{border:'1px solid #194e9e77'}}>
                <Filter/>
              </div>
            }
          >
            <Button>
              <FilterOutlined/>
            </Button>
          </Popover>  
          </Col>
        }
      </Row>
      <Row>
        <hr className='p-0 mb-3 mx-0'/>
        {records.filter((x)=>{
          return x.TourOptions[0]?.adult_price <= price
        }).filter((x)=>{
          if(search==""){
            return x
          } else if(x.title.toLowerCase().includes(search.toLowerCase())){
            return x
          }
        }).filter((x)=>{
          let temp = {};
          if(duration.uptoOne){
            temp = x.duration=='Upto 1 hour'?x:null
          }
          if(duration.oneToFour){
            temp = x.duration=='1 to 4 hours'?x:null
          }
          if(duration.fourToDat){
            temp = x.duration=='4 hours to 1 day'?x:null
          }
          return temp
        }).map((x, i)=>{
        return(
          <Col 
            md={4} xs={6} 
            key={i} 
            className={`px-${size.width>500?"1":"0"} search-tour-box`} 
            onClick={()=>Router.push(`/product/${x.slug}`)} 
          >
          <div className={`search-box-container mx-1`}>
            <img className='search-box-img filter-2' src={x.main_image} height={size.width>500?150:80} width={"100%"} />
            <div className='px-2 search-bob-bottom'>
              {/* Mobile */}
              <div className={`fw-500 fs-${size.width>500?"17":"12"} py-1`} style={{height:50}}>
                    {size.width>500?
                    <>
                        <>{x.title}</>
                    </>:
                        <>{x.title}</>
                    }
              </div>  
              <hr className={size.width>500?`px-5 mt-1 mb-0`:`py-0 my-0`} />
              {/* <Rate disabled defaultValue={x.rating} allowHalf 
                  style={{color:'#f0a800', cursor:'pointer', fontSize:size.width>500?10:7}} 
                  className={`${size.width>500?"mx-2":""}`} 
              />  */}
              {/* {x.reviews==0?'':<span className='fs-14 grey-txt'>{"("} {x.reviews?x.reviews:"0"} <span style={{position:'relative', bottom:1}}>reviews</span> {")"}</span>}   */}  
              {/* Desktop */}
              {size.width>500?
              <div className='px-2 pb-3 pt-3'>
                <div className='' style={{float:'left', fontWeight:700, fontSize:18, color:'#464646', paddingTop:20}}>
                    {parseFloat(x.TourOptions[0].adult_price).toFixed(2)} AED
                </div>
                <Link 
                    href={`/product/${x.slug}`}
                    className='mt-3 search-box-btn px-3 py-2'
                    style={{float:'right', textDecoration:'none', top:'100%'}}
                >
                    <b>BOOK NOW</b>
                </Link>
              </div>:
              <div>
                <div className='grey-txt-2 mt-1' style={{float:'left', fontWeight:700, fontSize:17}}>
                    {parseFloat(x.TourOptions[0].adult_price).toFixed(2)} AED
                </div>
                <br/>
                <div className='text-center' style={{marginTop:20}}>
                <div 
                    className='search-box-btn py-1' 
                    style={{textDecoration:'none', color:'white', paddingLeft:"22%", paddingRight:"22%"}}
                    //onClick={()=>router.push(`/product/${x.id}`)}
                >BOOK NOW</div>
                </div>
              </div>
              }
            </div>
          </div>
          </Col>
        )})}
      </Row>
      </>}
      {records.length==0 && 
      <div style={{color:'grey', border:'1px solid silver'}} className='p-5 mt-5 mb-5'>
        <h3>No Similar Activity Found !</h3>
        <p>Try choosing different options</p>
      </div>
    }
    </>
  )
}

export default React.memo(Tours)