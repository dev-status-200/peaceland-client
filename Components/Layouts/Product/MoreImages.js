import React, { useEffect, useState } from 'react';
import useWindowSize from '/functions/useWindowSize';
import { Row, Col } from 'react-bootstrap';
import { Modal } from 'antd';

const MoreImages = ({setMainImage, tour, detail}) => {

  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);

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
        <Col key={i} md={"auto"} xs={"auto"} className={`${size.width<500?"p-0 px-1":"p-1"}`}>
          <img src={x} className='img-hover' onClick={()=>{setImage(x); setOpen(true);}}
            style={{width:'100%', borderRadius:size.width<500?10:9, height:size.width<500?50:70}} 
            alt="Tour"  
          />
        </Col>
      )})}
    </Row>
    }
    {size.width<500&& 
    <Row className="mt-3">
      {images.map((x, i)=>{
        return(
          <Col key={i} xs={2}>
            <img src={x}
              style={{width:60, height:40, borderRadius:10}} 
              alt="Tour"  
            />
          </Col>
        )})}
    </Row>}
    <Modal
      open={open}
      onCancel={()=>setOpen(false)}
      okButtonProps={{hidden:true}} cancelButtonProps={{hidden:true}}
      width={size.width<500?'100%':'75vw'}
      centered
      >   
      <div className='text-center bg-black m-2' style={{borderRadius:15}}>
        <img src={image} style={{height:size.width<500?'100%':'90vh'}} />
      </div>
    </Modal>
    </>
  )
}
export default React.memo(MoreImages)