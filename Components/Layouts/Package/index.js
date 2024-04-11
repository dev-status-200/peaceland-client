import { IoLocationSharp, IoPricetagsOutline } from "react-icons/io5";
import { Container, Row, Col } from 'react-bootstrap';
import useWindowSize from '/functions/useWindowSize';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../Shared/Loader';
import Router, { useRouter } from 'next/router'
import { Rate, Drawer } from 'antd';
import axios from 'axios';
import Aos from 'aos';
import dynamic from 'next/dynamic';
import { GiKnifeFork } from "react-icons/gi";
import { CiLocationOn } from "react-icons/ci";

const Details = dynamic(() => import('./Details'), { ssr:false });
const Book = dynamic(() => import('./Book'), { ssr:false });
const MoreDetail = dynamic(() => import('./MoreDetail'), { ssr:false });
const MobileBook = dynamic(() => import('./MobileBook'), { ssr:false });
const Images = dynamic(() => import('./Images'), { ssr:false });
const MoreImages = dynamic(() => import('./MoreImages'), { ssr:false });

const Product = ({id, tourData}) => {

  const conversion = useSelector((state) => state.currency.conversion);

  const [tour, setTour] = React.useState({
    TourOptions:[{adult_price:1.2}],
    destination:""
  });

  const [detail, setDetail] = React.useState({});
  const [open, setOpen] = useState(false);

  const [mainImage, setMainImage] = useState('');
  const [book, setBook] = useState(false);
  const [reviews, setReviws] = useState([]);
  const size = useWindowSize();
  
  useEffect(() => {
    Aos.init({duration:700});
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    id?fetchData(id):null;
  }, [id])
  
  const fetchData = async(id) => {
    let detailData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_DETAIL_BY_ID,{
      headers:{ "id": `${id}`, type:'package' }
    }).then((x)=>x.data.result);
    let tempData = {
      ...tourData.result,
      ...detailData,
      packageIncludes:JSON.parse(detailData.packageIncludes),
    }
    await setTour(tempData);
    // detailData? delete detailData.TourOptions:null
    setDetail(detailData);
    setBook(true);
    // axios.get(process.env.NEXT_PUBLIC_GET_REVIEWS,{
    //   headers:{'id':`${id}`}
    // }).then((x)=>{
    //     x.data?.result?.length>0?setReviws(x.data.result):null
    // })
  }
  
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const BookCompTwo = () => {
    return(
    <>
    {tour &&
      <Row>
        <Col md={12}>
          <span className='fw-400 fs-17 grey-txt'>Starting From:</span>

          <div className={`fw-600 ${size.width>500?"fs-25":"fs-35"}`}>
            <IoPricetagsOutline className="green-txt" />
            <span className="mx-3" >{(tour?.prevPrice*conversion.rate).toFixed(2)} {conversion.currency}</span>
          </div>
        </Col>
        <Col md={12} className={`${size.width>500?'mt-1':'text-center'}`}>
          <div className={`book-btn mt-3 ${size.width>500?'':'mt-0'}`} onClick={()=>setOpen(true)}>
            <span>ENQUIRE NOW</span>
          </div>
        </Col>
      </Row>
    }
    </>
  )};

  const createBooking = (data) => {
    axios.post(process.env.NEXT_PUBLIC_POST_CREATE_PACKAGE_BOOKING,{
      ...data
    }).then((x)=>{
      console.log(x.data)
    })
  }

  const Separator = () =>  <> {size.width<600 && <div className="separator-tour-icons"></div>} </>
  
  return (
  <>
  <div className='tour-styles' style={{backgroundColor:'white'}}>
    {size.width>500 && <hr className='my-1' />}
    {!book && <Loader/>}
    {book &&
    <div>
      <Container>
        <Row className={size.width>500?"mt-5":''}>
          <Col md={5} xs={{ order: 2 }} className="pt-2">
            <Details tour={tour} detail={detail} data-aos="fade-right" BookCompTwo={<BookCompTwo />} />
          </Col>
          <Col md={7} xs={{ order: 1 }} className='pt-4'>
            {size.width<500 && <>
              <div style={{lineHeight:1}} className={`fs-30 fw-700 blue-txt mb-2`}>{tour.title}</div>
              <span>
                <Rate disabled defaultValue={5} style={{fontSize:12, color:'orange'}} />
              </span>
              <span className ='mx-2 fs-12' style={{color:'grey'}}>
                {"("}3 Reviews{")"}
              </span> 
              <IoLocationSharp size={15} style={{position:'relative', bottom:2}}/> 
              <div className='grey-txt-2 my-2 flex'>
                <CiLocationOn size={16} />{" "}
                <span className='fs-12 mx-1'>Travel <b>{tour.packageTravel}</b> Days</span> 
                <span className='mx-2'>|</span>
                <span className='fs-12 mx-1'><b>{tour.packageCountry}</b> Country</span>
                <span className='mx-2'>|</span>
                <span className='fs-12 mx-1'><b>{tour.packageCity}</b> City</span>
              </div>
            </>}
            <div data-aos="fade-right">
              <Images mainImage={mainImage} setMainImage={setMainImage} tour={tour} detail={detail} size={size} />
            </div>
            {size.width>500 && 
              <div className={`images-container px-5 mt-4`}> <MoreImages setMainImage={setMainImage} tour={tour} detail={detail} data-aos="fade-right"/></div>
            }
            {size.width<500 && 
              <><MoreImages setMainImage={setMainImage} tour={tour} detail={detail} data-aos="fade-right"/><hr/><BookCompTwo /></>
            }
          </Col>
        </Row>
        <hr/>
      </Container>
      <div className='mb-5'>
        <MoreDetail  detail={detail} tour={tour} />
      </div>
      {(scrollPosition>650 ) &&
      <div className='fixed-book' style={size.width<500?{right:"70%"}:{}} data-aos="slide-up">
        <button type='button' onClick={()=>setOpen(true)} className='otherBook-btn'>
          <b>            
            <div className='my-0 pt-2'>ENQUIRE</div>
            <div className='my-0 pb-2'>NOW</div>
          </b>
        </button>
      </div>
      }
    </div>
    }
    {Object.keys(tour).length==0 && <div>Please wait...</div>}
  </div>
  <Drawer 
    style={size.width>500?{padding:'', margin:0, width:550, position:'relative', right:70}:{}}
    title={<h4 className="blue-txt pt-2">Complete below form</h4>}
    placement={"right"}
    onClose={()=>setOpen(false)}
    open={open}
    width={size.width<500?"100%":470}
  >
    {detail.advCategory=="Combo Tours" && <div className='combo-note'> In combo products all variation are included!</div>}
    {
      size.width<500?
      <MobileBook tour={tour} category={detail?.advCategory} setOpen={setOpen} createBooking={createBooking} />
      :
      <Book tour={tour} category={detail?.advCategory} setOpen={setOpen} createBooking={createBooking} />
    }
  </Drawer>
  </>
  )
}
export default React.memo(Product)