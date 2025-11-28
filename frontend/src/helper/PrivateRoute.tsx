import { Navigate } from "react-router-dom";
import keycloak from "../keycloak";
import type { JSX } from "react/jsx-runtime";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  if (!keycloak.authenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;