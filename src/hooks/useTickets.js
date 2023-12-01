import { useDispatch, useSelector } from "react-redux"
import { filterTickets, getAllTicketsForTheUser } from "../redux/ticketSlice"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

function useTicket () {
    const authState = useSelector((state) => state.auth)
    const ticketsState = useSelector((state) => state.tickets)
    const [searchParams] = useSearchParams()

   
    const dispatcher = useDispatch()

    async function loadAllTickets () {
        await dispatcher(getAllTicketsForTheUser())
        if(searchParams.get("status")){
            dispatcher(filterTickets({status:searchParams.get("status")}))
        }
    }

    useEffect(() => {
        loadAllTickets()
    }, [authState.token, searchParams.get("status")])

    return [ticketsState]
}

export default useTicket;