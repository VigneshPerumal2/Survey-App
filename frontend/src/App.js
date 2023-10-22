// src/App.js

import React, { useState } from "react";
import "./App.css";
import SurveyComponent from "./components/SurveyComponent";
import AdminDashboard from "./components/AdminDashboard";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  TextField,
  Container,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function App() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  // Admin state and handlers
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLoginForm, setShowAdminLoginForm] = useState(false); // New state

  const handleAdminLogin = () => {
    if (adminUsername === "admin" && adminPassword === "admin123") {
      setAdminAuthenticated(true);
      setShowAdminLoginForm(false); // Hide form after successful login
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Survey Portal
        </Typography>
        <div className="App">
          {isAdminAuthenticated ? (
            <>
              <AdminDashboard />
              <Button onClick={handleAdminLogout}>Admin Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setShowAdminLoginForm(true)}>
                Admin Login
              </Button>
              {showAdminLoginForm && (
                <div>
                  <TextField
                    type="text"
                    placeholder="Admin Username"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                  />
                  <TextField
                    type="password"
                    placeholder="Admin Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  <Button onClick={handleAdminLogin}>Submit</Button>
                </div>
              )}
            </>
          )}
          <hr /> {/* Separator for clarity */}
          {!isAuthenticated && (
            <Button
              onClick={() => {
                console.log("Attempting to log in...");
                loginWithRedirect();
              }}
            >
              User Login
            </Button>
          )}
          {isAuthenticated && (
            <>
              <SurveyComponent />
              {/* <Button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                User Logout
              </Button> */}
              <Button
                onClick={() =>
                  logout({ returnTo: "https://surveyfitness.onrender.com/" })
                }
              >
                User Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default App;
