import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { IoLocationSharp } from "react-icons/io5";
import { Rate } from 'antd';
import useWindowSize from '/functions/useWindowSize';

const MoreImages = ({setMainImage, tour, detail}) => {

  const [images, setImages] = useState([]);

  const size = useWindowSize();

  useEffect(() => {
    if(detail){
      let tempImages = [...detail.more_images.split(",")];
      tempImages.unshift(tour.main_image)
      setImages(tempImages)
    }
    setMainImage(tour.main_image);

  }, [detail])
  
  return (
    <>
      {size.width>500 && 
      <Row className="py-3">
        {images.map((x, i)=>{
          return(
            <Col key={i} md={"auto"} xs={"auto"} onClick={()=>setMainImage(x)} className={`${size.width<500?"p-0 px-1":"p-1"}`}>
              <img src={x} className='img-hover' 
                style={{width:'100%', borderRadius:size.width<500?10:9, height:size.width<500?50:70}} 
                alt="Tour"  
              />
            </Col>
          )})}
      </Row>
      }
      {size.width<500&& 
      <Row className="">
        {images.map((x, i)=>{
          return(
            <Col md={"auto"} xs={"auto"} key={i} onClick={()=>setMainImage(x)} >
              <img src={x} className='img-hover' 
                style={{width:"100%", height:40, borderRadius:10}} 
                alt="Tour"  
              />
            </Col>
          )})}
      </Row>}
    </>
  )
}
export default React.memo(MoreImages)