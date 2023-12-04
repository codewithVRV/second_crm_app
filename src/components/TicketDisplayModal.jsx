function TicketDisplayModal ({ticket}) {
    // console.log("ticked", ticket)
    return (
        <dialog id="my_ticket_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{ticket.title}</h3>
                {/* <p className="py-4">{ticket.description}</p> */}
                <textarea className="textarea textarea-primary" placeholder="Update ticket here..">{ticket.description}</textarea>
                <select className="select w-full max-w-xs">
                    <option disabled selected>Ticket Priority</option>
                    <option value={"1"} selected={ticket.ticketPriority == 1}>1</option>
                    <option value={"2"} selected={ticket.ticketPriority == 2}>2</option>
                    <option value={"3"} selected={ticket.ticketPriority == 3}>3</option>
                    <option value={"4"} selected={ticket.ticketPriority >= 4}>4</option>
                </select>
                <select className="select w-full max-w-xs">
                    <option disabled selected>Ticket status</option>
                    <option value={"open"} selected={ticket.status == "open"}>open</option>
                    <option value={"inProgress"} selected={ticket.status == "inProgress"}>inProgress</option>
                    <option value={"onHold"} selected={ticket.status == "onHold"}>onHold</option>
                    <option value={"resolved"} selected={ticket.status == "resolved"}>resolved</option>
                    <option value={"cancelled"} selected={ticket.status == "cancelled"}>cancelled</option>
                </select>
                <div className="modal-action">
                <form method="dialog">
                    <button className="bg-indigo-700 text-white px-2 py-1 font-semibold rounded-md mx-3 hover:bg-indigo-500">Update Ticket</button>
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default TicketDisplayModal;