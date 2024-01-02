import React from 'react';
import { TbPoint } from "react-icons/tb";
import { FiCheckSquare } from "react-icons/fi";
import { Row, Col, Container } from "react-bootstrap";
import useWindowSize from '/functions/useWindowSize';

const MoreDetail = ({detail}) => {

  const size = useWindowSize();

  return (
  <Container>
    <Row>
    <Col md={8}>
    <div className=''>
    <h3 className='blue-txt'><b>Inclusions</b></h3>
    {detail.inclusions.split("//").map((x, i)=>{
        return(
        <Row key={i}>
            <Col style={{minWidth:30, maxWidth:30}}>
            <FiCheckSquare className='mx-1 mt-2 blue-txt' size={15} style={{position:'relative', bottom:2}} />
            </Col>
            <Col className='my-1'><div className='fs-13 grey-txt'>{x}</div></Col>
        </Row>
        )
    })}
    </div>
    <hr/>
    <div className=''>
        <h3 className=' blue-txt'><b>Why Should I go for This?</b></h3>
        {detail.why_shoulds.split("//").map((x, i)=>{
        return(
        <Row key={i}>
            <Col style={{minWidth:30, maxWidth:30}}><TbPoint className='mx-1 mt-1 blue-txt' size={20} /></Col>
            <Col className='my-1'><div className='fs-13 grey-txt'>{x}</div></Col>
        </Row>
        )
        })}
    </div>
    <hr/>
    <div className=''>
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
    </Col>
    <Col className={`${size.width>400?'':'mt-4'}`}>
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

export default MoreDetail