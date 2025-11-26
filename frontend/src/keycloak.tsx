import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://localhost:5173/login",
 realm: "bt-realm",
 clientId: "bt-client",
});

export default keycloak;