import React, { useEffect, useState } from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';
import Cookies from "js-cookie";
import jwtDecode from 'jwt-decode';

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
    token?setUser({...jwtDecode(token), loggedIn:true}):null;
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