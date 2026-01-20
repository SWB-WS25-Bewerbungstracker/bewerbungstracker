import { Navigate } from "react-router-dom";
import keycloak from "../keycloak";

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
