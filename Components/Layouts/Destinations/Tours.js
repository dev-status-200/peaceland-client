import React, { useEffect } from 'react';
import { Input, Button, Popover } from 'antd';
import { Row, Col } from 'react-bootstrap';
import Router from 'next/router';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { CiLocationOn } from "react-icons/ci";
import Aos from 'aos';
import { IoChevronDownSharp, IoChevronUpSharp, IoPricetagsOutline } from "react-icons/io5";

const Tours = ({records, size, price, search, setSearch, setRecords, duration, Filter}) => {

  useEffect(() => {
    Aos.init({duration:300});
  }, [])

  const toggle = (index) => {
    let temp =  [...records];
    temp[index].hide = !temp[index].hide
    setRecords(temp);
  }

  const commas = (a) => a==0?'0':parseFloat(a).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");

  return (
  <>
    {records.length>0 &&
    <>
    <Row data-aos='fade-up' className=' pb-3 pt- mt-4'>
      <Col md={size.width>600?12:12} data-aos='fade-up'>
        <div className={`${size.width>600?'fs-30':'fs-25'} blue-txt`}>
          <b>{records.filter((x)=>{
            if(search==""){
              return x
            } else if (x.title.toLowerCase().includes(search.toLowerCase())){
              return x
            }
            }).length} Packages Found
          </b>
        </div>
      </Col>
      {size.width>600 && <Col md={12}></Col>}
      <Col md={12} xs={10}>
        <div className='search-bar'>
          <Input  
            value={search} 
            placeholder='Search any product' 
            onChange={(e)=> setSearch(e.target.value)} 
            prefix={<SearchOutlined style={{ color: 'green', fontSize:20, marginRight:10 }} />}
          />
        </div>
      </Col>
      {size.width<500 &&
          <Col xs={2} className='px-0 mx-0'>
          <Popover 
            placement="topLeft"
            content={
              <div style={{border:'1px solid #194e9e77'}}>
                <div className='px-3'>
                  <Filter/>
                </div>
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
    {size.width>600 &&
      <Row className='package-styles'>
        <hr className='p-0 mb-3 mt-1 mx-0'/>
        {records.filter((x)=>{
          return x.prevPrice <= price
          }).filter((x)=>{
            let temp = {};
            if(duration.one){
              temp = x.packageTravel=='1'?x:null
            }
            if(duration.two){
              temp = x.packageTravel=='2'?x:null
            }
            if(duration.three){
              temp = x.packageTravel=='3'?x:null
            }
            if(duration.four){
              temp = x.packageTravel=='4'?x:null
            }
            if(duration.five){
              temp = x.packageTravel=='5'?x:null
            }
            if(duration.more){
              temp = parseInt(x.packageTravel)>5?x:null
            }
            return temp
        }).filter((x)=>{
          if(search==""){
            return x
          } else if(x.title.toLowerCase().includes(search.toLowerCase())){
            return x
        }}).map((x, i)=>{
        return(
        <Col 
          md={4} xs={6} 
          className={`px-${size.width>600?"1":"0"} mb-4`} 
          style={{width:'100%'}} key={i} 
        >
          <div className={`package-box`}>
            <div className='package-info-top'>
            <div className='package-info'>
              <img src={x.main_image} height={150} width={200} className='package-img' />
              <div className='package-info-desc px-3'>
                <div>
                <div className='fs-30 fw-500'>{x.title}</div>
                <div className='flex'>
                  {x?.includes?.potography==1?
                  <div className='package-include-icon-2'>
                    <img src={'package-icons/photo-camera-svgrepo-com.svg'} height={20}  />
                  </div>:
                    <></>
                  }
                  {x?.includes?.transport==1?
                    <div className='package-include-icon-2'>
                      <img src={'package-icons/travel-bus-svgrepo-com.svg'} height={20} />
                    </div>
                    :
                    <></>
                  }
                  {x?.includes?.food==1?
                    <div className='package-include-icon-2'>
                      <img src={'package-icons/food-dish-svgrepo-com.svg'} height={20} />
                    </div>
                    :
                    <></>
                  }
                  {x?.includes?.hotel==1?
                    <div className='package-include-icon-2'>
                      <img src={'package-icons/hotel-building-svgrepo-com.svg'} height={20} />
                    </div>
                    :
                    <></>
                  }
                  {x?.includes?.plane==1?
                    <div className='package-include-icon-2'>
                      <img src={'package-icons/plane-svgrepo-com.svg'} height={20} />
                    </div>
                    :
                    <></>
                  }
                </div>
                </div>
                <div className='grey-txt-2'>
                  <CiLocationOn size={20} style={{position:'relative', bottom:2}} />{" "}
                  <span className='fs-14 mx-1'>Travel <b>{x.packageTravel}</b> Days</span> 
                  <span className='mx-2'>|</span>
                  <span className='fs-14 mx-1'><b>{x.packageCountry}</b> Country</span>
                  <span className='mx-2'>|</span>
                  <span className='fs-14 mx-1'><b>{x.packageCity}</b> City</span>
                  {x.hide && <IoChevronDownSharp className='mx-1 cur' onClick={()=>toggle(i)} />}
                  {!x.hide && <IoChevronUpSharp className='mx-1 cur' onClick={()=>toggle(i)} />}
                </div>
              </div>
            </div>
            <div>
            {!x.hide && 
              <div className='px-3 mb-2'>
                <hr className='mt-0 pt-0' />
                <h6>Description</h6>
                <div className='grey-txt-2'>{x.packageDescription}</div>
              </div>
              }
            </div>
            </div>
            <div className='package-pricing text-end'>
              <div>
                <IoPricetagsOutline size={25} className='grey-txt-2' />
                <div className='grey-txt-2'>Starts from</div>
                <div className='fw-700 fs-25' style={{lineHeight:1}}>{commas(x.prevPrice)} AED</div>
                <div className='grey-txt-2'>Per person pricing</div>
              </div>
              <button 
                className='package-btn'
                onClick={()=>Router.push(`/package/${x.slug}`)}
                // onClick={()=>Router.push(`/package?slug=${x.slug}`)}
              >
                View Details
              </button>
            </div>
          </div>
        </Col>
        )})}
      </Row>
    }
    {size.width<=600 &&
      <Row className='package-styles-sm p-2'>
        <hr className='p-0 mb-3  mx-0'/>
        {records.filter((x)=>{
            return x.prevPrice <= price
          }).filter((x)=>{
          if(search==""){
              return x
          } else if(x.title.toLowerCase().includes(search.toLowerCase())){
            return x
        }}).map((x, i)=>{
        return(
        <Col 
          md={4} xs={12} 
          className={`px-${size.width>600?"1":"0"}`} 
          style={{width:'100%'}} key={i} 
        >
          <div className={`package-box-sm`}>
            <div className='package-info-top'>
            <div className=''>
              <div className='p-3'>
              <img src={x.main_image} width={size.width-60} className='package-img' />
              </div>
              <div className='package-info-desc px-2' style={{ width:320}}>
                <div>
                  <h2>{x.title}</h2>
                  <>
                    {x.includes.potography==1?
                    <div className='package-include-icon mx-1'>
                      <img 
                        src={'/package-icons/photo-camera-svgrepo-com.svg'} 
                        height={30} 
                      />
                    </div>
                      :
                      <></>
                    }
                    {x.includes.transport==1?
                    <div className='package-include-icon mx-1'>
                      <img 
                        src={'/package-icons/travel-bus-svgrepo-com.svg'} 
                        height={30} 
                      />
                    </div>
                    :
                    <></>
                    }
                    {x.includes.food==1?
                    <div className='package-include-icon mx-1'>
                      <img 
                        src={'/package-icons/food-dish-svgrepo-com.svg'} 
                        height={30}
                      />
                    </div>
                      :
                      <></>
                    }
                    {x.includes.hotel==1?
                    <div className='package-include-icon mx-1'>
                      <img 
                        src={'/package-icons/hotel-building-svgrepo-com.svg'} 
                        height={30}
                      />
                    </div>
                      :
                      <></>
                    }
                    {x.includes.plane==1?
                    <div className='package-include-icon mx-1'>
                      <img 
                        src={'/package-icons/plane-svgrepo-com.svg'} 
                        height={30} 
                      />
                    </div>
                      :
                      <></>
                    }
                  </>
                </div>
                <div className='grey-txt-2 mt-3' style={{ width:320}}>
                  <CiLocationOn size={16} />{" "}
                  <span className='fs-12 mx-1'>Travel <b>{x.packageTravel}</b> Days</span> 
                  <span className='mx-2'>|</span>
                  <span className='fs-12 mx-1'><b>{x.packageCountry}</b> Country</span>
                  <span className='mx-2'>|</span>
                  <span className='fs-12 mx-1'><b>{x.packageCity}</b> City</span>
                  {x.hide && <IoChevronDownSharp className='mx-1 cur' onClick={()=>toggle(i)} />}
                  {!x.hide && <IoChevronUpSharp className='mx-1 cur' onClick={()=>toggle(i)} />}
                </div>
              </div>
            </div>
            <div>
            {!x.hide && 
              <div className='px-3 mb-2'>
                <hr className='mt-0 pt-0' />
                <h6>Description</h6>
                <div className='grey-txt-2'>{x.packageDescription}</div>
              </div>
              }
            </div>
            </div>
            <div className='package-pricing-sm'>
              <div>
                <IoPricetagsOutline size={25} className='grey-txt-2' />
                <div className='grey-txt-2'>Starts from</div>
                <div className='fw-700 fs-25' style={{lineHeight:1}}>{commas(x.prevPrice)} AED</div>
                <div className='grey-txt-2'>Per person pricing</div>
              </div>
              <button 
                className='package-btn'
                onClick={()=>Router.push(`/package/${x.slug}`)}
                // onClick={()=>Router.push(`/package?slug=${x.slug}`)}
              >
                View Details
              </button>
            </div>
          </div>
        </Col>
        )})}
      </Row>
    }
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