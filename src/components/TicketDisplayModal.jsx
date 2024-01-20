import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTicket } from "../redux/ticketSlice";

function TicketDisplayModal ({ticket}) {
    const dispatcher = useDispatch()
    const autshState = useSelector((state) => state.auth)
    console.log("authState from ticket modal", autshState.role)
    const [currentTicket, setCurrentTicket] = useState(ticket)
    // console.log("newTicket", currentTicket)

    function handleTicketChange (e) {
        const {name, value} = e.target;
        setCurrentTicket({
            ...currentTicket, 
            [name] : value,
        })
    }

   
    async function handleUpdateTicket () {
        await dispatcher(updateTicket(currentTicket))
    }


   
    return (
        <dialog id="my_ticket_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold mb-2 text-center text-2xl">{ticket.title}</h3> 
                <textarea name="description" className="textarea textarea-warning" onChange={handleTicketChange} placeholder="Update ticket here..">{ticket.description}</textarea>
                <select name="ticketPriority" className="select textarea-warning w-full max-w-xs" onChange={handleTicketChange}>
                    <option disabled selected>Select Ticket Priority</option>
                    <option value={"1"} selected={currentTicket.ticketPriority == 1}>1</option>
                    <option value={"2"} selected={currentTicket.ticketPriority == 2}>2</option>
                    <option value={"3"} selected={currentTicket.ticketPriority == 3}>3</option>
                    <option value={"4"} selected={currentTicket.ticketPriority >= 4}>4</option>
                </select>
                <select name="status" className="select textarea-warning mt-2 mb-2 w-full max-w-xs" onChange={handleTicketChange}>
                    <option disabled selected>Select Ticket status</option>
                    <option value={"open"} selected={currentTicket.status == "open"}>open</option>
                    <option value={"inProgress"} selected={currentTicket.status == "inProgress"}>inProgress</option>
                    <option value={"onHold"} selected={currentTicket.status == "onHold"}>onHold</option>
                    <option value={"resolved"} selected={currentTicket.status == "resolved"}>resolved</option>
                    <option value={"cancelled"} selected={currentTicket.status == "cancelled"}>cancelled</option>
                </select>
                <div className="modal-action ">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    
                    {(autshState.role == "admin") ? <button onClick={handleUpdateTicket} className="btn bg-black text-white hover:text-white hover:bg-black/80  font-semibold  mx-3">Update Ticket</button> : <button onClick={handleUpdateTicket} className="btn bg-black text-white hover:text-white hover:bg-black/80  font-semibold  mx-3 btn-disabled">Not Allowed</button>}
                    <button className="btn bg-black text-white hover:text-white hover:bg-black/80 ">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default TicketDisplayModal;