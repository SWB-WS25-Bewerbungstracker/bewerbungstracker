import { useKeycloak } from "@react-keycloak/web";
// import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children?: ReactNode }) => {
    const { keycloak } = useKeycloak();

    const isLoggedIn = !!keycloak?.authenticated;

    return isLoggedIn ? <>{children}</> : null;
};