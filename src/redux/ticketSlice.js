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
const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        filterTickets: (state, action) =>{
            // console.log("action", action)
            state.ticketList = state.downloadedTickets.filter((ticket) => ticket.status = action.payload.status)
        }
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
    }
});

export const { filterTickets } = ticketSlice.actions;
export default ticketSlice.reducer;