import React from 'react';
import Home from '/Components/Layouts/Home';
import Head from 'next/head';

const home = () => {
  return (
    <>
      <Head>
        <title>#1 Travel Agency in Dubai & Abu Dhabi | UAE's Best Travel Experts</title>
        <meta name="description" content="Discover best travel experiences with Peaceland Travel, the leading travel agency in Dubai and Abu Dhabi. Plan a dream vacation with top travel agency near you!" key="desc" />
      </Head>
      <Home />
    </>
  )
}
export default home