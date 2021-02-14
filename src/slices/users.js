import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';

export const initialState = {
    isFetching: false,
    isLoading: false,
    error: null,
    showModal: false,
    users: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        showModal: state => {
            state.showModal = true;
        },
        hideModal: state => {
            state.showModal = false;
        },
        fetchUsersStart: state => {
            state.isFetching = true;
        },
        fetchUsersSuccess: (state, { payload }) => {
            state.users = payload;
            state.isFetching = false;
            state.error = null;
        },
        fetchUsersFailure: (state, { payload }) => {
            state.isFetching = false;
            state.error = payload;
        },
        startApiCall: state => {
            state.isLoading = true;
        },
        endApiCall: state => {
            state.isLoading = false;
        },
        deleteUserLocally: (state, { payload: id }) => {
            state.users = state.users.filter(user => user.id !== id);
        },
        createUserLocally: (state, { payload }) => {
            state.users = [...state.users, payload];
            state.showModal = false;
        },
        updateUserLocally: (state, { payload }) => {
            state.users = state.users.map(user => user.id === payload.id ? payload : user);
            state.showModal = false;
        }
    },
});

export const {
    fetchUsersStart, fetchUsersSuccess, fetchUsersFailure,
    startApiCall, endApiCall, deleteUserLocally, createUserLocally, updateUserLocally, showModal, hideModal
} = usersSlice.actions;

export const usersSelector = state => state.users;

export default usersSlice.reducer;

export function fetchUsers(){
    return async dispatch => {
        dispatch(fetchUsersStart());

        try {
            const response = await axios.get();
            dispatch(fetchUsersSuccess(response.data));
        } catch ( error ) {
            dispatch(fetchUsersFailure(error.message));
        }
    };
}

export function deleteUserFromApi(id){
    return async dispatch => {
        dispatch(startApiCall());

        try {
            await axios.delete(`/${id}`);
            // P.S. Normally I would update users from API here
            dispatch(deleteUserLocally(id));
            dispatch(endApiCall());
        } catch ( error ) {
            console.log(error);
            dispatch(endApiCall());
            dispatch(fetchUsersFailure(error.message));
        }
    };
}

export function createUserInApi(data){
    return async dispatch => {
        dispatch(startApiCall());

        try {
            const response = await axios.post('', data);
            const id = new Date().getTime();
            // dispatch(createUserLocally(response.data)); response.data.id is always the same
            dispatch(createUserLocally({ ...response.data, id }));
            dispatch(endApiCall());
        } catch ( error ) {
            console.log(error);
            dispatch(endApiCall());
            dispatch(fetchUsersFailure(error.message));
        }
    };
}

export function updateUserInApi(id, data){
    return async dispatch => {
        dispatch(startApiCall());

        try {
            const response = await axios.patch(`/${id}`, data);
            dispatch(updateUserLocally(response.data));
            dispatch(endApiCall());
        } catch ( error ) {
            console.log(error);
            dispatch(endApiCall());
            dispatch(fetchUsersFailure(error.message));
        }
    };
}

