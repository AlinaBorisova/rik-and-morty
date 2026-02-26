import { useLocation, useNavigate } from "react-router-dom";
import { Signin, type SigninForm } from "../../components/SignIn/SignIn";
import { useAuth } from "../../context/AuthProvider";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  console.log(location);
  const from = location.state?.from?.pathname || '/';

  const handleEnter = (inputs: SigninForm) => {
    console.log("Отправлено", inputs);
    auth?.signin(inputs.email, () => {
      navigate(from, { replace: true });
    });
  }
  
  return (
    <>
      <Signin onSubmit={handleEnter}/>
    </>
  )
}