// Code: Main App component
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authentication } from "@/pages/authentication";
import "./App.css";
import Home from "./pages/home";
import { Toaster } from "./components/ui/common/toaster";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
