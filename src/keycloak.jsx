import Keycloak from "keycloak-js";

// Keycloak configuration
const keycloak = new Keycloak({
  url: "http://localhost:8080", // Keycloak server URL
  realm: "CinaZone",           // Your realm name
  clientId: "cinema-frontend", // Client ID created in Keycloak
});

export default keycloak;
