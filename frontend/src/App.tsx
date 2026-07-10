import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import { Login } from "./pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  Home  from "./pages/Home"
import { Router } from "./routes/Router"; 

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
