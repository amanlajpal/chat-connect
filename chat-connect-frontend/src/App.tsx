// Code: Main App component
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authentication } from "@/pages/authentication";
import "./App.css";
import Home from "./pages/home";

function App() {
  return (
    <>
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
