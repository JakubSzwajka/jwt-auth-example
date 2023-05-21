import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import jwtDecode from 'jwt-decode';


export type LoginResponse = {
    access_token: string;
}

export type LoginRequest = {
    username: string;
    password: string;
}

type DecodedToken = {
    username: string;
    iat: number;
    exp: number;
    sub: string;
} | null;

const tokenSlice = createSlice({
    name: 'token',
    initialState: null as DecodedToken,
    reducers: {
        removeToken: (state, action) => {
            return null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            const decoded: DecodedToken = jwtDecode(action.payload.access_token);
            return decoded ; 
        });
    }
});

export const tokenReducer = tokenSlice.reducer;


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
        }),
    }),
});

export const { useLoginMutation } = authApi;