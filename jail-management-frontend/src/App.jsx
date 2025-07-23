import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import PrisonerPage from "./pages/PrisonerPage";
import PrisonerAddForm from "./PrisonerComponents/AddPrisonerFrom";
import StaffPage from "./pages/StaffPage";
import StaffAddForm from "./StaffComponents/AddStaffForm";
import VisitorPage from "./pages/VisitorPage";
import VisitorAddForm from "./VisitorComponents/VisitorAddForm";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/prisoner" element={<PrisonerPage />} />
        <Route path="/prisoner/add" element={<PrisonerAddForm />} />
        <Route path="/prisoner/update/:id" element={<PrisonerAddForm />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff/add" element={<StaffAddForm />} />
        <Route path="/staff/update/:id" element={<StaffAddForm />} />
        <Route path="/visitor" element={<VisitorPage />} />
        <Route path="/visitor/add" element={<VisitorAddForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;