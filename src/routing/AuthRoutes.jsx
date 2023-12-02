import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

function AuthRoutes ({allowListedRole}) {
    const {role} = useSelector((state) => state.auth)
    return (
        <>
            {allowListedRole.find((givenRole) => givenRole === role) ? <Outlet/> : <div>Denied</div>} 
        </>
    )
}

export default AuthRoutes;