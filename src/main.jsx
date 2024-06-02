import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Operations from "./Components/Operations.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/operations" element={<Operations/>} />
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
