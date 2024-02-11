import React from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';

const Visa = () => {
  return (
    <>
    <div className="desktop">
        <Desktop />
    </div>
    <div className="mobile">
        <Mobile/>
    </div>
    </>
  )
}

export default React.memo(Visa)