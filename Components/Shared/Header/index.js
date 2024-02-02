import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';
import Cookies from "js-cookie";

const Header = () => {

  const [user, setUser] = useState({
    loggedIn:false,
    name:"",
    email:"",
    picture:""
  });

  useEffect(() => {
    getValues();
  }, [])

  async function getValues(){
    let token = await Cookies.get("token");
    if(token){
      setUser({...JSON.parse(token), loggedIn:true});
    }
  }

  return (
  <>
    <div className="desktop">
      <Desktop user={user} />
    </div>
    <div className="mobile">
      <Mobile user={user} />
    </div>
  </>
)}

export default React.memo(Header)