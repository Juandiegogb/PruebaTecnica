import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { ContextProvider } from "./context/userContext";
import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/Admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
