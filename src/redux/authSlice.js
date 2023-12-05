import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";


const initialState = {
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || undefined,
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("isLoggedIn") || false
}

export const login = createAsyncThunk("/auth/login", async (data) =>{
    try{
        const response =  axiosInstance.post('auth/signin', data)
        toast.promise(response, {
            loading: "You are logining..",
            success: "Successfully login",
            error : "Something Went wrong, Try again.."
        })
        return await response;
    }
    catch (error) {
        toast.error(error.message)
        console.log("error from login asyncThunk : ->", error)
    }
})

export const signup = createAsyncThunk("/auth/signup", async (data) => {
    try{
        const response =  axiosInstance.post('auth/signup', data)
        toast.promise(response, {
            loading: "Form is submitting..",
            success: "Successfully signed up",
            error : "Something Went wrong, Try again.."
        })
        return await response;
    }
    catch (error) {
        console.log("error from singup asyncThunk : ->", error)

    }
})
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogout: (state, action) => {
            localStorage.clear();
            state.role = "";
            state.data = undefined;
            state.token = "";
            state.isLoggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            if(!action.payload) return;
            state.isLoggedIn = (action.payload?.data?.token != undefined);
            state.data = action.payload?.data?.userData;
            state.token = action.payload?.data?.token;
            state.role = action.payload?.data?.userData?.userType;
            localStorage.setItem("role", action.payload?.data?.userData?.userType)
            localStorage.setItem("isLoggedIn", (action.payload?.data?.token != undefined));
            localStorage.setItem("data", JSON.stringify(action.payload?.data?.userData))
            localStorage.setItem("token", action.payload?.data?.token)
        })
    }
});
export const { userLogout } = authSlice.actions;
export default authSlice.reducer;