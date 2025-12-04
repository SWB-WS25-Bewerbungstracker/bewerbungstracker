import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://authentication:7080",
 realm: "bt-realm",
 clientId: "bt-client",
});


export default keycloak;