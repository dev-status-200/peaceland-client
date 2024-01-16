import React from 'react';
import Hotels from '/Components/Layouts/Hotels';
import Head from 'next/head';

const hotels = () => {
  return (
    <>
    <Head>
      <title>Discover Cheap, Affordable & Luxurious Hotels in Dubai & UAE </title>
      <meta name='description' content='Explore our curated selection of hotels in Dubai & UAE for an unforgettable stay. From Cheap options to luxurious, find a perfect match for your wish' />
    </Head>
    <Hotels/>
    </>
  )
}

export default React.memo(hotels)