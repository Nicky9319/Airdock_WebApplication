import React from "react";

import HomePage from "./Views/Home Page/homePage";
import AgentPage from "./Views/Agent Page/agentPage";
import Navbar from "./components/navbar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Get the base URL from the import.meta.env (injected by Vite)
const baseUrl = import.meta.env.BASE_URL || "/";

function App() {
  // Wrap the routing in a separate component so useLocation can run inside the Router.
  return (
    <Router basename={baseUrl}>
      <AppInner />
    </Router>
  );
}

function AppInner() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agent/:agentId" element={<AgentPage />} />
      </Routes>
    </div>
  );
}

export default App;
