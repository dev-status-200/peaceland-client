import React from 'react';
import TicketPage from '../../Components/Layouts/TicketPage';
import axios from 'axios';

const ticketPage = ({ticketData, bookingNo}) => {
  return (
    // <div>Hello</div>
    <TicketPage ticketData={ticketData} bookingNo={bookingNo} />
  )
}


export default ticketPage

export async function getStaticPaths() {
    return {
      paths: [],
      fallback: false,
    }
  }

export async function getStaticProps(req) {
    const data = await axios.get(process.env.NEXT_PUBLIC_GET_TICKET_INFO,{
        headers:{ "id": `${req.params.id}` }
    }).then((x)=>x.data)

  return {
    props: {
        ticketData:data||null,
        bookingNo:req.params.id
    }
  }
}
