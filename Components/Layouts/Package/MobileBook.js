import React, { useEffect, useState, useReducer } from 'react'
import { Select, Input, message, notification } from 'antd';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import codes from "../../../JSONData/codes.json"
import { initialState, reducerFunctions, setTour, validateName } from './states';
import Cookies from 'js-cookie';
import aos from "aos";

const MobileBook = ({tour, transport, category, setOpen}) => {

    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [api, contextNotifyHolder] = notification.useNotification();
    const [messageApi, contextHolder] = message.useMessage();
    const Context = React.createContext({
        name: 'Default',
    });

    const conversion = useSelector((state) => state.currency.conversion);
    const [state, dispatchReducer] = useReducer(reducerFunctions, initialState);

    const [load, setLoad] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function getValues(){
        let token = await Cookies.get("token");
        await token?setUser({...(JSON.parse(token)), loggedIn:true}):null;
    }

    useEffect(() => {
        getValues()
        aos.init({duration:300})
        setTour(tour, dispatchReducer, category);
        openNotification('bottom')
    }, [])

    const showMessage = (msg) =>messageApi.info(msg);

    const addToCart = async() => {
        if(!validateName(state.name.length)){
            showMessage("Enter A Valid Full Name !");
            return
        }
        setLoad(true);
        await delay(500);
        let cartValues = {
            name:tour.title,
            customerTitle:state.title,
            customerName:user.name, 
            customerContact:state.contact, 
            customerEmail:user.email,
        }
        console.log(cartValues);
        dispatchReducer({ type: 'close' })
        showMessage("Your Query has been submitted, an agent will contact you soon!");
        setLoad(false);
        setOpen(false);
    }

    const oneSelected = () => {
        let result = false;
        state.booking.forEach((x)=>{
            if(x.check){
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
          duration:4
        });
    };

  return (
    <>
    {contextHolder}
    {contextNotifyHolder}
    <div>
        {!load && <>
        <div>
            <Row className="px-1">
                <Col md={12} className='my-2 fs-16'><b>Your Information</b></Col>
                <Col xs={4}>
                    <Select style={{width:"100%"}} value={state.title}
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName:'title', payload: e })}
                        options={[{value:"Mr.", label:"Mr."}, {value:"Ms.", label:"Ms."}, {value:"Mrs.", label:"Mrs."}]}
                    />
                </Col>
                <Col xs={8}>
                    <Input placeholder='Full Name' value={state.name}
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName:'name', payload: e.target.value })} 
                    />
                </Col>
                <Col xs={12} className='mt-3'>
                <Select  defaultValue="Select Country"
                    style={{width:"100%"}}
                    onChange={(e)=>{
                        let tempContact = ""
                        codes.forEach((x)=>{
                            if(x.value==e){
                                tempContact = x.code+" "
                                //dispatchReducer({ type: 'field', fieldName:'contact', payload: x.code+" " });
                                return
                            }
                        })
                        dispatchReducer({ type:'set', payload:{ code:e, contact:tempContact }})
                    }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        ((option?.value) ?? '').toLowerCase().includes(input.toLowerCase())||
                        ((option?.label) ?? '').toLowerCase().includes(input.toLowerCase())||
                        ((option?.code) ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={codes}
                />
                </Col>
                <Col xs={2} className='flag-box' style={{marginLeft:15}}>
                <span className={`fi fi-${state.code.toLowerCase()}`}></span>
                </Col>
                <Col xs={9} className='mt-3'>
                    <Input placeholder='Contact No' value={state.contact}
                        onChange={(e)=>dispatchReducer({ type: 'field', fieldName:'contact', payload: e.target.value })} 
                    />
                </Col>
                <Col md={12}><hr className='mt-4 mb-1'/></Col>
            </Row>
            <Row>
            <Col md={12}>
                {user.email &&
                    <button className='cart-btn mt-3' onClick={addToCart}>
                        Fill out Form
                    </button>
                }
                {!user.email &&
                    <button className='cart-btn mt-3' onClick={()=>Router.push("/auth")}>
                        Sign-In is required to complete
                    </button>
                }
            </Col>
            </Row>
        </div>
        </>
        }
        {load && <div className='text-center py-5'> <Spinner className='mt-5' /><p className='mb-5'>Please wait...</p> </div>}
    </div>
    </>
  )
}
export default React.memo(MobileBook)