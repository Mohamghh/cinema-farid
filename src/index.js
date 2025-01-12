import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddFilm from './pages/AddFilm';
import Movies from './pages/Movies';
import Homepage from './pages/Homepage';
import AddSalle from './pages/AddSalle';
import AddSeance from './pages/AddSeance';
import Salles from './pages/Salles';
import Seances from './pages/Seances';
import Payement from './pages/Payement';
import Receipt from './pages/Receipt';
import { KeycloakProvider } from './keycloakContext'; // Import the Keycloak provider



const router = createBrowserRouter([
   {
  path: "/",
  element: <App />,
  
  children: [

    {
      path: "/",
      element: <Homepage />
      },

    {
    path: "/Movies",
    element: <Movies />
    },

    {
      path: "/Salles",
      element: <Salles />
      },

    {
      path: "/AddFilm",
      element: <AddFilm />
      },

      {
        path: "/AddSeance",
        element: <AddSeance />
        },

        {
          path: "/AddSalle",
          element: <AddSalle />
          },  

          {
            path: "/Seances",
            element: <Seances />
            },
            
            {
              path: "/Payement",
              element: <Payement />
              }, 
              
              {
                path: "/Receipt",
                element: <Receipt />
                },      
  ]
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <KeycloakProvider> {/* Wrapping the entire app with KeycloakProvider */}
      <RouterProvider router={router} />
    </KeycloakProvider>
  </React.StrictMode>
);
reportWebVitals();
