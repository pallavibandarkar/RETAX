import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateOrganization from "./pages/CreateOrg";
import Dashboard from "./pages/Dashboard";
import CreateTeam from "./pages/CreateTeam";
import Allusers from "./pages/Allusers";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createOrg/:id" element={<CreateOrganization />} />
        <Route path="/createTeam/:id" element={<CreateTeam />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/allUsers" element={<Allusers />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
