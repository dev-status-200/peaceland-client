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
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"></link>
          
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