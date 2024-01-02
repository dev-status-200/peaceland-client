import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import { HiArrowLongRight } from 'react-icons/hi2';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const TourCardOne = ({tour, height, info, font}) => {
    
    const router = useRouter();
    const conversion = useSelector((state) => state.currency.conversion);

  return (
    <div className='hover-shadow'
        onClick={()=>router.push(`/product?id=${tour.id}`)}
        style={{border:'1px solid grey', borderRadius:8}}
    >
        <div style={{width:'100%' , position:'relative', left:0, top:0}}>
        <img src={tour.main_image} className="filter" style={{width:'100%', height:height, borderRadius:'8px 8px 0px 0px'}} alt='Tour' />
        {info &&
        <>
        <div className='my-2 px-3'>
            <div style={{fontSize:font}} className='blue-txt'>
                <span className='fs-19 fw-600'>{tour.title.slice(0, 30)}</span>
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
        <div className="px-4 pb-2">
            <div className='text-end mt-2'>
            Starting From
            </div>
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