import React,{ useState } from 'react';
import '/styles/globals.css';
import '/styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import Loader from '../Components/Shared/Loader'; 
import Router, { useRouter  } from 'next/router';
import Script from "next/script";
import ClientLayout from '../Components/Shared/ClientLayout';
import { store } from '/redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps:{ session, ...pageProps }, }) {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  Router.events.on("routeChangeStart", () => { setLoading(true) });
  Router.events.on("routeChangeComplete", () => { setLoading(false)});

  return (
    <> 
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-2D03SMZSES`} />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2D03SMZSES', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
    {(
      router.pathname =='/'            ||
      router.pathname =='/product'     ||
      router.pathname =='/product/[id]'||
      router.pathname =='/package'     ||
      router.pathname =='/package/[id]'||
      router.pathname =='/cart'        ||
      router.pathname =='/myBookings'  ||
      router.pathname =='/about'       ||
      router.pathname =='/ticketPage'  ||
      router.pathname =='/search'      ||
      router.pathname =='/visa'        ||
      router.pathname =='/hotels'      ||
      router.pathname =='/search/[id]' ||
      router.pathname =='/visaForm'    ||
      router.pathname =='/destinations'||
      router.pathname =='/contact'     ||
      router.pathname =='/activities'  ||
      router.pathname =='/paySuccess'
    ) &&
      <>
        {loading && 
          <Provider store={store}>
            <Loader/> 
          </Provider>
        }
        {!loading &&
          <Provider store={store}>
            <ClientLayout>
              <Component {...pageProps} /> 
            </ClientLayout>
          </Provider>
        }
      </>
    }
    {(router.pathname =='/login' || router.pathname =='/auth') &&
      <Component {...pageProps} />
    }
    </>
  )
}

export default MyApp