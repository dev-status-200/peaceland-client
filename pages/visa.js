import React from 'react';
import Visa from '/Components/Layouts/Visa/Products';
import Head from 'next/head';

const visa = () => {
  return (
    <>
      <Head>
        <title>Trusted Visa Travel Agency in Dubai & Abu Dhabi | PeaceLand Travel</title>
        <meta name='description' content='Visa solutions with PeaceLand Travel, a leading travel agency in Dubai & Abu Dhabi. Visa services for hassle-free travel. Try our agency expertise today!' key="desc" />
      </Head>
      <Visa/>
    </>
  )
}

export default React.memo(visa)