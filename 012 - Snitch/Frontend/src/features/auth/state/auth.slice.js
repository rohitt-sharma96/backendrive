import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
    }
})

export const { setLoading, setError, setUser } = authSlice.actions
export default authSlice.reducer