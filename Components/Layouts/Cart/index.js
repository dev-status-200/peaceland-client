import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '/functions/cartFunction';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { CloseCircleOutlined, ExclamationCircleFilled, CheckCircleOutlined } from '@ant-design/icons';
import { addProduct } from '/redux/cart/cartSlice';
import { Modal, Empty, Input, ConfigProvider } from 'antd';
import useWindowSize from '/functions/useWindowSize';
import { IoTrashBinSharp } from "react-icons/io5";
import { useRouter } from 'next/router';
import Router from 'next/router';
import PayComp from './PayComp';
import Cookies from 'js-cookie';
import axios from 'axios';
import Aos from 'aos';

const Cart = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const conversion = useSelector((state) => state.currency.conversion);
  const router = useRouter();
  const [promoInfo, setPromoInfo] = useState({price:0, byPercentage:false, name:""});
  const [price, setPrice] = useState(0.0);
  const [promo, setPromo] = useState("");
  const [user, setUser] = useState({});
  const [discountPrice, setDiscountPrice] = useState(0);
  const [load, setLoad] = useState(false);
  const [transportList, setTransportList] = useState([]);
  const size = useWindowSize();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(()=> { 
    Aos.init({duration:500});
    setPrice(parseFloat(getTotalPrice(cart)).toFixed(2));
  }, [cart]);

  useEffect(()=> {
    getValues();
  }, []);

  async function getValues(){
    let token = await Cookies.get("token");
    await token?setUser({...(JSON.parse(token)), loggedIn:true}):null;

    axios.get(process.env.NEXT_PUBLIC_GET_TRANSPORT)
    .then((x)=>{
      setTransportList(x.data.result)
    })
  }

  const getTotalPrice = (val) => {
    let discount = Cookies.get("promoDiscount");
    let removingPrice = 0;
    let p = 0.0;
    val.forEach((x)=>{
      x.options.forEach((y)=>{
        p = p + y.price;
      })
    })
    if(discount){ 
      discount = JSON.parse(discount);
      setPromoInfo(discount)
      if(discount.byPercentage){ removingPrice = discount.price*(p/100) }
      else if(!discount.byPercentage){ removingPrice = discount.price }
    }
    setDiscountPrice(removingPrice)
    let retrnValue = p-removingPrice;
    return retrnValue;
  }

  const showIndivPrice = (val) => {
    let result = 0;
    val.forEach((x)=>{
      result = result + x.price;
    })
    return result.toFixed(2)
  }

  const showConfirm = (x) => {
    Modal.confirm({
      title: 'Do you want to remove this item from cart?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        let tempState = [...cart];
        tempState = tempState.filter((j)=>{
          return j.tourId!=x.tourId
        })
        removeFromCart(x.tourId)
        if(cart.length==1){
          Cookies.remove("promoDiscount")
        }
        dispatch(addProduct(tempState));
        Router.push("/cart")
      },
      onCancel() { },
    });
  };

  const ApplyPromo = async(e) => {
    e.preventDefault();
    setLoad(true);

    await delay(2000)
    await axios.post(process.env.NEXT_PUBLIC_VERIFY_PROMO,{
      code:promo
    }).then((x)=>{
      setLoad(false);
      let minimum = parseFloat(x.data.result.minimum)<parseFloat(price)
      if(x.data.result==null){
        Modal.warning({ title: 'Error', content: "Promo code dosen't exists or has been disabled!" });
      } else if(minimum==false){
        Modal.warning({ title: 'Error', content: "Please add more items to your cart to utilize this offer" });
      } else if(x.data.result.stock==0 && minimum){
        Modal.warning({ title: 'Error', content: "Oops, this code cannot be used anymore!" });
      } else if(x.data.result.stock>0 && minimum){
        Modal.success({ title:'Success', content:(
          <div>
            <p>Congratulations! You've recieved a discount of <br/>
              <strong>{x.data.result.amount} {x.data.result.byPercentage=="1"?"%":"AED"}</strong>!
            </p>
          </div>
          ),
          onOk(){
            Cookies.set("promoDiscount", 
              JSON.stringify(({
                price:parseFloat(x.data.result.amount), 
                byPercentage:x.data.result.byPercentage=="0"?false:true, 
                name:x.data.result.code, 
                id:x.data.result.id
              }))
            )
            setPromoInfo({price:parseFloat(x.data.result.amount), byPercentage:x.data.result.byPercentage=="0"?false:true, name:x.data.result.code})
            Router.push("/cart")
          }, 
        });
      }
    })
  };

  const getTransportName = (id) => {
    let name = "";
    transportList && transportList.map((x)=>{
      if(x.id==id){
        name = x.name
      }
    });
    return name
  };

  const removePromo = () => {
    Cookies.remove("promoDiscount");
    Router.reload("/cart")
  };

  return (
  <div className='tour-styles' style={{backgroundColor:'white'}} >
    <div className='cart-styles' style={{borderTop:'1px solid silver'}} >
    <Container className='cart-box mt-' fluid="true" >
    <Row>
      <Col md={8} className="pt-4 cart-left">
        <Container className='px-5 black-txt'>
          <div className='fs-30 fw-500 black-txt my-2'>Your Cart</div>
          <p className='m-0 p-0'>{cart.length} Item Added</p>
          {cart.length>0 &&
          <>
            {cart.map((x, i)=>{
            return(
              <Row key={i} className="cart-item mx-0 mb-3">
                <Col md={'auto'} className="py-3" xs={12}>
                  <img src={x.image} height={100} width={size.width>500? 150:"100%"} style={{borderRadius:5, marginLeft:size.width>500?15:0}} alt="Tour"/>
                </Col>
                <Col className={`${size.width>500?"px-4 my-3":"mb-2"}`} >
                {size.width>500 &&<div style={{float:'right'}}>
                  <span className='fs-18 fw-500 grey-txt'>{conversion.currency} {showIndivPrice(x.options)}</span>
                  <CloseCircleOutlined className='close-cart-btn' 
                    onClick={()=>showConfirm(x)}
                  />
                  <br/>
                </div>}
                <div className='fw-500 cart-item-name' style={size.width<500?{fontSize:"15px"}:{fontSize:"25px"}}>{x.name}</div>
                {x.options.map((y, j)=>{
                return(
                  <div key={j+i} className='fs-13 silver-2-txt'>
                    <hr className='my-1' />
                    <div className=''>
                      Option: {y.name} {"("}{`${y.adult} Adult`}{y.child>0?`, ${y.child} Child`:""} {y.infant>0?`, Infant ${y.infant}`:""}{" )"}
                    </div>
                    <div>Transfer Type: {getTransportName(y.transfer)}</div>
                    <div>{y.transfer!="No"?`Pickup Location: ${y.address} `:""}</div>
                  </div>
                )})}
                {size.width<500 &&
                <>
                  <hr/>
                  <span className='fs-18 fw-500 grey-txt px-1'>
                    {conversion.currency} {showIndivPrice(x.options)}
                  </span>
                  <span className='px-1' style={{float:'right', color:'crimson'}} onClick={()=>showConfirm(x)}>
                  <IoTrashBinSharp size={20} />
                  </span>
                </>
                }
                </Col>
              </Row>
            )})}
            <div className='mt-2' style={{color:'grey'}}>
            Note: After checkout, your ticket will be provided under 24 hours
            </div>
            <hr className='mt-1' />
            <div style={{minHeight:90}}>
              <div className='my-1 mb-5'>
                <form onSubmit={ApplyPromo} className='mb-5'>
                <Row>
                  <Col md={4} xs={12} className='' >
                  <ConfigProvider theme={{ token: { colorPrimary:'#ebf13c', borderRadius:3}}}>
                    <Input className='' placeholder="Enter Promo" required 
                      value={promo} onChange={(e)=>setPromo(e.target.value)} 
                    />
                    </ConfigProvider>
                  </Col>
                  <Col md={2} xs={12}>
                    <button className={`btn-custom-2 ${size.width>500?"mx-1":"mt-3"}`} 
                      style={{width:"100%"}}
                      type="submit" disabled={load?true:false}
                    >{load?<Spinner size='sm' className='mx-3' />:"Apply"}
                    </button>
                  </Col>
                </Row>
                </form>
                {discountPrice>0 && 
                  <Row className='promo-section'>
                  <Col md={6} xs={6} style={{fontWeight:400}} className='pt-3'>Promo Code: </Col>
                  {size.width>600 && <Col md={3}></Col>}
                  <Col md={3} xs={6} className='text-end '>
                    <div className='fs-18 fw-600'>
                      <span>
                        {promoInfo.name}
                      </span>
                      <CheckCircleOutlined style={{color:'green', marginLeft:10, fontSize:20}} />
                    </div>
                    <div className='remove-promo mt-1' onClick={removePromo}>
                      <CloseCircleOutlined className='mx-1 fs-12 curr' />
                      <span>Remove Promo</span>
                    </div>
                  </Col>
                </Row>
                }
                {discountPrice>0 && <hr className='mt-2' />}
                <h6>
                <Row className='mt-2'>
                  <Col md={6} xs={6} style={{fontWeight:400}}>Total Discount: </Col>
                  <Col md={6} xs={6} className='text-end' style={{color:'#dd9613'}}>
                    {(discountPrice*conversion.rate).toFixed(2)} {conversion.currency}
                    {/* <s> {(discountPrice*conversion.rate).toFixed(2)}</s> {conversion.currency} */}
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col md={6} xs={6} style={{fontWeight:400}}>Sub Total: </Col>
                  <Col md={6} xs={6} className='text-end' style={{fontWeight:400, color:"grey"}}>
                    {(parseFloat(price*conversion.rate) + parseFloat(discountPrice*conversion.rate)).toFixed(2)}
                    <span> {conversion.currency} </span>
                  </Col>
                </Row>
                <hr/>
                <Row className='mt-3'>
                  <Col md={6} xs={6} style={{fontWeight:300}}><b>Grand Total</b> </Col>
                  <Col md={6} xs={6} className='text-end'>
                    <div className='text-end'>
                      <b>{(price*conversion.rate).toFixed(2)} {conversion.currency}</b>
                    </div>
                  </Col>
                </Row>
                </h6>
              </div>
            </div>
          </>
          }
          {cart.length==0 && 
          <div style={{border:'1px solid silver', margin:10, marginBottom:30}}>
            <Container className='py-5' data-aos='fade-up'>
              <Empty /> <h5 className='text-center fw-200 mt-5'>Cart Is Empty!</h5>
            </Container>
          </div>
          }
        </Container>
      </Col>
      <Col md={4} className={`pay-screen ${size.width<500?"p-3":"p-5"}`} style={size.width<500?{borderLeftColor:"white"}:{}}> 
        {cart.length>0 && <>  
          {user.email &&<>{price>0 &&<PayComp price={price} email={user.email} name={user.name} image={user.picture}/>}</>}
          {!user.email &&
          <div className='text-center'>
            <div className={`${size.width>500?"cart-logged-in-warning":"fs-18"}`}>Sign-in is required to continue Checkout!</div>
            <Row className='mt-4'>
              <Col></Col>
              <Col xs={6}>
                <div className='btn-custom-2' 
                  onClick={()=>{
                    // This Logic sets the redirected URL to get back to this page
                    if(Object.keys(router.query).length>0){ 
                      Cookies.set("redirect",`${router.pathname}?id=${router.query.id}`)  
                    }
                    else { 
                      Cookies.set("redirect",`${router.pathname}`) 
                    }
                    router.push("/auth")
                  }}>Sign In</div>
              </Col>
              <Col></Col>
            </Row>
          </div>}
        </>}
        {cart.length==0 &&<div className='cart-logged-in-warning fs-13'>Fill up cart to continue Checkout!</div>}
      </Col>
    </Row>
    </Container>
    </div>
  </div>
  )
}

export default React.memo(Cart)