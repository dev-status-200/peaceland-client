import CustomerLogin from '/Components/Layouts/CustomerLogin';
import { useGoogleLogin } from '@react-oauth/google';

const auth = () => {
  return (
    <CustomerLogin useGoogleLogin={useGoogleLogin} />
  )
}

export default auth