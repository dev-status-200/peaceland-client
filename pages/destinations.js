import React from 'react';
import Destinations from '/Components/Layouts/Destinations';
import axios from 'axios';
import Head from 'next/head';

const activities = ({destination, city, date, category, tourData}) => {
  return (
    <>
      <Head>
        <title>Discover Top Unforgettable Tourist Activities in Dubai, Abhu Dhabi, UAE</title>
        <meta name='description' content='Explore a curated list of must-try activities for tourists in Dubai, Abu Dhabi, and UAE. Plan your visit to best destinations today with Peaceland Travel' key="desc" />
      </Head>
      <Destinations destination={destination} city={city} date={date} category={category} tourData={tourData} />
    </>
  )
}
export default activities

activities.getInitialProps = async() => {

  const tourData = await axios.get(process.env.NEXT_PUBLIC_GET_PACKAGES_CLIENT).then((x)=>x.data)
  return{
    tourData
  }
}