import React from 'react';
import { TbPoint } from "react-icons/tb";
import { FiCheckSquare } from "react-icons/fi";
import { Row, Col, Container } from "react-bootstrap";
import useWindowSize from '/functions/useWindowSize';
import { Timeline } from 'antd';
import { FaRegCalendarCheck } from "react-icons/fa";

const MoreDetail = ({detail, tour}) => {

  const size = useWindowSize();

  return (
  <Container>
    <Row>
      <Col md={8} className=''>
        <Row>
          <h3 className='blue-txt'><b>Inclusions</b></h3>
          {tour?.packageIncludes?.potography==1?
            <Col md={'auto'} xs={'auto'} className='text-center'>
              <div className="package-include-icon">
              <img 
                height={30}
                src={'/package-icons/photo-camera-svgrepo-com.svg'} 
              />
              </div>
              <div>Photography</div>
            </Col>:
            <></>
          }
          {tour?.packageIncludes?.transport==1?
            <Col md={'auto'} xs={'auto'} className='text-center'>
              <div className="package-include-icon">
              <img 
                height={30}
                src={'/package-icons/travel-bus-svgrepo-com.svg'} 
              />
              </div>
              <div>Transport</div>
            </Col>:
            <></>
          }
          {tour?.packageIncludes?.food==1?
            <Col md={'auto'} xs={'auto'} className='text-center'>
              <div className="package-include-icon">
              <img 
                height={30}
                src={'/package-icons/food-dish-svgrepo-com.svg'} 
              />
              </div>
              <div>Photography</div>
            </Col>:
            <></>
          }
          {tour?.packageIncludes?.hotel==1?
            <Col md={'auto'} xs={'auto'} className='text-center'>
              <div className="package-include-icon">
              <img 
                height={30}
                src={'/package-icons/hotel-building-svgrepo-com.svg'} 
              />
              </div>
              <div>Photography</div>
            </Col>:
            <></>
          }
          {tour?.packageIncludes?.plane==1?
            <Col md={'auto'} xs={'auto'} className='text-center'>
              <div className="package-include-icon">
              <img 
                height={30} 
                src={'/package-icons/plane-svgrepo-com.svg'} 
              />
              </div>
              <div>Photography</div>
            </Col>:
            <></>
          }
        </Row>
        {detail?.travelDetail.length>10 && <>
          <hr/>
          <h3 className='blue-txt mb-4'><b>Itinerary</b></h3>
          <div className='px-2'>
            <Timeline items={detail?.travelDetail?.split("//").map((x)=>{
              return {
                children: <div className='my-4'>{x}</div>,
                dot: <FaRegCalendarCheck size={25} className='blue-txt' />
              }})}
            />
          </div>
        </>}
        {detail?.inclusions?.length>10 &&
        <>
          <hr className='mt-0 pt-0' />
          <div className=''>
          <h3 className='blue-txt'><b>Detailed Inclusions</b></h3>
          {detail.inclusions.split("//").map((x, i)=>{
            return(
              <Row key={i}>
                <Col style={{minWidth:30, maxWidth:30}}>
                  <FiCheckSquare 
                    size={15} 
                    className='mx-1 mt-2 blue-txt' 
                    style={{position:'relative', bottom:2}} 
                  />
                </Col>
                <Col className='my-1'>
                  <div className='fs-13 grey-txt'>
                    {x}
                  </div>
                </Col>
              </Row>
            )})}
          </div>
        </>
        }
        {detail?.exclusions?.length>10 &&
        <>
          <hr className='mt-0 pt-0' />
          <div className=''>
          <h3 className='blue-txt'><b>Exclusions</b></h3>
          {detail.exclusions.split("//").map((x, i)=>{
            return(
              <Row key={i}>
                <Col style={{minWidth:30, maxWidth:30}}>
                  <FiCheckSquare 
                    size={15} 
                    className='mx-1 mt-2 blue-txt' 
                    style={{position:'relative', bottom:2}} 
                  />
                </Col>
                <Col className='my-1'>
                  <div className='fs-13 grey-txt'>
                    {x}
                  </div>
                </Col>
              </Row>
            )})}
          </div>
        </>
        }
        {detail?.why_shoulds?.length>10 &&
        <>
          <hr/>
          <div>
            <h3 className=' blue-txt'><b>Why Should I go for This?</b></h3>
            {detail.why_shoulds.split("//").map((x, i)=>{
            return(
            <Row key={i}>
              <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1 blue-txt' size={20} /></Col>
              <Col className='my-1'><div className='fs-13 grey-txt'>{x}</div></Col>
            </Row>
            )})}
          </div>
        </>
        }
        {detail?.imp_infos?.length>10 &&
          <>
            <hr/>
            <div>
              <h3 className='blue-txt'><b>Important Information</b></h3>
              {detail.imp_infos.split("//").map((x, i)=>{
              return(
                <Row key={i}>
                <Col style={{minWidth:30, maxWidth:30}}>
                <TbPoint className='mx-1 mt-1 blue-txt' size={20} /></Col>
                <Col className='my-1'><div className='fs-13 grey-txt'>{x}</div></Col>
                </Row>
              )})}
            </div>
          </>
        }
      </Col>
      <Col className={`${size.width>500?'':'mt-4'}`}>
        <div className='policy-bar px-4'>
        <h3 className='my-3 wh-txt text-center'><b>Booking Policies</b></h3>
        {detail.policies.split("//").map((x, i)=>{
        return(
          <Row className='' key={i}>
            <Col className='text-center' style={{maxWidth:10, color:'white'}}><TbPoint/></Col>
            <Col><p className='fs-14 wh-txt'>{x}</p></Col>
          </Row>
        )})}
        </div>
        <div className='policy-bar px-4 mt-5'>
        <h3 className='my-3 wh-txt text-center'><b>Cancellation Policies</b></h3>
        {detail.cancellation_polices.split("//").map((x, i)=>{
          return(
            <Row className='' key={i}>
              <Col className='text-center' style={{maxWidth:10, color:'white'}}><TbPoint/></Col>
              <Col><p className='fs-14 wh-txt'>{x}</p></Col>
            </Row>
        )})}
        </div>
      </Col>
    </Row>
  </Container>
  )
}
export default React.memo(MoreDetail)