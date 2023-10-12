import React,{ useState } from 'react';
import '/styles/globals.css';
import '/styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';

import Loader from '../Components/Shared/Loader'; 

import Router, { useRouter  } from 'next/router';

import ClientLayout from '../Components/Shared/ClientLayout';
import PortalLayout from '../Components/Shared/PortalLayout';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { store } from '/redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps:{ session, ...pageProps }, }) {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  Router.events.on("routeChangeStart", () => { setLoading(true) });
  Router.events.on("routeChangeComplete", () => { setLoading(false)});

  return (
        // <div className='text-center' style={{marginTop:"25%"}}> Unexpected Server Error Occured </div>
    <> 
    { (
        router.pathname =='/'            ||
        router.pathname =='/product'     ||
        router.pathname =='/product/[id]'||
        router.pathname =='/cart'        ||
        router.pathname =='/myBookings'  ||
        router.pathname =='/about'       ||
        router.pathname =='/ticketPage'  ||
        router.pathname =='/search'      ||
        router.pathname =='/search/[id]' ||
        router.pathname =='/paySuccess'
      ) &&
      <>
        { loading && 
          <GoogleOAuthProvider clientId="1018461770381-hin727pafmfajl3oq0djq27h3rnae221.apps.googleusercontent.com">
            <Provider store={store}>
              <Loader/> 
            </Provider>
          </GoogleOAuthProvider>
        }
        { !loading &&
          <GoogleOAuthProvider clientId="1018461770381-hin727pafmfajl3oq0djq27h3rnae221.apps.googleusercontent.com">
            <Provider store={store}>
              <ClientLayout>
                <Component {...pageProps} /> 
              </ClientLayout>
            </Provider>
          </GoogleOAuthProvider>
        }
      </>
    }
    { (
        router.pathname =='/portal' || 
        router.pathname =='/productCreation'|| 
        router.pathname =='/transport'|| 
        router.pathname =='/bookings'|| 
        router.pathname =='/inventory'|| 
        router.pathname =='/customers'|| 
        router.pathname =='/reviews'|| 
        router.pathname =='/promos' 
      ) &&
        <PortalLayout>
          { loading && <Loader/> }
          { !loading && <Component {...pageProps} /> }
        </PortalLayout>
    }
    { (router.pathname =='/login' || router.pathname =='/auth') &&
      <GoogleOAuthProvider clientId="1018461770381-hin727pafmfajl3oq0djq27h3rnae221.apps.googleusercontent.com">
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    }
    </>
  )
}

export default MyApp
