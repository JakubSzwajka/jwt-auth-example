import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export type LoginResponse = {
    access_token: string;
}

export type LoginRequest = {
    username: string;
    password: string;
}

const tokenSlice = createSlice({
    name: 'token',
    initialState: null,
    reducers: {
        setToken: (state, action) => {
            return action.payload;
        },
        removeToken: (state, action) => {
            return null;
        },
    },
});


const { setToken, removeToken } = tokenSlice.actions;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setToken(data.access_token));
                } catch (err) {
                    console.error(err);
                }
            }
        }),
    }),
});

export const { useLoginMutation } = authApi;