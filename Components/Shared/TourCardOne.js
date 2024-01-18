import React from 'react';
import { ImLocation2 } from "react-icons/im";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const TourCardOne = ({tour, height, info, font}) => {
    
    const router = useRouter();
    const conversion = useSelector((state) => state.currency.conversion);

  return (
    <div className='hover-shadow'
        onClick={()=>router.push(`/product/${tour.slug}`)}
        style={{border:'1px solid grey', borderRadius:8}}
    >
        <div style={{width:'100%' , position:'relative', left:0, top:0}}>
        <img src={tour.main_image} className="filter" style={{width:'100%', height:140, borderRadius:'8px 8px 0px 0px'}} alt='Tour' />
        {info &&
        <>
        <div className='my-2'>
            <div className='desktop-card-title'>
                {tour.title}
            </div>
            <div className='grey-txt-2 px-2' style={{lineHeight:1, fontSize:'85%'}}>
                <ImLocation2 style={{position:'relative', bottom:2}} /> {tour.city}
            </div>
            <div className='full-overlay-line'></div>
            <div style={{width:'120%'}}>
                {/* <IoStar color='green' style={{marginRight:'1%', fontSize:'90%'}} />
                <IoStar color='green' style={{marginRight:'1%', fontSize:'90%'}} />
                <IoStar color='green' style={{marginRight:'1%', fontSize:'90%'}} />
                <IoStar color='green' style={{marginRight:'1%', fontSize:'90%'}} />
                <IoStar color='green' style={{marginRight:'1%', fontSize:'90%'}} /> */}
                {/* <span className='mx-1' style={{fontSize:15, fontWeight:300, whiteSpace:'nowrap'}}>{"("}4 Reviews{")"}</span> */}
            </div>
        </div>
        </>
        }
        </div>
        <hr className='my-0' />
        {info &&
        <div className="px-3 pt-2">
            <div className='text-end' style={{lineHeight:1}}> Starting From </div>
            <div className='text-end'>
                <h4>
                    <span className='mx-2'>
                        {(tour.TourOptions[0].adult_price*conversion.rate).toFixed(2)}
                    </span>
                    <span>{conversion.currency}</span>
                </h4>
            </div>
        </div>
        }
    </div>
  )
}

export default React.memo(TourCardOne)