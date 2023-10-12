import React from 'react';
import Search from '../Components/Layouts/Search';
import axios from 'axios';

const search = ({destination, city, date, category, tourData}) => {
  return (
    <Search destination={destination} city={city} date={date} category={category} tourData={tourData} />
  )
}
export default search

search.getInitialProps = async({query}) => {
  //const { destination, city, date } = query;
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