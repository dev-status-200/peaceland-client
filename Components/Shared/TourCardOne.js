import React, { useEffect } from 'react';
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
        onClick={()=>{
            if(!info){
                router.push(`/product?id=${tour.id}`)
            }
        }}
        style={{border:'1px solid grey'}}
    >
        <div style={{width:'100%' , position:'relative', left:0, top:0}}>
        <img src={tour.main_image} className="filter" style={{width:'100%', height:height}} alt='Tour' />
        {info &&
        <>
        <div className='mt-3 px-3'>
            <div style={{fontSize:font, fontWeight:500}}>
                {info && 
                    <FaMapMarkerAlt size={15} style={{position:'relative', bottom:2}} />
                }
                {" "}
                <span>{tour.title.slice(0, 28)}</span>
            </div>
            <div className='full-overlay-line'></div>
            <div style={{width:'120%'}}>
                <IoStar color='green' style={{marginRight:'1%', fontSize:'90%'}} />
                <IoStar color='green' style={{marginRight:'1%', fontSize:'90%'}} />
                <IoStar color='green' style={{marginRight:'1%', fontSize:'90%'}} />
                <IoStar color='green' style={{marginRight:'1%', fontSize:'90%'}} />
                <IoStar color='green' style={{marginRight:'1%', fontSize:'90%'}} />
                <span className='mx-1' style={{fontSize:15, fontWeight:300, whiteSpace:'nowrap'}}>{"("}4 Reviews{")"}</span>
            </div>
        </div>
        </>
        }
        </div>
        {info &&
        <div className="px-4 pb-2">
            <div className='text-end'>
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

export default TourCardOne