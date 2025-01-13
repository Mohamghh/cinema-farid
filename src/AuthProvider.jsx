import React, { createContext, useState, useEffect } from "react";
import Keycloak from "keycloak-js";

// Configuration de Keycloak
const keycloak = new Keycloak({
  url: "http://localhost:8080", // URL du serveur Keycloak
  realm: "cinazone", // Nom du Realm
  clientId: "client-frontend", // ID du client
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [keycloakInstance, setKeycloakInstance] = useState(null);

  useEffect(() => {
    keycloak
      .init({ onLoad: "login-required" }) // Redirige l'utilisateur pour qu'il se connecte
      .then((auth) => {
        setAuthenticated(auth);
        setKeycloakInstance(keycloak);

        if (auth) {
          console.log("Keycloak Authenticated");
          localStorage.setItem("token", keycloak.token);
          localStorage.setItem("refreshToken", keycloak.refreshToken);
        } else {
          console.log("Keycloak Authentication failed.");
        }
      })
      .catch((err) => console.error("Keycloak init error:", err));
  }, []);

  const logout = () => {
    if (keycloak) {
      keycloak.logout({
        redirectUri: "http://localhost:3000", // URL vers laquelle rediriger après la déconnexion
      });
    }
  };

  if (!authenticated) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Authenticating...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        keycloak: keycloakInstance,
        logout, // Fournit la méthode logout au contexte
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
