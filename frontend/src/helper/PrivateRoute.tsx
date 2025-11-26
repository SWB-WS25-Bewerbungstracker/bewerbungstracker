import { Navigate } from "react-router-dom";
import keycloak from "../keycloak";
import type { JSX } from "react/jsx-runtime";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  if (!keycloak.authenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;