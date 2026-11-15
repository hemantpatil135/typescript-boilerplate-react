import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import RequireAuth from "./routes/RequireAuth";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, component: Component, protected: isProtected }) => (
          <Route
            key={path}
            path={path}
            element={isProtected ? <RequireAuth><Component /></RequireAuth> : <Component />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
