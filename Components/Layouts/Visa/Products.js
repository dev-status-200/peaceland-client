import React, { useState, useEffect } from 'react';
import { EditOutlined, EllipsisOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, ConfigProvider, Modal, Row, Col, Select, Input, DatePicker, Button } from 'antd';
import codes from "/JSONData/codes.json";
import dayjs from 'dayjs';
import axios from 'axios';
import { delay } from "/functions/delay"

const { Meta } = Card;

const VisaProducts = () => {

  const [load, setLoad] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [success, setSuccess] = useState(false); 
  const [form, setForm] = useState([ ]);
  const showModal = (x) => {
    console.log(x.id)
    setIsModalOpen(true);
    let tempForm = [...form];
    tempForm[0].entryType = x.id
    setForm(tempForm)
  };
  const cardStyle = { width: 320, margin:20 };
  const cardsOne = [
    {id:'1', title:'14 Days', desc:'Single Entry Application + Insurance', extra:'', api:"https://api.whatsapp.com/send/?phone=917501086003&text=Single Entry Application with Insurance"},
    {id:'2', title:'30 Days', desc:'Single Entry Application + Insurance', extra:'', api:"https://api.whatsapp.com/send/?phone=917501086003&text=Single Entry Application with Insurance"},
    {id:'3', title:'60 Days', desc:'Single Entry Application + Insurance', extra:'', api:"https://api.whatsapp.com/send/?phone=917501086003&text=Single Entry Application with Insurance"},
  ];
  const cardsTwo = [
    {id:'4', title:'14 Days', desc:'Multiple Entry Application + Insurance', extra:'2 Working Days*', api:"https://api.whatsapp.com/send/?phone=917501086003&text=Multiple Entry Application with Insurance"},
    {id:'5', title:'30 Days', desc:'Multiple Entry Application + Insurance', extra:'2 Working Days*', api:"https://api.whatsapp.com/send/?phone=917501086003&text=Multiple Entry Application with Insurance"},
    {id:'6', title:'60 Days', desc:'Application Extension/A2A Application Change', extra:' ', api:"https://api.whatsapp.com/send/?phone=917501086003&text=Application Extension/A2A Application Change"},
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

  return (
    <div>
    <Modal open={isModalOpen} width={'80%'} onCancel={closeModal} okButtonProps={{hidden:true}} cancelButtonProps={{hidden:true}}>
      {!success &&
      <div className='p-2'>
        <form onSubmit={handleSubmit}>
        {form.map((x, i)=>{
          return(
          <Row key={i}>
            <Col span={24}>
              <h5 className='mt-2'>Person {i+1}</h5>
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
        <div className='px-2 mt-4'>
          <button className='custom-btn' disabled={load?true:false} type='submit'>{!load?"Submit":<LoadingOutlined />}</button>
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
    <div className='visa-styles pt-4'>
      <div className='main-container pt-4'>
        <div className='white-box'>
          <h2 className='text-center blue-txt mb-4 fw-700'>Dubai Visa Applications</h2>
          <hr/>
          <ConfigProvider theme={{token:{ colorPrimary:'red' }}}>
          <Flex justify={"center"} align={"center"} gap={"large"}>
            {cardsOne.map((x, i)=>{
              return(
              <Card key={i} hoverable style={cardStyle} cover={ <img alt="example" src="visaForm/visa.jpg" height={150} /> } >
                <Meta 
                  title={<h3 className='text-center blue-txt'>{x.title}</h3>}
                  description={<h6 className='text-center  grey-txt'>{x.desc}</h6>} 
                />
                <p className='text-center grey-txt' style={{height:20}}>{x.extra}</p>
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
            {cardsTwo.map((x, i)=>{
              return(
              <Card key={i} hoverable style={cardStyle} cover={ <img alt="example" src="visaForm/visa.jpg" height={150} /> } >
                <Meta 
                  title={<h3 className='text-center blue-txt'>{x.title}</h3>}
                  description={<h6 className='text-center  grey-txt'>{x.desc}</h6>} 
                />
                <div className='text-center mt-1'>Express</div>
                <p className='text-center grey-txt' style={{height:20}}>{x.extra}</p>
                <hr/>
                <Flex justify={"center"} align={"center"} gap={"large"} className='mt-3'>
                  <span className='btn-blue' onClick={()=>showModal(x)}>Apply Online</span>
                  <span className='btn-whatsapp'>On Whatsapp</span>
                </Flex>
              </Card>
              )
            })}
          </Flex>
          </ConfigProvider>
        </div>
      </div>
    </div>
    </div>
  )
}

export default React.memo(VisaProducts)