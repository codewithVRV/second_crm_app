import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../redux/authSlice'
import ticketsliceReducer from '../redux/ticketSlice'
const store = configureStore({
    reducer:{
        auth: authSliceReducer,
        tickets:ticketsliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
    devTools: true,
})

export default store;