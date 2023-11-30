import { useDispatch, useSelector } from "react-redux"
import { getAllTicketsForTheUser } from "../redux/ticketSlice"
import { useEffect } from "react"

function useTicket () {
    const authState = useSelector((state) => state.auth)
    const ticketsState = useSelector((state) => state.tickets)
   
    const dispatcher = useDispatch()

    async function loadAllTickets () {
        await dispatcher(getAllTicketsForTheUser())
        // console.log("response of alltickets",response)
    }

    useEffect(() => {
        loadAllTickets()
    }, [authState.token])

    return [ticketsState]
}

export default useTicket;