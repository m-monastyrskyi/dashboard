import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
    isFetching: false,
    error: null,
    users: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsersStart: state => {
            state.isFetching = true;
        },
        fetchUsersSuccess: (state, { payload }) => {
            state.users = payload;
            state.isFetching = false;
            state.error = null;
        },
        fetchUsersFailure: (state, {payload}) => {
            state.isFetching = false;
            state.error = payload;
        },
    },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = usersSlice.actions;

export const usersSelector = state => state.users;

export default usersSlice.reducer;

export function fetchUsers(){
    return async dispatch => {
        const url = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';
        dispatch(fetchUsersStart());

        try {
            const response = await axios.get(url);
            console.log(response.data);
            dispatch(fetchUsersSuccess(response.data))
        } catch ( error ) {
            dispatch(fetchUsersFailure(error.message))
        }
    };
}

