import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTicket } from "../redux/ticketSlice";

function TicketDisplayModal ({ticket}) {
    const dispatcher = useDispatch()
    const [currentTicket, setCurrentTicket] = useState(ticket)

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
                <h3 className="font-bold text-lg">{ticket.title}</h3> 
                <textarea name="description" className="textarea textarea-primary" onChange={handleTicketChange} placeholder="Update ticket here..">{ticket.description}</textarea>
                <select name="ticketPriority" className="select w-full max-w-xs" onChange={handleTicketChange}>
                    <option disabled selected>Ticket Priority</option>
                    <option value={"1"} selected={currentTicket.ticketPriority == 1}>1</option>
                    <option value={"2"} selected={currentTicket.ticketPriority == 2}>2</option>
                    <option value={"3"} selected={currentTicket.ticketPriority == 3}>3</option>
                    <option value={"4"} selected={currentTicket.ticketPriority >= 4}>4</option>
                </select>
                <select name="status" className="select w-full max-w-xs" onChange={handleTicketChange}>
                    <option disabled selected>Ticket status</option>
                    <option value={"open"} selected={currentTicket.status == "open"}>open</option>
                    <option value={"inProgress"} selected={currentTicket.status == "inProgress"}>inProgress</option>
                    <option value={"onHold"} selected={currentTicket.status == "onHold"}>onHold</option>
                    <option value={"resolved"} selected={currentTicket.status == "resolved"}>resolved</option>
                    <option value={"cancelled"} selected={currentTicket.status == "cancelled"}>cancelled</option>
                </select>
                <div className="modal-action">
                <form method="dialog">
                    <button onClick={handleUpdateTicket} className="bg-indigo-700 text-white px-2 py-1 font-semibold rounded-md mx-3 hover:bg-indigo-500">Update Ticket</button>
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default TicketDisplayModal;