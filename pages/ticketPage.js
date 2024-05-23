import React from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
const TicketPage = dynamic(() => import('/Components/Layouts/TicketPage'), {
  ssr:false,
});

const ticketPage = ({ticketData, bookingNo}) => {
  return (
    <TicketPage ticketData={ticketData} bookingNo={bookingNo} />
  )
}
export default ticketPage

ticketPage.getInitialProps = async({query}) => {
    
  const id = await query.id||'';
  const res = await axios.get(process.env.NEXT_PUBLIC_GET_TICKET_INFO,{
    headers:{
      'id': `${id}`
    }
  }).then((x)=>x.data)
  return {
    ticketData:res,
    bookingNo:id
  }
}