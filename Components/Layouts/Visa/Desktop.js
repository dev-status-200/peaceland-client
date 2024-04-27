import React, { useState, useEffect } from 'react';
import { Card, Flex, ConfigProvider, Modal, Row, Col, Select, Input, DatePicker, Checkbox } from 'antd';
import { LoadingOutlined, CloseCircleOutlined, TagsOutlined } from '@ant-design/icons';
import codes from "/JSONData/codes.json";
import { delay } from "/functions/delay";
import dayjs from 'dayjs';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

const { Meta } = Card;

const VisaProducts = () => {

  const [agree, setAgree] = useState(false); 
  const [load, setLoad] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [success, setSuccess] = useState(false); 
  const [form, setForm] = useState([ ]);
  const [user, setUser] = useState({});

  const info = () => {
    Modal.info({
      title: 'Visa Application requires Login!',
      content: (
        <div>
          <p>In order to fill the form you must be loggin in!</p>
          <Link href={'/auth'}>Sign-in with google</Link>
        </div>
      ),
      onOk(){

      }
    });
  };

  const showModal = (x) => {
    if(user.email){
      setIsModalOpen(true);
      let tempForm = [...form];
      tempForm[0].entryType = x.id
      setForm(tempForm)
    } else {
      info()
    }
  };
  const cardStyle = { width: 320, margin:20 };
  const cardsOne = [
    {id:'1', title:'48 Hours', price:'110 AED', api:"https://api.whatsapp.com/send/?phone=917526458800&text=48 Hours - Visa Query"},
    {id:'2', title:'96 Hours', price:'220 AED', api:"https://api.whatsapp.com/send/?phone=917526458800&text=96 Hours - Visa Query"},
    {id:'3', title:'30 Days',  price:'350 AED', api:"https://api.whatsapp.com/send/?phone=917526458800&text=30 Days - Visa Query"},
  ];
  const cardsTwo = [
    {id:'4', title:'60 Days', price:'600 AED', api:"https://api.whatsapp.com/send/?phone=917526458800&text=60 Days - Visa Query"},
    {id:'5', title:'30 Days Multi Entry',  price:'600 AED', api:"https://api.whatsapp.com/send/?phone=917526458800&text=30 Days Multi Entry - Visa Query"},
    {id:'6', title:'60 Days Multi Entry', price:'850 AED',  api:"https://api.whatsapp.com/send/?phone=917526458800&text=60 Days Multi Entry - Visa Query"},
  ];
  const cardsThree = [
    {id:'7', title:'60 Days Extension A2A', price:'1550 AED', api:"https://api.whatsapp.com/send/?phone=917526458800&text=60 days Extension A2A - Visa Query"},
  ];
  const options = [
    {value:'1', label:'14 Days Single Entry Application + Insurance'},
    {value:'2', label:'30 Days Single Entry Application + Insurance'},
    {value:'3', label:'60 Days Single Entry Application + Insurance'},
    {value:'4', label:'14 Multiple Entry Application + Insurance 2 Working Days*'},
    {value:'5', label:'30 Days Multiple Entry Application + Insurance 2 Working Days*'},
    {value:'6', label:'60 Application Extension/A2A Application Change'},
  ];
  const personDetail = {
    firstName:'',
    lastName:'',
    email:'',
    state:'',
    city:'',
    nationality:'AE',
    countryCode:'AE',
    contact:'',
    WAcountryCode:'AE',
    WAcontact:'',
    dob:new Date(),
    passport:'',
    passportDay:'1',
    passportMonth:'January',
    passportYear:'2024',
    ApassportDay:'1',
    ApassportMonth:'January',
    ApassportYear:'2024'
  }
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  useEffect(() => {
    setForm([personDetail]);
    getAuth()
  }, [])
  
  const appendPerson = () => {
    let tempState = [...form];
    tempState.push(personDetail);
    setForm(tempState)
  }

  const handleSubmit = async(e) => {
    setLoad(true)
    e.preventDefault();
    await axios.post(process.env.NEXT_PUBLIC_POST_CREATE_VISA,{
      persons:form
    }).then(async(x)=>{
      await delay(2000);
      setLoad(false);
      setSuccess(true);
      setForm([personDetail])
    })
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSuccess(false)
  }

  async function getAuth(){
    let token = await Cookies.get("token");
    await token?setUser({...(JSON.parse(token)), loggedIn:true}):null;
  }

  const OkInfo = ({para, head}) => {
    return(
      <div>
      <h5 className='blue-txt mt-5' style={{fontSize:head}}>Ok To Board Information</h5>
      <hr/>
      <p className='grey-txt-2' style={{fontSize:para}}>Visitors from India, Nepal, Pakistan, Bangladesh and other Asian countries have to get an Ok to Board Status before travelling to UAE. In short, having a valid Application is not enough to travel to the UAE. On the other hand, you would have electronically update your Application and get an Ok to Board from your airline. If you fail to do so, you would not be allowed to board your flight from your home country itself.</p>
      <h5 className='blue-txt mt-5' style={{fontSize:head}}>Special Notes</h5>
      <hr/>
      <Row>
        <Col span={24} className='grey-txt-2' style={{fontSize:para}}>
        <ul>
          <li>Your passport should have minimum 6 months validity.</li>
          <li>The passport should be a printed one and not handwritten.</li>
          <li>The documents should be scanned properly. Blurred copies would not be accepted.</li>
          <li>Note: You can provide us as the required documents on WhatsApp at <b className='blue-txt'>+971 52 645 8800</b> OR Email at <b className='blue-txt'>info@peacelandtravel.com</b></li>
        </ul>
        </Col>
      </Row>
      </div>
    )
  }

  return (
  <>
    <Modal open={isModalOpen} width={'80%'} onCancel={closeModal} okButtonProps={{hidden:true}} centered cancelButtonProps={{hidden:true}}>
      {!success &&
      <div className='p-2'>
        <form onSubmit={handleSubmit}>
        {form.map((x, i)=>{
          return(
          <Row key={i}>
            <Col span={21}>
              <h5 className='mt-2'>
                <span>Person {i+1}</span>
              </h5>
            </Col>
            <Col span={3}>
            { i>0 && <b className='cross-icon mx-2'
              onClick={()=>{
                let tempState = [...form];
                tempState = tempState.filter((y, j)=>{
                  return j!=i
                });
                setForm(tempState)
              }}
            >Remove<CloseCircleOutlined className='mx-2' /></b>}
            </Col>
            <Col span={6} className='px-4 py-2'>
              <b>First Name</b>
              <Input required value={x.firstName}
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, firstName:e.target.value}
                  setForm(tempForm);
                }} 
              />
            </Col>
            <Col span={6} className='px-4 py-2'>
              <b>Last Name</b>
              <Input required
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, lastName:e.target.value}
                  setForm(tempForm);
                }} 
              />
            </Col>
            <Col span={6} className='px-4 py-2'>
              <b>Nationality</b>
              <Select  defaultValue="United Arab Emirates"
                style={{width:"100%"}}
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, nationality:e, countryCode:e, WAcountryCode:e}
                  setForm(tempForm);
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
            <Col span={6} className='px-4 py-2'>
              <b>Entry Type</b>
              <Select style={{width:"100%"}} disabled
                value={x.entryType}
                // onChange={(e)=>{
                //   let tempForm  = [...form];
                //   tempForm[i] = {...x, entryType:e}
                //   setForm(tempForm);
                // }} 
                options={options} 
                />
            </Col>
            <Col span={6} className='px-4 py-2'>
              <b>City</b>
              <Input required
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, city:e.target.value}
                  setForm(tempForm);
                }} 
              />
            </Col>
            <Col span={6} className='px-4 py-2'>
              <b>State</b>
              <Input required
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, state:e.target.value}
                  setForm(tempForm);
                }} 
              />
            </Col>
            <Col span={6} className='px-4 py-2'>
              <b>Country Code</b>
              <Select style={{width:'100%'}} value={x.countryCode}
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, countryCode:e}
                  setForm(tempForm);
                }} 
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  ((option?.value) ?? '').toLowerCase().includes(input.toLowerCase())||
                  ((option?.label) ?? '').toLowerCase().includes(input.toLowerCase())||
                  ((option?.code) ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={codes.map((x)=>{
                  return { ...x, label:`${x.label} (${x.code})` }
                })}
              />
            </Col>
            <Col span={6} className='px-4 py-2'>
              <b>Contact No.</b>
              <Input required
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, contact:e.target.value}
                  setForm(tempForm);
                }} 
              />
            </Col>
            <Col span={6} className='px-4 py-2'>
              <b>WhatsApp Country Code</b>
              <Select style={{width:'100%'}} value={x.WAcountryCode} 
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, WAcountryCode:e}
                  setForm(tempForm);
                }} 
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  ((option?.value) ?? '').toLowerCase().includes(input.toLowerCase())||
                  ((option?.label) ?? '').toLowerCase().includes(input.toLowerCase())||
                  ((option?.code) ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={codes.map((x)=>{
                  return { ...x, label:`${x.label} (${x.code})` }
                })}
              />
            </Col>
            <Col span={6} className='px-4 py-2'>
              <b>WhatsApp Contact No.</b>
              <Input required
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, WAcontact:e.target.value}
                  setForm(tempForm);
                }} 
              />
            </Col>
            <Col span={6} className='px-4 py-2'>
              <b>Date of Birth</b>
              <DatePicker style={{width:'100%'}}
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, dob:dayjs(e).format("YYYY-MMM-DD")}
                  setForm(tempForm);
                }} 
              />
            </Col>
            <Col span={6} className='px-4 py-2'>
              <b>Email Address</b>
              <Input type='email' required
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, email: e.target.value}
                  setForm(tempForm);
                }} 
              />
            </Col>
            <Col span={1}></Col>
            <Col span={22}>
              <hr className='mt-4' />
            </Col>
            <Col span={1}></Col>
            <Col span={8} className='px-4 py-2'>
              <b>Passport Number</b>
              <Input required
                onChange={(e)=>{
                  let tempForm  = [...form];
                  tempForm[i] = {...x, passport: e.target.value}
                  setForm(tempForm);
                }} 
              />
            </Col>
            <Col span={8} className='px-4 py-2'>
              <b>Passport Expiry Date</b>
              <div>
                <span className=''>
                <Select style={{width:'20%'}}
                  value={x.passportDay}
                  onChange={(e)=>{
                    let tempForm  = [...form];
                    tempForm[i] = {...x, passportDay:e}
                    setForm(tempForm);
                  }} 
                  options={[ ...Array(31).keys() ].map( (i) => {return { value:i+1, label:i+1 }})}
                />
                </span>
                <span className='mx-3'>
                <Select style={{width:'35%'}}
                  value={x.passportMonth}
                  onChange={(e)=>{
                    let tempForm  = [...form];
                    tempForm[i] = {...x, passportMonth:e}
                    setForm(tempForm);
                  }} 
                  options={months.map((x)=> { return { value:x, label:x} })}
                />
                </span>
                <span className=''>
                <Select style={{width:'30%'}}
                  value={x.passportYear}
                  onChange={(e)=>{
                    let tempForm  = [...form];
                    tempForm[i] = {...x, passportYear:e}
                    setForm(tempForm);
                  }} 
                  options={[ ...Array(12).keys() ].map( (i) => {return { value:i+2023, label:i+2023 }})}
                />
                </span>
              </div>
            </Col>
            <Col span={8} className='px-4 py-2'>
              <b>Arrival Date</b>
              <div>
                <span className=''>
                <Select style={{width:'20%'}}
                  value={x.ApassportDay}
                  onChange={(e)=>{
                    let tempForm  = [...form];
                    tempForm[i] = {...x, ApassportDay:e}
                    setForm(tempForm);
                  }} 
                  options={[ ...Array(31).keys() ].map( (i) => {return { value:i+1, label:i+1 }})}
                />
                </span>
                <span className='mx-3'>
                <Select style={{width:'35%'}}
                  value={x.ApassportMonth}
                  onChange={(e)=>{
                    let tempForm  = [...form];
                    tempForm[i] = {...x, ApassportMonth:e}
                    setForm(tempForm);
                  }} 
                  options={months.map((x)=> { return { value:x, label:x} })}
                />
                </span>
                <span className=''>
                <Select style={{width:'30%'}}
                  value={x.ApassportYear}
                  onChange={(e)=>{
                    let tempForm  = [...form];
                    tempForm[i] = {...x, ApassportYear:e}
                    setForm(tempForm);
                  }} 
                  options={[ ...Array(12).keys() ].map( (i) => {return { value:i+2023, label:i+2023 }})}
                />
                </span>
              </div>
            </Col>
            <Col span={24}></Col>
            <Col span={1}></Col>
            <Col span={22}>
              {form.length-1!=i && <hr />}
            </Col>
            <Col span={1}></Col>
          </Row>
        )})}
        <hr/>
        {/* <p className='grey-txt-2 fs-18 fw-600 blue-txt'>Documents:</p> */}
        <b className='fs-16 blue-txt'>Here is the list of scanned documents that you need to send along with your application:</b>
        <ul className='fs-14 grey-txt-2'>
          <li>Front and last pages of passport.</li>
          <li>Passport size photograph.</li>
          <li>If you have visited Dubai or UAE before, you would have scan the page with the exit stamp.</li>
          <li>Confirmed return flight tickets.</li>
          <li>Front and back of national id card.</li>
        </ul>
        <div className='mt-2 cur'  onClick={()=>setAgree(!agree)}>
          <b>Note:</b> You can provide us as the required documents on WhatsApp at <b>+971 52 645 8800</b> or Email them at <b>info@peacelandtravel.com</b><Checkbox className='mx-1' checked={agree} /> <span className='red-txt fs-20'>*</span>
          <br/>
          {/* By Clicking this checkbox you agree to our Visa application process Terms & Conditions <Checkbox className='mx-1' checked={agree} /> */}
        </div>
        <div className='px-2 mt-3'>
          <button className='custom-btn' 
            disabled={(load || !agree)?true:false} 
            // disabled={load?true:false} 
            type='submit'
          >
              {!load?"Submit":<LoadingOutlined />}
          </button>
          <button className='custom-btn mx-2' type='button' onClick={appendPerson}>Add more person</button>
        </div>
        </form>
      </div>
      }
      {success &&
        <div style={{backgroundColor:"white", padding:100}}>
        <div className='text-center' data-aos="fade-in">
          <img src={"/other-assets/payment_done.png"} height={200}  alt="Success"/>
          <h1 style={{color:"#20bf55", fontWeight:700}} className="my-3">Form Submitted successfully</h1>
          <p style={{color:"grey"}}>A confirmation E-mail will be sent to you in 24 hours</p>
        </div>
        </div>
      }
    </Modal>
    <div className='visa-styles pt-'>
      <div className='main-container pt-4'>
        <div className='white-box'>
          <h1 className='text-center blue-txt mb-4 fw-700'>Dubai Visa Applications</h1>
          <hr/>
          <ConfigProvider theme={{token:{ colorPrimary:'red' }}}>
          <Flex justify={"center"} align={"center"} gap={"large"}>
            {cardsOne.map((x, i)=>{
              return(
              <Card key={i} hoverable style={cardStyle} className='pt-3 pb-2'>
                <Meta 
                  title={<h4 className='text-center blue-txt fw-800'>{x.title}</h4>}
                  description={
                    <h5 className='text-center grey-txt'>
                      <TagsOutlined /><span className='mx-2'>{x.price}</span>
                    </h5>
                  }
                />
                {/* <p className='text-center grey-txt' style={{height:20}}>{x.extra}</p> */}
                <hr/>
                <Flex justify={"center"} align={"center"} gap={"large"} className='mt-3'>
                  <span className='btn-blue' 
                    onClick={()=>showModal(x)}>
                    Apply Online
                  </span>
                  <a className='btn-whatsapp' href={`${x.api}`} target='_blank'>On Whatsapp</a>
                </Flex>
              </Card>
              )
            })}
          </Flex>
          <Flex justify={"center"} align={"center"} gap={"large"}>
            {cardsTwo.map((x, i)=>{
              return(
              <Card key={i} hoverable style={cardStyle} className='pt-3'>
                <Meta 
                  title={<h4 className='text-center blue-txt fw-800'>{x.title}</h4>}
                  description={
                    <h5 className='text-center grey-txt'>
                      <TagsOutlined /><span className='mx-2'>{x.price}</span>
                    </h5>
                  }
                />
                {/* <div className='text-center mt-1'>Express</div>
                <p className='text-center grey-txt' style={{height:20}}>{x.extra}</p> */}
                <hr/>
                <Flex justify={"center"} align={"center"} gap={"large"} className='mt-3'>
                  <span className='btn-blue' onClick={()=>showModal(x)}>Apply Online</span>
                  <a className='btn-whatsapp' href={`${x.api}`} target='_blank'>On Whatsapp</a>
                </Flex>
              </Card>
              )
            })}
          </Flex>
          <Flex justify={"center"} align={"center"} gap={"large"}>
            {cardsThree.map((x, i)=>{
              return(
              <Card key={i} hoverable style={cardStyle} className='pt-3'>
                <Meta 
                  title={<h4 className='text-center blue-txt fw-800'>{x.title}</h4>}
                  description={
                    <h5 className='text-center grey-txt'>
                      <TagsOutlined /><span className='mx-2'>{x.price}</span>
                    </h5>
                  }
                />
                {/* <div className='text-center mt-1'>Express</div>
                <p className='text-center grey-txt' style={{height:20}}>{x.extra}</p> */}
                <hr/>
                <Flex justify={"center"} align={"center"} gap={"large"} className='mt-3'>
                  <span className='btn-blue' onClick={()=>showModal(x)}>Apply Online</span>
                  <a className='btn-whatsapp' href={`${x.api}`} target='_blank'>On Whatsapp</a>
                </Flex>
              </Card>
              )
            })}
          </Flex>
          </ConfigProvider>
        </div>
      </div>
    </div>
    <div className='bg-white p-5'>
      <Container>
      <h5 className='fs-30 blue-txt'>Documents Required for UAE Application</h5>
      <hr/>
      <p className='grey-txt-2 fs-20 mt-5 fw-600 blue-txt'>Visitor's Document:</p>
      <b className='fs-18'>Here is the list of scanned documents that you need to send along with your application:</b>
      <ul className='fs-18 grey-txt-2'>
        <li>Front and last pages of passport.</li>
        <li>Passport size photograph.</li>
        <li>If you have visited Dubai or UAE before, you would have scan the page with the exit stamp.</li>
        <li>Confirmed return flight tickets.</li>
        <li>Front and back of national id card.</li>
      </ul>
      <p className='grey-txt-2 fs-20 mt-5 fw-600 blue-txt'>Guarantor's Document:</p>
      <b className='fs-18'>Here are the documents that you need to submit if you have a guarantor in the UAE:</b>
      <ul className='fs-18 grey-txt-2'>
        <li>Copy of guarantor's passport and resident Application, with 3 months validity for both</li>
        <li>A security cheque of AED 5500 for every Application; this cheque would not be used unless the visitor absconds.</li>
        <li>Bank statement of last month from the same bank account as the cheque, for proof.Here are the documents that you need to submit if you do not have a guarantor in the UAE</li>
        <li>Visitors {"("}except families{")"} have to put in a security deposit of AED 5500 with us. This deposit is fully refundable and would be returned to you once you send a scanned copy of your passport page that has the UAE exit stamp.</li>
        <li>Family visitors do not have to provide a deposit. On the other hand, they can make airline, tour or hotel booking with us.</li>
      </ul>
      <b className='fs-18'>Documents for Visitors with NO Guarantor in UAE.</b>
      <ul className='fs-18 grey-txt-2'>
        <li>Family visitors may not need to put any deposit instead, they can make the Hotel / Airline / Tour booking with us with best-guaranteed prices.</li>
        <li>Certain visitors (except for families) are required to pay an amount of AED 5500 towards the Security Deposit. Though this amount is fully refundable, please inform Al that we will reimburse you the money only after you send us the scanned copy of your passport page with the UAE Exit stamp. This step is vital to make sure that you’re not overstaying and already left the country.</li>
      </ul>

      <h5 className='fs-30 blue-txt mt-5'>How to apply for UAE Application?  </h5>
      <hr/>
      <div className='fs-18 grey-txt-2'>
        <p>Make your UAE Application process easy and simple by following these points. </p>
        <p>First and foremost, check the following -</p>
        <ul>
          <li>Your passport should be valid for at least 6 more months after you arrive in the UAE.</li>
          <li>Select a Application type according to your travel plan.</li>
          <li>Be sure you have the resources necessary to pay for your stay in Dubai.</li>
          <li>Get in touch with a person who can act as your sponsor for a Application to the UAE.</li>
        </ul>
        <p>Once you have these sorted, next step would be to apply for UAE Application online. Fill up a simple Application form correctly and completely and submit it with the Application fees. Next,  gather the documents supporting your UAE application. These include:</p>
        <ul>
          <li>Passport copies </li>
          <li>Colour passport size photographs</li>
          <li>Bank statements and salary slips</li>
          <li>Confirmed flight tickets</li>
          <li>Travel and health insurance. </li>
        </ul>
        <p>Your UAE sponsor will complete the rest of the process on your behalf after receiving these documents.</p>
        <p>Confused about how to obtain a sponsor for your UAE Application or which Application to apply for? Get in touch with us to apply for your UAE Application. You will receive all-around assistance from our team of professionals with years of experience. We can assist you with the application process, submit the paperwork on your behalf, and expeditiously complete the entire procedure. All you need to do is get in touch with us, and we will walk you through each stage of the UAE application procedure.</p>
      </div>
      <OkInfo para={18} head={20} />
      </Container>
    </div>
  </>
  )
}

export default React.memo(VisaProducts)