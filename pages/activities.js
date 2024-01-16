import React from 'react';
import Search from '/Components/Layouts/Search';
import axios from 'axios';
import Head from 'next/head';

const activities = ({destination, city, date, category, tourData}) => {
  return (
    <>
      <Head>
        <title>Discover Top Unforgettable Tourist Activities in Dubai, Abhu Dhabi, UAE</title>
        <meta name='description' content='Explore a curated list of must-try activities for tourists in Dubai, Abu Dhabi, and UAE. Plan your visit to best destinations today with Peaceland Travel' key="desc" />
      </Head>
      <Search destination={destination} city={city} date={date} category={category} tourData={tourData} />
    </>
  )
}
export default activities

activities.getInitialProps = async({query}) => {
  let destination ='', city ='', date ='', category="";
  destination = query.destination || '';
  city = query.city || '';
  date = query.date || '';
  category = query.category || '';


  const tourData = await axios.get(process.env.NEXT_PUBLIC_GET_SEARCH_PRODUCT_PEACELAND,{
    headers:{
      'destination':`${destination}`,
      'city':`${city}`,
      'category':`${category}`,
    }
  }).then((x)=>x.data)
  return{
    destination, city, date, category, tourData
  }
}