import Product from '/Components/Layouts/Product';
import axios from 'axios';

product.getInitialProps = async({query}) => {
  const tourData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_ID,{
    headers:{
      'id':`${query.id}`
    }
  }).then((x)=>x.data)

  return{
    id:query.id,
    tourData
  }
}

export default function product({ id, tourData }) {
  return (<Product id={id} tourData={tourData} />)
}