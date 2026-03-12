import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth || auth.user === null) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}