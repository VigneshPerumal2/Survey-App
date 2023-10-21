// src/App.js

import React from "react";
import "./App.css";
import SurveyComponent from "./components/SurveyComponent";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="App">
      {!isAuthenticated && (
        <button
          onClick={() => {
            console.log("Attempting to log in...");
            loginWithRedirect();
          }}
        >
          Log in
        </button>
      )}

      {isAuthenticated && (
        <>
          <SurveyComponent />
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button>
        </>
      )}
    </div>
  );
}

export default App;
