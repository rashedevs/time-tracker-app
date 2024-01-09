import "./App.css";
// import { getDatabase, ref, set } from "firebase/database";
// import { app } from "./firebase.init";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
