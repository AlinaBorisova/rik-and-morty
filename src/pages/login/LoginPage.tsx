import { useLocation, useNavigate } from "react-router-dom";
import { Signin, type SigninForm } from "@/features/auth";
import { useAuth } from "@/features/auth";
import { useEffect } from "react";

interface LocationState {
  from?: {
    pathname: string;
  };
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const auth = useAuth();

  const from = state?.from?.pathname || '/';

  useEffect(() => {
    if (auth?.user) {
      navigate(from, { replace: true });
    }
  }, [auth?.user, navigate, from]);

  const handleEnter = (inputs: SigninForm) => {
    auth?.signin(inputs.email, () => {
      navigate(from, { replace: true });
    });
  };

  if (auth?.user) return null;
  
  return (
    <>
      <Signin onSubmit={handleEnter}/>
    </>
  )
}