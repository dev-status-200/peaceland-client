import Desktop from './Desktop';
import Mobile from './Mobile';
import React from 'react';

const Home = () => {

  return (
    <div className=''>
      <div className="desktop" >
        <Desktop />
      </div>
      <div className="mobile" >
        <Mobile />
      </div>
    </div>
  )
}

export default React.memo(Home)