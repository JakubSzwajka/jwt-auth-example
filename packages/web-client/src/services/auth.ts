import { createSlice } from '@reduxjs/toolkit';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import jwtDecode from 'jwt-decode';

export type LoginResponse = {
  access_token: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

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
};

const tokenSlice = createSlice({
  name: 'token',
  initialState: null as DecodedToken,
  reducers: {
    removeToken: () => {
      return null;
    },
    saveToken: (state, action) => {
        const decoded: DecodedToken = jwtDecode(action.payload.access_token);
        console.log('Saving access token to state')
        return {
            ...decoded,
            accessToken: action.payload.access_token,
        } as DecodedToken;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        const decoded: DecodedToken = jwtDecode(action.payload.access_token);
        console.log('Saving access token to state from login call')
        return {
          ...decoded,
          accessToken: action.payload.access_token,
        } as DecodedToken;
      }
    );
  },
});

export const tokenReducer = tokenSlice.reducer;
export const {removeToken, saveToken} = tokenSlice.actions;

//https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).token?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    console.info('Reauthenticating...');
    // Try to refresh the token
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      console.info('Reauthentication successful', refreshResult.data);
      // If refresh was successful, retry the initial request
      api.dispatch(saveToken(refreshResult.data));

      result = await baseQuery(args, api, extraOptions);
    } else {
      console.info('Reauthentication failed - logging  out');
      // If refresh failed, logout
      api.dispatch(removeToken());
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
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
    refresh: builder.mutation<LoginResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useUsersQuery } = authApi;
