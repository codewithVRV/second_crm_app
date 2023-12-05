import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Singup from "../pages/auth/Signup";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard";
import AuthRoutes from "./AuthRoutes";
import ListAllUsers from "../pages/users/ListAllUsers";
import CreateTicket from "../pages/tickets/CreateTicket";

function MainRoute () {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Singup />}/>
            <Route path="/ticket/create" element={<CreateTicket />}/>
            <Route element={<AuthRoutes allowListedRole={["admin", "engineer"]}/>}>
                <Route path="/users" element={<ListAllUsers />}/>
            </Route>
            <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    )
}

export default MainRoute;