import React from 'react';
import { FiCheckSquare } from "react-icons/fi";
import { Row, Col, Container } from "react-bootstrap";
import { TbPoint } from "react-icons/tb";

const MoreDetail = ({detail}) => {
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
    <Col>
    <div className='policy-bar px-4'>
    <h3 className='my-3 wh-txt text-center'><b>Booking Policies</b></h3>
      {detail.policies.split("//").map((x, i)=>{
        return(
            <Row className=''>
                <Col className='text-center' style={{maxWidth:10, color:'white'}}><TbPoint/></Col>
                <Col><p className='fs-14 wh-txt' key={i}>{x}</p></Col>
            </Row>
        )})}
    </div>
    <div className='policy-bar px-4 mt-5'>
    <h3 className='my-3 wh-txt text-center'><b>Cancellation Policies</b></h3>
      {detail.cancellation_polices.split("//").map((x, i)=>{
        return(
            <Row className=''>
                <Col className='text-center' style={{maxWidth:10, color:'white'}}><TbPoint/></Col>
                <Col><p className='fs-14 wh-txt' key={i}>{x}</p></Col>
            </Row>
        )})}
    </div>
    </Col>
    </Row>
  </Container>
  )
}

export default MoreDetail