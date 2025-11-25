import Keycloak from "keycloak-ts";
const keycloak = new Keycloak({
 url: "http://localhost:8080/auth",
 realm: "bt-realm",
 clientId: "bt-client",
});

export default keycloak;