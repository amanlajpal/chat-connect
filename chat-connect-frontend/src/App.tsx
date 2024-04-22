import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authentication } from "@/pages/authentication";
import "./App.css";
import { Toaster } from "./components/ui/common/toaster";
import { useSelector } from "react-redux";
import GetUserFromToken from "./components/ui/auth/get-user-from-token";
import ErrorPage from "./pages/errorPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";

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
            errorElement={<ErrorPage />}
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
            errorElement={<ErrorPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
