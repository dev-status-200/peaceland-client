import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import Router, { useRouter } from 'next/router';
import useWindowSize from '/functions/useWindowSize';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import Loader from "../Shared/Loader";


const CustomerLogin = ({useGoogleLogin}) => {

  const router = useRouter();
  const size = useWindowSize();
  const [load, setLoad] = useState(true);
  // const googleLogin = useGoogleLogin({
  //   flow: 'auth-code',
  //   // onSuccess: async codeResponse => {
  //   //   setCodeResponse(codeResponse);
  //   // },
  //   onSuccess:async credentialResponse => {
  //     console.log(credentialResponse)
  //     let token = jwt_decode(credentialResponse.credential);
  //     if(token.email_verified){
  //       let user = {
  //         email:token.email,
  //         name:token.name,
  //         picture:token.picture,
  //       }
  //       await Cookies.set("token", JSON.stringify(user));
  //       let url = await Cookies.get("redirect")
  //       Router.push(url)

  //     }
  //   },
  //   onError: errorResponse => console.log(errorResponse),
  //   ux_mode: 'redirect',
  // });

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo() {
    const token = await Cookies.get("token");
    token?Router.push("/"):setLoad(false);
  }

  const responseGoogle = async(response) => {
    console.log(response);
    let token = jwt_decode(response.credential);
    if(token.email_verified){
      let user = {
        email:token.email,
        name:token.name,
        picture:token.picture,
      }
      await Cookies.set("token", JSON.stringify(user));
      let url = await Cookies.get("redirect")
      Router.push(url)

    }
  }
  
  return (
  <div className='bg-login'>
    {!load &&
    <div className='customer-login text-center'>
    <div className={`${size.width>400?"cont":"pb-5 mb-5"}`}>
      <img src={'/images/logo.png'} className={`${size.width>400?"mb-5":"my-5"}`} width={200} height={85} alt="Image" />
      <div className={`container-custom ${size.width>400?"":"px-3"}`}>
      <div className='login-box'>
      <h3 className='text-center mt-5 signup'>Sign-in</h3>
      <div className='mb-4 py-2'></div>
      <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={()=>alert("failed")}
        //cookiePolicy={'single_host_origin'}
      />
      {/* <GoogleLogin
          render={(renderProps) => (
            <button
              type="button"
              className=""
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign in with google
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        /> */}

      {/* <button colorScheme="blue" onClick={() => googleLogin()}>
        Login with Google 🚀
      </button> */}

        {/* <GoogleLogin
          ux_mode='redirect'
          redirect_uri="/"
          onSuccess={async(credentialResponse) => {
            console.log(credentialResponse)
            let token = jwt_decode(credentialResponse.credential);
            if(token.email_verified){
              let user = {
                email:token.email,
                name:token.name,
                picture:token.picture,
              }
              await Cookies.set("token", JSON.stringify(user));
              let url = await Cookies.get("redirect")
              Router.push(url)

            }
          }}
          useOneTap={true}
          onError={() => {
            console.log('Login Failed');
          }}
        /> */}
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