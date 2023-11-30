import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    ticketList: [],
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTicketsForTheUser.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            state.ticketList = action?.payload?.data?.result;
        })
    }
});


export default ticketSlice.reducer;