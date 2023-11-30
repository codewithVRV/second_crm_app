import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Singup from "../pages/auth/Signup";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard";

function MainRoute () {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Singup />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    )
}

export default MainRoute;