import React, { useState } from "react";
import "./App.css";
import SurveyComponent from "./components/SurveyComponent";
import AdminDashboard from "./components/AdminDashboard";
import { useAuth0 } from "@auth0/auth0-react";
import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Container,
  Typography,
  CssBaseline,
  Paper,
  Grid,
  AppBar,
  Toolbar,
} from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h5: {
      fontWeight: 700,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
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
  adminLogin: {
    marginTop: theme.spacing(2),
  },
  navbar: {
    marginBottom: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  // Admin state and handlers
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLoginForm, setShowAdminLoginForm] = useState(false);

  const handleAdminLogin = () => {
    if (adminUsername === "admin" && adminPassword === "admin123") {
      setAdminAuthenticated(true);
      setShowAdminLoginForm(false);
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
  };

  const handleUserLogout = () => {
    logout({ returnTo: "https://surveyfitness.onrender.com/" });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Fitness Survey
            </Typography>
            {(isAuthenticated || isAdminAuthenticated) && (
              <Button
                color="inherit"
                onClick={isAuthenticated ? handleUserLogout : handleAdminLogout}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Paper className={classes.paper} elevation={3}>
          <Typography component="h1" variant="h5">
            Fitness Survey Portal
          </Typography>
          <div className="App">
            {isAdminAuthenticated && !isAuthenticated ? (
              <>
                <AdminDashboard />
                {/* Admin Logout button is now in the navbar */}
              </>
            ) : (
              <>
                {!isAuthenticated && !isAdminAuthenticated && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setShowAdminLoginForm(true)}
                    className={classes.adminLogin}
                  >
                    Admin Login
                  </Button>
                )}
                {showAdminLoginForm && (
                  <Grid container spacing={2} className={classes.form}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Admin Username"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Admin Password"
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleAdminLogin}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </>
            )}
            <hr /> {/* Separator for clarity */}
            {!isAuthenticated && !isAdminAuthenticated && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  console.log("Attempting to log in...");
                  loginWithRedirect();
                }}
                className={classes.submit}
              >
                User Login
              </Button>
            )}
            {isAuthenticated && (
              <>
                <SurveyComponent />
                {/* User Logout button is now in the navbar */}
              </>
            )}
          </div>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
