import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Singup from "../pages/auth/Signup";

function MainRoute () {
    return (
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Singup />}/>
        </Routes>
    )
}

export default MainRoute;