import { IoCalendarSharp,IoFlashSharp, IoLanguageOutline, IoLocationSharp } from "react-icons/io5";
import { Container, Row, Col } from 'react-bootstrap';
import useWindowSize from '/functions/useWindowSize';
import { RiExchangeFundsLine } from "react-icons/ri";
import React, { useEffect, useState } from 'react'; 
import { BiLocationPlus } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
import { AiFillTags } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { TbPoint } from "react-icons/tb";
import Loader from '../../Shared/Loader';
import Router, { useRouter } from 'next/router'
import MoreDetail from './MoreDetail';
import MobileBook from './MobileBook';
import MoreImages from './MoreImages';
import { Rate, Drawer } from 'antd';
import Details from './Details';
import Images from './Images';
import moment from 'moment';
import Book from './Book';
import axios from 'axios';
import Aos from 'aos';

const Product = ({id, tourData}) => {
  
  const router = useRouter();
  const cart = useSelector((state) => state.cart.value);
  const conversion = useSelector((state) => state.currency.conversion);

  const [tour, setTour] = React.useState({
    TourOptions:[{adult_price:1.2}],
    destination:""
  });

  const [detail, setDetail] = React.useState({});
  const [transport, setTransport] = React.useState([]);
  const [open, setOpen] = useState(false);

  const [cartIndex, setCartIndex] = useState(0);
  const [mainImage, setMainImage] = useState('');
  const [added, setAdded] = useState(false);
  const [book, setBook] = useState(false);
  const [reviews, setReviws] = useState([]);
  const size = useWindowSize();
  
  useEffect(() => {
    Aos.init({duration:700});
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll)
}, [])

  useEffect(() => {
    //let tempId = router.query.id;
    if(id){
      fetchData();
    }
  }, [router])

  const fetchData = async() => {
    // const tourData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ID,{
    //   headers:{ "id": `${id}` }
    // }).then((x)=>x.data.result)
    let detailData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_DETAIL_BY_ID,{
      headers:{ "id": `${id}` }
    }).then((x)=>x.data.result);
    let tempDetail = detailData;
    await setTour({...tourData.result, tour_detail:tempDetail.tour_detail, TourOptions:tempDetail?.TourOptions});
    tempDetail? delete tempDetail.TourOptions:null
    setDetail(tempDetail);
    let transportData = await axios.get(process.env.NEXT_PUBLIC_GET_TRANSPORT).then((x)=>x.data.result);
    //transportData.unshift({id:"1", name:"No", price:0.00})
    setTransport(transportData);
    setBook(true);
    axios.get(process.env.NEXT_PUBLIC_GET_REVIEWS,{
      headers:{'id':`${id}`}
    }).then((x)=>{
        x.data?.result?.length>0?setReviws(x.data.result):null
    })
  }

  useEffect(() => {
    cart.forEach((x, i)=>{
      if(x.tourId==tour.id){
        setAdded(true);
        setCartIndex(i)
      }
    })
  }, [cart, tour])
  
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const BookCompTwo = () => {
    return(
    <>
    {tour &&
    <>
    {!added &&
    <Row>
      <Col md={12}>
        <span className='fw-400 fs-18 grey-txt'>Starting From:</span>
        {tour.prevPrice &&
          <s className={`fw-400 mx-2 ${size.width>500?"fs-22":"fs-20"}`} style={{color:"#af302c"}}>
            {" "}{(tour.prevPrice*conversion.rate).toFixed(2)} {conversion.currency}{" "}
          </s>
        }
        <div className={`fw-600 ${size.width>500?"fs-30":"fs-35"}`}><AiFillTags/>
          {(tour?.TourOptions[0]?.adult_price*conversion.rate).toFixed(2)} {conversion.currency}
        </div>
      </Col>
      <Col md={12} className={`${size.width>500?'mt-1':'text-center'}`}>
        <div className={`book-btn ${size.width>500?'':'mt-0'}`} onClick={()=>setOpen(true)}>
          <span>BOOK NOW</span>
        </div>
      </Col>
    </Row>
    }
    {added &&
      <>
        <div className="green-btn p-2" onClick={()=>Router.push("/cart")}>Go To Cart {">"}</div>
      </>
    }
    </>
    }
    </>
  )}
  
  return (
  <>
  <div className='tour-styles' style={{backgroundColor:'white'}}>
    <hr className='my-1' />
    {!book && <Loader/>}
    {book &&
    <div>
      <Container>
        <Row className="mt-5 pt-2">
          <Col md={5} xs={{ order: 2 }} className="pt-2">
            <Details tour={tour} detail={detail} data-aos="fade-right" />
          </Col>
          <Col md={7} xs={{ order: 1 }} className='pt-4'>
            {size.width<500 && <>
              <div className={`fs-30 fw-700 blue-txt`}>{tour.title}</div>
              <span>
                <Rate disabled defaultValue={5} style={{fontSize:12, color:'orange'}} />
              </span>
              <span className ='mx-2 fs-12' style={{color:'grey'}}>
                {"("}3 Reviews{")"}
              </span> 
              <IoLocationSharp size={15} style={{position:'relative', bottom:2}}/> 
              {" "}{tour.destination?.toUpperCase()}, {tour.city}
            </>}
            <Images mainImage={mainImage} setMainImage={setMainImage} tour={tour} detail={detail} data-aos="fade-right" />

            {size.width<500 && <>
            <hr/>
            <BookCompTwo />
            </>
            }
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <div className={`images-container ${size.width>500?'px-5 mt-4':''}`}>
              <MoreImages setMainImage={setMainImage} tour={tour} detail={detail} data-aos="fade-right"/>
            </div>
          </Col>
          <Col>
          {size.width>500 &&<BookCompTwo />}
          </Col>
        </Row>
        <hr/>
        <Row className='info-bar'>
          <Col md={2} className='text-center info-item'>
            <IoCalendarSharp className='info-icon' />
            <div className='mt-2'>Availability<br/>{tour.availability}</div>
          </Col>
          <Col md={2} className='text-center info-item'>
            <GiSandsOfTime className='info-icon' />
            <div className='mt-2'>Duration<br/>{tour.duration}</div>
          </Col>
            <Col md={2} className='text-center info-item'>
              <IoLanguageOutline className='info-icon' color='white' />
              <div className='mt-2'>Languages<br/>{tour.lang}</div>
            </Col>
            <Col md={2} className='text-center info-item'>
              <BiLocationPlus className='info-icon' color='white' />
              <div className='mt-2'>Reporting Point<br/>{tour.reporting}</div>
            </Col>
            <Col md={2} className='text-center info-item'>
              <RiExchangeFundsLine className='info-icon' color='white' />
              <div className='mt-2'>Refund<br/>{tour.refund}</div>
            </Col>
            <Col md={2} className='text-center info-item'>
              <IoFlashSharp className='info-icon' color='white' />
              <div className='mt-2'>Confirmation<br/>{tour.confirmation}</div>
            </Col>
        </Row>
      </Container>
      <div className='my-5'>
        <MoreDetail  detail={detail} />
      </div>

      {/* <Container  className='py-5 px-3' style={{backgroundColor:'white'}}>
        <h4 style={{color:'silver'}}>Reviews</h4>
        <hr className='my-0' />
        {reviews.length==0 && <div className='mt-3' style={{color:'grey'}}>No Review yet</div>}
        {reviews.length>0 && 
        <div className='mt-3'>
          {reviews.map((x, i)=>{
          return(
          <Row key={i}>
              <Col md={1}>
                  <img src={x['BookedToursOptions.BookedTour.Customer.image']} height={50} width={50} style={{borderRadius:'100%'}} alt="Tour"/>
              </Col>
              <Col md={11} style={{backgroundColor:'white'}}>
                  <div style={{fontSize:16, display:'inline-block'}}>{x['BookedToursOptions.BookedTour.Customer.name']}</div>
                  <div className='mx-5' style={{fontSize:13, color:'silver', display:'inline-block'}}>{moment(x['BookedToursOptions.BookedTour.createdAt']).fromNow()}</div>
                  <br/><Rate allowHalf disabled defaultValue={parseFloat(x['BookedToursOptions.rating'])} />
              </Col>
              <Col md={12} style={{color:'grey'}} className='mt-3'>
                  {x['BookedToursOptions.review']}
                  <hr/>
              </Col>
          </Row>
          )})}
        </div>
        }
      </Container> */}
      {(scrollPosition>650 && !added ) &&
      <div className='fixed-book' style={size.width<500?{right:"70%"}:{}} data-aos="slide-up">
        <button type='button'  onClick={()=>setOpen(true)} className='otherBook-btn'>
          <b>            
            <div className='my-0 py-0'>BOOK</div>
            <div className='my-0 py-0'>NOW</div>
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
    title={`${tour.title} Options`}
    placement={"right"}
    onClose={()=>setOpen(false)}
    open={open}
    width={size.width<500?"100%":470}
  >
    {
      size.width<500?
      <MobileBook tour={tour} transport={transport} category={detail?.advCategory} setOpen={setOpen} />
      :
      <Book tour={tour} transport={transport} category={detail?.advCategory} setOpen={setOpen} />
    }
  </Drawer>
  </>
  )
}
export default Product