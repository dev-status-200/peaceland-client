import React, { useEffect, useState, useReducer } from 'react'
import { Select, Checkbox, Input, message, notification } from 'antd';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '/redux/cart/cartSlice';
import aos from "aos";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { saveCart } from '/functions/cartFunction';
import IncDec from './IncDec';
import codes from "/JSONData/codes.json"
import { initialState, reducerFunctions, setTour, validateName, validateDate, setDate } from './states';
import GooglePlaceSearch from './GooglePlaceSearch';
import { FaClockRotateLeft } from "react-icons/fa6";

const MobileBook = ({ tour, transport, category, setOpen }) => {

  const dispatch = useDispatch();
  const [api, contextNotifyHolder] = notification.useNotification();
  const [messageApi, contextHolder] = message.useMessage();
  const Context = React.createContext({
    name: 'Default',
  });

  const cart = useSelector((state) => state.cart.value);
  const conversion = useSelector((state) => state.currency.conversion);
  const [state, dispatchReducer] = useReducer(reducerFunctions, initialState);
  const [load, setLoad] = useState(false);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    aos.init({ duration: 300 })
    setTour(tour, dispatchReducer, category);
    openNotification('bottom')
  }, [])

  const showMessage = (msg) => messageApi.info(msg);

  const addToCart = async () => {
    let notValidAddress = false
    state.booking.forEach((x) => {
      if (x.check && x.transfer != "1" && x.address == "") {
        notValidAddress = true
      }
    })
    if (notValidAddress) {
      showMessage("Please Select Pick Up Location!");
      return
    }
    if (!validateDate(state.booking)) {
      showMessage("Please Select A Valid Date Please!");
      return
    }
    if (!validateName(state.name.length)) {
      showMessage("Enter A Valid Full Name !");
      return
    }
    setLoad(true);
    await delay(500);
    let cartValues = {
      tourId: tour.id, image: tour.main_image, name: tour.title,
      customerTitle: state.title, customerName: state.name, customerContact: state.contact, customerEmail: state.email,
      options: []
    }
    state.booking.forEach((x, i) => {
      if (x.check) { cartValues.options.push({ ...x, date: x.date.toString() }) }
    })
    cartValues.options.forEach((x, i) => {
      delete cartValues.options[i].dates;
      delete cartValues.options[i].timeSlots;
    })
    saveCart(cartValues);
    let temp = [...cart];
    temp.push(cartValues);
    dispatch(addProduct(temp));
    dispatchReducer({ type: 'close' })
    showMessage("Successfully Added To Cart!");
    setLoad(false);
    setOpen(false)
    //console.log(cartValues);
  }

  const oneSelected = () => {
    let result = false;
    state.booking.forEach((x) => {
      if (x.check) {
        result = true;
      }
    })
    return result
  }

  const openNotification = (placement) => {
    api.info({
      message: `Booking Method`,
      description: <Context.Consumer>{({ name }) => (
        <p className='fs-15'>Select options in the above panel to book your ticket!</p>
      )}</Context.Consumer>,
      placement,
      duration: 4
    });
  };

  const checkAvailability = () => {
    let tempAvailability = true
    state.booking.forEach((x) => {
      if (x.available == false) {
        tempAvailability = false
      }
    })
    return !tempAvailability
  }

  return (
    <>
    {contextHolder}
    {contextNotifyHolder}
    <div>
      {!load && <>
      {state.booking.map((x, i) => {
      return (
        <div className='tour-opt mb-2 prevent-select' key={i}>
          <Row style={{ color: x.check ? "black" : "silver" }}>
            <Col xs={1}
              onClick={() => {
                if (category != "Combo Tours") {
                  let temp = [...state.booking];
                  temp[i].check = !temp[i].check
                  dispatchReducer({ type: 'field', fieldName: 'booking', payload: temp });
                }
              }}
            >
              <Checkbox className='' disabled={category == "Combo Tours" ? true : false} checked={x.check} />
            </Col>
            <Col xs={10} className='cur' onClick={() => {
              if (category != "Combo Tours") {
                let temp = [...state.booking];
                temp[i].check = !temp[i].check
                dispatchReducer({ type: 'field', fieldName: 'booking', payload: temp });
              }
            }}>
              <h6 className='black-txt'>{x.name}</h6>
            </Col>
            {/* <Col xs={1}></Col> */}
            <Col xs={12} className='cur'
              onClick={() => {
                if (category != "Combo Tours") {
                  let temp = [...state.booking];
                  temp[i].check = !temp[i].check
                  dispatchReducer({ type: 'field', fieldName: 'booking', payload: temp });
                }
              }}>
              <div className='mx-3 text-end'>
                {(x.oldPrice && parseFloat(x.oldPrice) > 0) && <>
                  <span className='red-txt'><s> {" "}{parseFloat(x.oldPrice).toFixed(2)} AED{" "}</s></span>
                </>}
                <div style={{ color: x.check ? "#075ca2" : "grey" }} className='fs-16 '>
                  {x.price.toFixed(2)} AED
                </div>
              </div>
            </Col>
            {x.check &&
              <>
                <Col xs={12}><hr className='mt-1' /></Col>
                <Col xs={6}>
                  <IncDec type={"adult"} count={x.adult} index={i} state={state} dispatchReducer={dispatchReducer} />
                </Col>
                <Col xs={6}>
                  <IncDec type={"child"} count={x.child} index={i} state={state} dispatchReducer={dispatchReducer} />
                </Col>
                <Col xs={6} className='mt-3'>
                  <IncDec type={"infant"} count={x.infant} index={i} state={state} dispatchReducer={dispatchReducer} />
                </Col>
                <Col xs={12}></Col>
                <Col className='mt-3' xs={5} style={{ marginLeft: 4 }}>
                  <div style={{ marginRight: 4 }}>Transfer: </div>
                  <Select defaultValue="Yes" value={x.transfer} style={{ width: "100%" }}
                    onChange={(e) => {
                      let temp = [...state.booking];
                      temp[i].transfer = e;
                      let tempAddress = "";
                      if (e != "1") {
                        transport.forEach((y) => {
                          if (y.id == e) {
                            if (e == "845610848208257025") {
                              temp[i].transportPrice = x.transport ? 0.00 : parseFloat(y.price);
                            } else {
                              temp[i].transportPrice = parseFloat(y.price)
                            }
                          }
                        })
                        tempAddress = "";
                      } else {
                        tempAddress = "none"
                        temp[i].transportPrice = 0.00;
                      }
                      temp[i].price = temp[i].adult * temp[i].adult_price + temp[i].child * temp[i].child_price + temp[i].transportPrice;
                      dispatchReducer({ type: 'set', payload: { booking: temp, address: tempAddress } });
                    }}
                    options={[{ value: "1", label: "No", disabled: x.transport }, ...transport.filter((y) => { if (y.status == "1") { return x } }).map((y) => { return { value: y.id, label: y.name } })]}
                  />
                </Col>
                <Col className='mt-3 p-0' xs={6} style={{ position: 'relative', left: 20 }}>
                  <div className=''>Date:</div>
                  <DatePicker
                    style={{ position: 'relative', top: 1 }}
                    selected={x.date}
                    onChange={(date) => {
                      let temp = [...state.booking];
                      let tempResult = setDate(temp, i, date, tour)
                      dispatchReducer({ type: 'field', fieldName: 'booking', payload: temp });
                    }}
                    minDate={new Date()}
                    includeDates={x.dated ? x.dates : false}
                    dateFormat="yyyy - MMM - dd"
                  />
                </Col>
                {x.transport == true && <Col md={12} className='px-3 mt-1' style={{ color: 'silver' }}> {"("}Shared Transfer is included in ticket{")"} </Col>}
                {x.timed && <Col md={12} className='mt-2 mx-1' >
                  <div>Time Slots</div>
                  {
                    x.timeSlots.map((z, j) => {
                      return (
                        <div key={j} className={`time-box ${x.timeSlot == z.slot ? 'selected-time-box' : ''}`} onClick={() => {
                          let temp = [...state.booking];
                          temp[i].timeSlot = z.slot;
                          dispatchReducer({ type: 'field', fieldName: 'booking', payload: temp });
                        }}>
                          {z.slot}
                        </div>
                      )
                    })
                  }
                </Col>}
                {/* {x.transfer!="1" && <Col md={12}><hr className='my-2' /></Col> } */}
                {x.transfer != "1" &&
                  <Col md={12} className="mt-3 px-3 mb-">
                    <GooglePlaceSearch dispatchReducer={dispatchReducer} state={state} index={i} />
                  </Col>
                }
              </>
            }
            {(x.detail != null && x.detail.length > 10) &&
              <Col md={11} className={`mb-2 ${x.check ? 'mt-3' : ''} px-3`}>
                <span className='show-opt-detail'
                  onClick={() => {
                    let temp = [...state.booking];
                    temp[i].show = !temp[i].show
                    dispatchReducer({ type: 'field', fieldName: 'booking', payload: temp });
                  }}
                >
                  Tap to show Detail
                </span>
                {x.show && <div>
                  <hr className='mb-2 mt-0' />
                  {(x.detail != null && x.detail.length > 10) && <div style={{ whiteSpace: 'pre-wrap' }}>{x.detail}</div>}
                </div>
                }
              </Col>
            }
            {(x.detail == null || x?.detail?.length < 10) && <div className='pb-3'></div>}
          </Row>
        </div>
      )})}
      <Row className="px-1">
        <Col md={12} className='my-2 fs-16'><b>Lead Passenger Details</b></Col>
        <Col xs={4}>
          <Select style={{ width: "100%" }} value={state.title}
            onChange={(e) => dispatchReducer({ type: 'field', fieldName: 'title', payload: e })}
            options={[{ value: "Mr.", label: "Mr." }, { value: "Ms.", label: "Ms." }, { value: "Mrs.", label: "Mrs." }]}
          />
        </Col>
        <Col xs={8}>
          <Input placeholder='Full Name' value={state.name}
            onChange={(e) => dispatchReducer({ type: 'field', fieldName: 'name', payload: e.target.value })}
          />
        </Col>
        <Col xs={12} className='mt-3'>
          <Select defaultValue="Select Country"
            style={{ width: "100%" }}
            onChange={(e) => {
              let tempContact = ""
              codes.forEach((x) => {
                if (x.value == e) {
                  tempContact = x.code + " "
                  //dispatchReducer({ type: 'field', fieldName:'contact', payload: x.code+" " });
                  return
                }
              })
              dispatchReducer({ type: 'set', payload: { code: e, contact: tempContact } })
            }}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              ((option?.value) ?? '').toLowerCase().includes(input.toLowerCase()) ||
              ((option?.label) ?? '').toLowerCase().includes(input.toLowerCase()) ||
              ((option?.code) ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={codes}
          />
        </Col>
        <Col xs={2} className='flag-box' style={{ marginLeft: 15 }}>
          <span className={`fi fi-${state.code.toLowerCase()}`}></span>
        </Col>
        <Col xs={9} className='mt-3'>
          <Input
            placeholder='Contact No'
            value={state.contact}
            onChange={(e) => dispatchReducer({ type: 'field', fieldName: 'contact', payload: e.target.value })}
          />
        </Col>
        <Col md={12}><hr className='mt-4 mb-1' /></Col>
      </Row>
      <Row>
        <Col md={12}>
          {checkAvailability() &&
            <div>
              <h6 className='mt-2'>
                <FaClockRotateLeft style={{ color: 'orange' }} />
                <span className='mx-1'>Tour Cut-off time for today is over.</span>
              </h6>
              <span className='grey-txt-2'>Please Select another date.</span>
            </div>
          }
          {(state.booking.length > 0 && oneSelected()) &&
            <button
              disabled={checkAvailability()}
              className='cart-btn mt-3'
              onClick={addToCart}
            >
              Add To Cart
            </button>
          }
        </Col>
      </Row>
      </>
      }
      {load && <div className='text-center py-5'> <Spinner className='mt-5' /><p className='mb-5'>Please wait...</p> </div>}
    </div>
    </>
  )
}
export default React.memo(MobileBook)