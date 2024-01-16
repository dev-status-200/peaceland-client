import React from 'react';
import Head from 'next/head';
import About from '/Components/Layouts/About';

const about = () => {
  return (
    <>
      <Head>
        <title>About The Peace Land Travels | The Best Travel Agency In UAE</title>
        <meta name='description' content='Embark on a journey with Peace Land Travels and explore our rich history, passionate team, and commitment to crafting extraordinary travel experiences.' />
      </Head>
      <About/>
    </>
  )
}

export default about