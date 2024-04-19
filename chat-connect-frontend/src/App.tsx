// Code: Main App component
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authentication } from "@/pages/authentication";
import "./App.css";
import Home from "./pages/home";
import { Toaster } from "./components/ui/common/toaster";
import { useSelector } from "react-redux";
import GetUserFromToken from "./components/ui/auth/get-user-from-token";

function App() {
  const authentication = useSelector(
    (state: any) => state?.authentication?.value
  );
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !authentication.isAuthenticated &&
              authentication.isTokenVerified ? (
                <Authentication />
              ) : (
                <GetUserFromToken />
              )
            }
          />
          <Route
            path="/home"
            element={
              authentication.isAuthenticated &&
              authentication.isTokenVerified ? (
                <Home />
              ) : (
                <GetUserFromToken />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
