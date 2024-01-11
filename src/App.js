import "./App.css";
// import { getDatabase, ref, set } from "firebase/database";
// import { app } from "./firebase.init";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/RequireAuth/RequireAuth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
