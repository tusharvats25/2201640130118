import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppRoutes from "./routes";
import { AppBar, Toolbar, Typography, Container, Link, Box } from "@mui/material";
import { Log } from "./lib/logger";

export default function App() {
  React.useEffect(() => {
    Log.info("middleware", "app mounted");
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AffordMed URL Shortener
          </Typography>
          <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ mr: 2 }}>
            Home
          </Link>
          <Link component={RouterLink} to="/stats" color="inherit" underline="none">
            Stats
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} disableGutters>
        <AppRoutes />
      </Container>
    </Box>
  );
}