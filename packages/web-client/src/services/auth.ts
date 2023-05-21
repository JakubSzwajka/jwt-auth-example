import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import jwtDecode from 'jwt-decode';


export type LoginResponse = {
    access_token: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

type DecodedToken = {
    accessToken: string;
    email: string;
    iat: number;
    exp: number;
    sub: string;
} | null;


type User = {
    id: string;
    email: string;
    name: string;
    password: string;
}

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
            return {
                ...decoded,
                accessToken: action.payload.access_token,
            } as DecodedToken; 
        });
    }
});

export const tokenReducer = tokenSlice.reducer;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).token?.accessToken;
            // console.log('token', token);
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        users: builder.query<User[], null>({
            query: () => '/users',
        }),
    }),
});

export const { useLoginMutation, useUsersQuery } = authApi;