import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    downloadedTickets: [],
    ticketList: [],
    ticketDistribution: {
        open: 0,
        inProgress: 0,
        resolved: 0,
        onHold: 0,
        cancelled: 0,
    }
}

export const getAllTicketsForTheUser = createAsyncThunk ("tickets/getAllTicketsForTheUser", async () => {
    try{
        const response =  axiosInstance.get("getMyAssignedTickets", {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        toast.promise(response, {
            loading: "Fetching all Tickets belonging to you",
            success: "Successfully loaded all the tickets",
            error: "Something Went Wrong Try Again.."
            
        })
        return await response;
        
    }
    catch(error) {
        console.log("Error from ticketslice getallTickets", error)
    }
})

export const updateTicket = createAsyncThunk ("tickets/updateTicket", async (ticket) => {
    try{
        const response =  axiosInstance.patch(`ticket/${ticket._id}`, 
            ticket, 
        {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        toast.promise(response, {
            loading: "Updating the ticket",
            success: "Successfully updated the tickets",
            error: "Something Went Wrong Try Again.."
            
        })
        return await response;
        
    }
    catch(error) {
        console.log("Error from ticketslice getallTickets", error)
    }
})

export const createTicket = createAsyncThunk ("tickets/createTicket", async (ticket) => {
    try{
        const response =  axiosInstance.post(`ticket`, 
            ticket, 
        {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        toast.promise(response, {
            loading: "Creating the ticket",
            success: "Successfull created the ticket",
            error: "Something Went Wrong Try Again.."
            
        })
        return await response;
        
    }
    catch(error) {
        console.log("Error from ticketslice getallTickets", error)
    }
})
const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        filterTickets: (state, action) =>{
            state.ticketList = state.downloadedTickets.filter((ticket) => ticket.status === action.payload.status)
        },
        // resetTicketList: (state) => {
        //     state.ticketList = state.downloadedTickets;
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTicketsForTheUser.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            state.ticketList = action?.payload?.data?.result;
            state.downloadedTickets = action?.payload?.data?.result;
            const tickets = action?.payload?.data?.result;
            state.ticketDistribution =  {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0,
            }
            tickets.forEach((ticket) => {
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1
            })
        })
        .addCase(updateTicket.fulfilled, (state, action) => {
            const updatedTicket = action.payload.data.result;
            state.ticketList = state.ticketList.map((ticket) => {
                if(ticket._id === updatedTicket._id) return updatedTicket;
                return ticket;
            })
            state.ticketDistribution = state.ticketDistribution.map((ticket) => {
                if(ticket._id === updatedTicket._id) return updatedTicket;
                return ticket;
            })
            state.ticketDistribution =  {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0,
            }
            state.downloadedTickets.forEach((ticket) => {
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1
            })

        })
        .addCase(createTicket.fulfilled, (state, action) => {
            if(action?.payload?.data == undefined) return;
            const newTicket = action.payload.data;
            state.downloadedTickets.push(newTicket)
            state.ticketList = state.downloadedTickets;
            state.ticketDistribution =  {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0,
            }
            state.downloadedTickets.forEach((ticket) => {
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1
            })
        })
    }
});

export const { filterTickets } = ticketSlice.actions;
export default ticketSlice.reducer;