import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://localhost:7080",
 realm: "bt-realm",
 clientId: "bt-client",
});


export default keycloak;