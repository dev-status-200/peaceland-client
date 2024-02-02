import React, { useState } from 'react';
import { ConfigProvider, Modal } from 'antd';
import { Row, Col } from "react-bootstrap";
import { GrDownload, GrDocumentUpdate } from "react-icons/gr";
import { RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import useWindowSize from '/functions/useWindowSize';

const Visa = () => {

    const [open, setOpen] = useState(false);
    const size = useWindowSize();
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        // console.log('Clicked cancel button');
        setOpen(false);
    };

  return (
    <>
    <div className='visa-styles'>
    <div className='main-container'>
        {/* <div className='p-1'></div> */}
        <div className='first-box'></div>
        <div className='second-box'></div>
        <div className='visa-box'>
          <Row>
            <Col md={4} className='visa-col '>
                <Link className='text-center cur link-icon' 
                    href="/visaForm/visa_form.pdf"
                    target="_blank" download
                >
                    <GrDownload size={size.width<600?50:70} className='blue-txt' />
                    <p className='mt-3 fw-700 fs-18 blue-txt'>DOWNLOAD VISA FORM</p>
                </Link>  
            </Col>
            <Col md={4} className={`visa-col-mid${size.width<600?'':'-borders'} blue-txt ${size.width<600?'py-4':''}`}>
                <div className='text-center cur' style={{marginTop:7}} onClick={showModal}>
                <GrDocumentUpdate size={size.width<600?50:70} />
                <p className='mt-3 fw-700 fs-18'>SUBMIT FORM</p>
                </div>  
            </Col>
            <Col md={4} className='visa-col blue-txt'>
                <p className='mt-3 fw-700 fs-18 text-center'>TRACK MY VISA PROGRESS</p>
                <div className='input-container'>
                    <input placeholder='Enter Visa Form No.' type='text' />
                    <button className='visa-btn'><RightOutlined size={20} /></button>
                </div>
            </Col>
          </Row>
        </div>
    </div>
    </div>
    <ConfigProvider theme={{token:{ colorPrimary:'#b8d233' }}}>
    <Modal
        title="Visa Application Submission Process"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
    >   
    <div className='fs-17'>
        <hr/>
        <p>Please follow all the steps & guidlenes.</p>
        <p>
            Submit all the required documents include the visa form to the below E-mail. Once the documents are provided, under 24 hours, we{"'"}ll send you confirmation with a visa form no. to track your application process
        </p>
        <p>Email: <a className=''> visa@peacelandtravel.com</a></p>
    </div>
    </Modal>
    </ConfigProvider>
    </>
  )
}

export default Visa
