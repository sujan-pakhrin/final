import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>

    <StrictMode>
      <ToastContainer />
      <App />
    </StrictMode>
  </AuthProvider>
    
  </BrowserRouter>
);
