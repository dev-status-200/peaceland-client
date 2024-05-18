import Package from '/Components/Layouts/Package';

export default function product({ id, tourData }) {
    return (
        <Package id={id} tourData={tourData} />
    )
}

export async function getStaticProps(ctx) {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_SLUG,{
        headers:{
            id:ctx.params.id
        }
    })
    const tourData = await res.json();
    return {
        props: {
            tourData,
            id:tourData.result.id
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_PRODUCT_SLUGS, {
        headers:{type:'package'}
    })
    const posts = await res.json();

    const paths = posts?.result?.map((post) => ({
        params: { id: post.slug },
    }));
    return { paths, fallback: false }
}






// import Package from '/Components/Layouts/Package';
// import axios from 'axios';

// export default function product({ id, tourData }) {
//   return (
//     <div>
//         <Package id={id} tourData={tourData} />
//     </div>
//   )
// }

// product.getInitialProps = async({query}) => {
//   const tourData = await axios.get(process.env.NEXT_PUBLIC_GET_PRODUCT_BY_SLUG,{
//     headers:{
//       'id':`${query.slug}`
//     }
//   }).then((x)=>x.data);
//   console.log(tourData)
//   return{
//     tourData,
//     id:tourData.result.id
//   }
// }