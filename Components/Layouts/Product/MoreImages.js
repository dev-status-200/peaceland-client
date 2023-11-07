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
    <div>
      <Row className={`${size.width<400?"px-2":"py-3"}`}>
        {images.map((x, i)=>{
          return(
            <Col key={i} md={3} xs={3} onClick={()=>setMainImage(x)} className={`${size.width<400?"p-0 px-1":"p-2"}`}>
              <img src={x} className='img-hover' 
                style={{width:'100%', borderRadius:size.width<400?10:9, height:size.width<400?50:100}} 
                alt="Tour"  
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
export default Images   