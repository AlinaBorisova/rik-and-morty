import { Signin, type SigninForm } from "../../components/SignIn/SignIn";

export function LoginPage() {

  const handleEnter = (inputs: SigninForm) => {
    console.log("Отправлено", inputs);
    alert(`Welcome, ${inputs.email}`)
  }
  
  return (
    <>
      <Signin onSubmit={handleEnter}/>
    </>
  )
}