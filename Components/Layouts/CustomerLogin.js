import React, { useEffect, useState, useRef } from 'react';
import Cookies from "js-cookie";
import Router from 'next/router';
import useWindowSize from '/functions/useWindowSize';
import jwt_decode from 'jwt-decode';
import Loader from "../Shared/Loader";
// import GoogleLogin from '@dump-work/react-google-login';

const CustomerLogin = () => {

  const size = useWindowSize();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo() {
    const token = await Cookies.get("token");
    token?Router.push("/"):setLoad(false);
  }

  const responseGoogle = async(res) => {
    let token = jwt_decode(res.credential);
    console.log(token)
    if(token.email_verified) {
      let user = {
        picture:token.picture,
        email:token.email,
        name:token.name,
      }
      await Cookies.set("token", JSON.stringify(user));
      let url = await Cookies.get("redirect");
      Router.push(url?url:'/')
    }
  }

  const googleButton = useRef(null);

  const loadScript = (src) => new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  });

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = "1018461770381-hin727pafmfajl3oq0djq27h3rnae221.apps.googleusercontent.com"

    loadScript(src)
      .then(() => {
        /*global google*/
        console.log(google)
        google.accounts.id.initialize({
          client_id: id,
          callback: responseGoogle,
        })
        google.accounts.id.renderButton(
          googleButton.current, 
          { theme: 'outline', size: 'large' } 
        )
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  }, [])

  return (
  <div className='bg-login'>
    {!load &&
    <div className='customer-login text-center'>
    <div className={`${size.width>500?"cont":"pb-5 mb-5 pt-5"}`}>
      <div className={`container-custom ${size.width>500?"":"px-3"}`}>
      <div className={`login-box ${size.width>500?"mt-4":"mt-5"}`}>
      <img src={'/images/logo.png'} className={`${size.width>500?"mt-5":"mt-5"}`} width={200} height={85} alt="Image" />
      <div className='mb-4 py-2'></div>
        <div ref={googleButton}></div>
        <p className='text-center mb-3 mt-5 privacy-text'>Privacy Protected Login</p>
      </div>
      </div>
    </div>
    </div>
    }
    {load && 
    <Loader/>
    }
    <div className='text-center wh-txt' style={{position:'absolute', bottom:0, textAlign:'center', width:'100%'}}>
      <p className='fs-12'>Copyright 2024 Peaceland Travel, All Rights Reserved</p>
    </div>
  </div>
  )
}

export default React.memo(CustomerLogin)
