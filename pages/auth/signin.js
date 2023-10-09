import CustomerLogin from "../../Components/Layouts/CustomerLogin";

export default function SignIn() {
  return (
    <>
    <CustomerLogin providers={providers} signIn={signIn} />
    </>
  )
}
