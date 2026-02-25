import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";


export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  if (!auth || auth.user === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
}