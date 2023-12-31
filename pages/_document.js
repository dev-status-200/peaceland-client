import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MainDocument extends Document {
  render() {
    return (
    <Html lang='en'>
      <title>Peaceland | Travel & Tours</title>
      <Head>
        <meta name="description" content="Checkout Peaceland Travel for exciting offers" key="desc" />
        <link rel="icon" href="/images/logo.png" width={200} />
          <link rel="preconnect" href="https://fonts.googleapis.com" as="font" crossOrigin="" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Days+One&family=Reem+Kufi:wght@400;500;600;700&display=swap" rel="stylesheet" />

          <Script src="https://www.googletagmanager.com/gtag/js?id=G-2D03SMZSES" />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-2D03SMZSES');
            `}
          </Script>

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    )
  }
}

export default MainDocument