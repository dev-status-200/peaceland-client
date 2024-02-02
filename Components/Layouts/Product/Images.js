import React, { useEffect } from 'react';

import useWindowSize from '/functions/useWindowSize';

const Images = ({mainImage, setMainImage, tour, detail}) => {

  const size = useWindowSize();

  useEffect(() => {
    setMainImage(tour.main_image);
  }, [detail])
  
  return (
  <>
    <img className='my-3' src={mainImage} style={{borderRadius:size.width<500?10:8, width:'100%'}} alt="Tour" />
  </>
  )
}
export default React.memo(Images)