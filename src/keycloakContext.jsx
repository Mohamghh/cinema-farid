import React, { createContext, useContext, useState, useEffect } from "react";
import Keycloak from "keycloak-js";

// Create a Context for Keycloak
const KeycloakContext = createContext();

export const KeycloakProvider = ({ children }) => {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const keycloakInstance = new Keycloak("/keycloak.json"); // Or you can configure Keycloak manually

    keycloakInstance
      .init({ onLoad: "login-required" })
      .then((auth) => {
        setKeycloak(keycloakInstance);
        setAuthenticated(auth);
      })
      .catch(() => setAuthenticated(false));

    return () => {
      keycloakInstance.logout();
    };
  }, []);

  return (
    <KeycloakContext.Provider value={{ keycloak, authenticated }}>
      {children}
    </KeycloakContext.Provider>
  );
};

// Custom hook to access Keycloak context
export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error("useKeycloak must be used within a KeycloakProvider");
  }
  return context;
};
