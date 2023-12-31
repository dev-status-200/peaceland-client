import React, { useEffect } from 'react';
import { Rate } from 'antd';
import { Row, Col } from 'react-bootstrap';
import Router from 'next/router';
import Link from 'next/link';
import { ConfigProvider, Input } from 'antd';
import Aos from 'aos';

const Tours = ({records, size, price, search, setSearch}) => {

    useEffect(() => {
        Aos.init({duration:300})
    }, [])

  return (
    <>
    {records.length>0 &&<>
        <Row data-aos='fade-up' className='search-bar pb-3 pt-5 mt-4'>
            <Col md={size.width>400?12:12} className='' data-aos='fade-up'>
                <div className='fs-30 wh-txt'>
                    <b>{records.filter((x)=>{
                        if(search==""){
                            return x
                        } else if (x.title.toLowerCase().includes(search.toLowerCase())){
                            return x
                        }
                        }).length} Activities Found
                    </b>
                </div>
            </Col>
            {size.width>400 && <Col md={12}></Col>}
            <Col md={12} className='' >
                <ConfigProvider
                    theme={{ token:{ colorPrimary: '#499b2f' } }}>
                    <Input onChange={(e)=> setSearch(e.target.value)} size='large' value={search} placeholder='Search any product' />
                </ConfigProvider>
            </Col>
        </Row>
        <Row>
            <hr className='p-0 mb-3 mt-3 mx-0'/>
            {
            records.filter((x)=>{
                return x.TourOptions[0].adult_price <= price
            }).filter((x)=>{
                if(search==""){
                    return x
                }else if(x.title.toLowerCase().includes(search.toLowerCase())){
                    return x
                }
            }).map((x, i)=>{
            return(
            <Col md={4} xs={6} className={`px-${size.width>400?"1":"0"} search-tour-box`} key={i} 
                onClick={()=>Router.push(`/product?id=${x.id}`)} 
            >
                <div className={`search-box-container mx-1`}>
                <img className='search-box-img filter-2' src={x.main_image} height={size.width>400?150:80} width={"100%"} />
                <div className='px-2 search-bob-bottom'>
                    {/* Mobile */}
                    <div className={`fw-500 fs-${size.width>400?"17":"12"} py-1`} style={size.width>400?{lineHeight:1.2}:{minHeight:44}}>
                        {size.width>400?
                        <>
                        <>{x.title}</>
                        </>:
                        <>{x.title}</>
                        }
                    </div>

                    <hr className={size.width>400?`px-5 mt-1 mb-0`:`py-0 my-0`} />
                    {/* <Rate disabled defaultValue={x.rating} allowHalf 
                        style={{color:'#f0a800', cursor:'pointer', fontSize:size.width>400?10:7}} 
                        className={`${size.width>400?"mx-2":""}`} 
                    />  */}
                    {/* {x.reviews==0?'':<span className='fs-14 grey-txt'>{"("} {x.reviews?x.reviews:"0"} <span style={{position:'relative', bottom:1}}>reviews</span> {")"}</span>}   */}

                    {/* Desktop */}
                    {size.width>400?
                    <div className='px-2 pb-3 pt-3'>
                    <div className='' style={{float:'left', fontWeight:700, fontSize:18, color:'#464646', paddingTop:20}}>
                        {parseFloat(x.TourOptions[0].adult_price).toFixed(2)} AED
                    </div>
                    <Link 
                        href={`/product?id=${x.id}`}
                        className='mt-3 search-box-btn px-3 py-2'
                        style={{float:'right', textDecoration:'none', color:'white', top:'100%'}}
                    >
                        <div>BOOK NOW</div>
                    </Link>
                    </div>:
                    <div>
                    <div style={{float:'left', fontWeight:700, fontSize:12}}>
                        {parseFloat(x.price).toFixed(2)} AED
                    </div>
                    <br/>
                    <div className='text-center'>
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
            )
            })}
        </Row>
        </>}
        {records.length==0 && 
        <div style={{color:'grey', border:'1px solid silver'}} className='p-5 mb-5'>
            <h3>No Similar Activity Found !</h3>
            <p>Try choosing different options</p>
        </div>
    }
    </>
  )
}

export default React.memo(Tours)
