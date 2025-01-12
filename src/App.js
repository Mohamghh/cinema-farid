import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useKeycloak } from './keycloakContext'; // Import the Keycloak context hook

const stripePromise = loadStripe("pk_test_51QQxyrAwRzCvsPAUKkNggCYLRVJ6jjCk3giZDutzokRpt4qssx81ZuvF2KPa6RuGVAKzqT5xzddhPgAymNqdk7dF00fMDMp89m");

function App() {
  const { keycloak, authenticated } = useKeycloak(); // Get Keycloak and authentication status from context
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (authenticated && keycloak) {
      // Check roles if authenticated
      const roles = keycloak.tokenParsed?.realm_access?.roles || [];
      setRoles(roles);

      if (roles.includes("admin")) {
        console.log("User is an admin");
      } else if (roles.includes("Client")) {
        console.log("User is a client");
      } else {
        console.log("User has no specific role");
      }
    }
  }, [authenticated, keycloak]);

  // Wait for keycloak initialization before rendering content
  if (!keycloak) {
    return <div>Initializing Keycloak...</div>;
  }

  if (!authenticated) {
    return <div>Authenticating with Keycloak...</div>;
  }

  return (
    <div>
      <Header />
      <Elements stripe={stripePromise}>
        <Outlet />
      </Elements>
      <Footer />
    </div>
  );
}

export default App;
