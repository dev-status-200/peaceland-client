import React from 'react';
import TicketPage from '/Components/Layouts/TicketPage';

const ticketPage = ({ticketData, bookingNo}) => {
  return (
    <TicketPage ticketData={ticketData} bookingNo={bookingNo} />
  )
}
export default ticketPage

ticketPage.getInitialProps = async(req) => {
  const res = await fetch(process.env.NEXT_PUBLIC_GET_TICKET_INFO,{
    headers:{"id": `${req.query.id}`}
  })
  const json = await res.json();
  return {
    ticketData:json,
    bookingNo:req.query.id
  }
}