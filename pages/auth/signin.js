import dynamic from 'next/dynamic';
const CustomerLogin = dynamic(() => import('/Components/Layouts/CustomerLogin'), {
  loading: () => <div className='text-center'> <img src='/loader.svg' alt="Loader" /> </div>,
});

export default function SignIn() {
  return (
    <>
    <CustomerLogin providers={providers} signIn={signIn} />
    </>
  )
}
