import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import Router from 'next/router';
import useWindowSize from '/functions/useWindowSize';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import Loader from "../Shared/Loader";

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

  const responseGoogle = async(response) => {
    let token = jwt_decode(response.credential);
    if(token.email_verified) {
      let user = {
        picture:token.picture,
        email:token.email,
        name:token.name,
      }
      await Cookies.set("token", JSON.stringify(user));
      let url = await Cookies.get("redirect");
      Router.push(url);
    }
  }
  
  return (
  <div className='bg-login'>
    {!load &&
    <div className='customer-login text-center'>
    <div className={`${size.width>500?"cont":"pb-5 mb-5"}`}>
      <img src={'/images/logo.png'} className={`${size.width>500?"mb-5":"my-5"}`} width={200} height={85} alt="Image" />
      <div className={`container-custom ${size.width>500?"":"px-3"}`}>
      <div className='login-box'>
      <h3 className='text-center mt-5 signup'>Sign-in</h3>
      <div className='mb-4 py-2'></div>
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login" onSuccess={responseGoogle} onFailure={()=>alert("failed")}
        />
        <p className='text-center mb-3 mt-5 privacy-text'>Privacy Protected Login</p>
      </div>
      </div>
    </div>
    </div>
    }
    {load && 
    <Loader/>
    }
  </div>
  )
}

export default CustomerLogin