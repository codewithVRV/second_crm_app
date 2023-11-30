import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../layouts/HomeLayout";
import { useEffect } from "react";
import { getAllTicketsForTheUser } from "../redux/ticketSlice";
import useTicket from "../hooks/useTickets";

function Dashboard () {

    const [ticketstate] = useTicket()

    return (
        <HomeLayout>

        </HomeLayout>
    )
}

export default Dashboard;