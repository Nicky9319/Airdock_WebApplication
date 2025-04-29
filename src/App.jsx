import React from "react";

import MainPage from "./Views/Main Page/mainPage";

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

      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
