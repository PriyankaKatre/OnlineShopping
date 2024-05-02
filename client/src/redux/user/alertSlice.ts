import { createSlice } from "@reduxjs/toolkit";

export interface AlertArray {
    id: string;
    message : string;
    status : string;
}

export interface AlertState {
    alerts : AlertArray[]
}

let initialState:AlertState = {
    alerts : [] as AlertArray[]
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert(state, action) {
            state.alerts.unshift(action.payload)
        },
        removeAlert(state, action) {
            const proxyToActuallArray = JSON.parse(JSON.stringify(state.alerts))
            let updatedAlerts = proxyToActuallArray.filter((alert: AlertArray) => alert.id !== action.payload);
            console.log('updatedAlerts', updatedAlerts)
            updatedAlerts && state.alerts.shift()
        }
    },
})

export const { setAlert, removeAlert } = alertSlice.actions
export default alertSlice.reducer
