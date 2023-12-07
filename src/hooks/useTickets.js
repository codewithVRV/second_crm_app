import { useDispatch, useSelector } from "react-redux"
import { filterTickets, getAllCreatedTicketsForTheUser, getAllTicketsForTheUser } from "../redux/ticketSlice"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

function useTicket () {
    const authState = useSelector((state) => state.auth)
    const ticketsState = useSelector((state) => state.tickets)
    const [searchParams] = useSearchParams()

   
    const dispatcher = useDispatch()

    async function loadAllTickets () {
        // if(ticketsState.downloadedTickets.length == 0) {

        if(authState.role === "customer") {
            await dispatcher(getAllCreatedTicketsForTheUser())
        }
        else{
            await dispatcher(getAllTicketsForTheUser())
        }
            

        // }
        if(searchParams.get("status")){
            dispatcher(filterTickets({status:searchParams.get("status")}))
        }
        // else {
        //     dispatcher(resetTicketList());
        // }
        
    }

    useEffect(() => {
        loadAllTickets()
    }, [searchParams.get("status")])

    return [ticketsState]
}

export default useTicket;