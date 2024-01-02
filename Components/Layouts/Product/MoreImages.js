import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { IoLocationSharp } from "react-icons/io5";
import { Rate } from 'antd';
import useWindowSize from '/functions/useWindowSize';

const Images = ({setMainImage, tour, detail}) => {

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
      {size.width>400 && 
      <Row className="py-3">
        {images.map((x, i)=>{
          return(
            <Col key={i} md={2} xs={2} onClick={()=>setMainImage(x)} className={`${size.width<400?"p-0 px-1":"p-2"}`}>
              <img src={x} className='img-hover' 
                style={{width:'100%', borderRadius:size.width<400?10:9, height:size.width<400?50:70}} 
                alt="Tour"  
              />
            </Col>
          )})}
      </Row>
      }
      {size.width<400&& 
      <div className="mobile-more-images">
        {images.map((x, i)=>{
          return(
            <div key={i} onClick={()=>setMainImage(x)} >
              <img src={x} className='img-hover' 
                style={{width:"100%", height:40, borderRadius:10}} 
                alt="Tour"  
              />
            </div>
          )})}
      </div>}
    </>
  )
}
export default Images