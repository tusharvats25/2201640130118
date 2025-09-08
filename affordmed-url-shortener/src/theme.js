import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2E7D32" },
    secondary: { main: "#1565C0" }
  },
  shape: { borderRadius: 16 }
});

export default theme;