import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { useState } from "react";
import { createTicket } from "../../redux/ticketSlice";
import toast from "react-hot-toast";
import useTicket from "../../hooks/useTickets";

function CreateTicket () {
    const auth = useSelector((state) => state.auth)
    const ticketState = useSelector((state) => state.tickets)
    // console.log("downloadedTickets", ticketState.downloadedTickets)
    // console.log("ticketList", ticketState.ticketList)
    // console.log("ticketDistribution", ticketState.ticketDistribution)
    const dispatcher = useDispatch()

    useTicket()
    const [ticket, setTicket] = useState({
        title: "",
        description: "",
        ticketPriority: 4,
        status: "open",
        clientName: auth.data.clientName,
    })
    // console.log("new Ticket status",ticket)


    async function onFormSubmit (e) {
        e.preventDefault()
        if(!ticket.title || !ticket.description) {
            toast.error("Title and description both are mandatory..")
            return;
        }
        const response = await dispatcher(createTicket(ticket))
        // console.log("response of newTicket", response)
        if(response.payload?.data) {
            setTicket({
                title: "",
                description: "",
                ticketPriority: 4,
                status: "open",
                clientName:auth.data.clientName,
            })
        }
    }

    function handleFormChange (e) {
        const {name, value} = e.target;
        setTicket({
            ...ticket,
            [name] : value,
        })
    }

    return (
        <HomeLayout>
            <div className="min-h-[50vh] mt-5 flex items-center justify-center">

            <form 
                onSubmit={onFormSubmit}
                className="min-w-[40rem] border p-20 border-sky-500 rounded-lg bg-sky-600"
            >

                <h1 className="text-4xl font-semibold text-white text-center">
                    Create new ticket
                </h1>

                <div className="form-control w-full my-4 mt-5">
                    <label className="label">
                        <span className="label-text text-black/80 font-semibold text-lg">What is title of the issue?</span>
                    </label>
                    <input 
                        value={ticket.title}
                        onChange={handleFormChange}
                        name="title"
                    type="text" placeholder="Type here" className="input input-bordered input-primary w-full bg-white text-black" />
                </div>

                <div className="form-control w-full my-4">
                    <label className="label">
                        <span className="label-text text-black/80 font-semibold text-lg">Please describe your issue?</span>
                    </label>
                    <textarea 
                        value={ticket.description}
                        onChange={handleFormChange}
                        name="description"
                        placeholder="Type here"
                        rows="8"
                        className="p-2 resize-none w-full rounded-md bg-white text-black" 
                    ></textarea>

                </div>

                <button className="btn bg-black w-full text-xl border-none text-white hover:text-white hover:bg-black/80 ">Submit</button>


            </form>

            </div>
        </HomeLayout>
    )
}

export default CreateTicket;