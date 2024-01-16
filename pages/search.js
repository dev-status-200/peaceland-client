import React from 'react';
import Search from '../Components/Layouts/Search';
import axios from 'axios';
import Head from 'next/head';

const search = ({destination, city, date, category, tourData}) => {
  return (
    <>
      <Head>
        <title>Top Tourist Places in Dubai & Abu Dhabi | Must-Visit Destinations</title>
        <meta name='description' content='Discover the best tourist places in Dubai & Abu Dhabi with Peaceland Travel. Plan a trip to iconic destinations & best places in Dubai & Abu Dhabi.' key="desc" />
      </Head>
      <Search destination={destination} city={city} date={date} category={category} tourData={tourData} />
    </>
  )
}
export default search

search.getInitialProps = async({query}) => {
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