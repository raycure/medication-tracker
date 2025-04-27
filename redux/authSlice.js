import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios.js';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
	isLoggedIn: false,
	status: 'idle',
	isLoading: false,
	isSuccess: false,
	error: null,
	accessToken: null,
	userInfo: null,
};

async function setupAxiosDefaults(accessToken) {
	if (accessToken) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
}

export const fetchData = createAsyncThunk(
	'auth/fetchStatus',
	// data can be empty to include api calls like logout
	async (
		{ url, data = {}, method },
		{ rejectWithValue, getState, dispatch }
	) => {
		try {
			const accessToken = getState().auth.accessToken;
			await setupAxiosDefaults(accessToken);

			const response = await axios({
				url,
				data: method !== 'GET' ? data : undefined,
				method: method,
			});
			const isAccessTokenRefresh =
				response.headers && response.headers['x-refreshed-token'];
			console.log('isAccessTokenRefresh', isAccessTokenRefresh);

			if (isAccessTokenRefresh) {
				let newAccessToken = response?.data?.accessToken;
				dispatch(saveAccessToken(newAccessToken));
				setupAxiosDefaults(newAccessToken);
			}
			return {
				data: response.data,
				status: response.status,
				headers: response?.headers,
				endpoint: url,
			};
		} catch (error) {
			console.log('error in slice', error);
			const responseData = {
				data: error.response?.data,
				status: error.response?.status,
				headers: error.response?.headers,
				endpoint: url,
			};
			return rejectWithValue(responseData);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.status = 'loading';
				state.isLoading = true;
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isLoading = false;
				state.isSuccess = true;
				if (
					action.payload.endpoint.includes('/login') ||
					action.payload.endpoint.includes('/register')
				) {
					state.isLoggedIn = true;
				}
				if (
					action.payload.endpoint.includes('/logout') ||
					action.payload.endpoint.includes('/userInfo/deleteAccount')
				) {
					state.isLoggedIn = false;
					state.accessToken = null;
					state.userInfo = null;
				}
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.status = 'failed';
				state.isLoading = false;
				state.isSuccess = false;
				if (action?.payload?.data?.authFailure) {
					state.isLoggedIn = false;
				}
				state.error = action.payload || 'An unknown error occurred';
			});
	},
	reducers: {
		saveAccessToken(state, action) {
			state.accessToken = action.payload;
		},
		saveUserInfo(state, action) {
			state.userInfo = action.payload;
		},
		logout(state) {
			state.accessToken = null;
			state.userInfo = null;
		},
	},
});

export const { saveAccessToken, saveUserInfo, logout } = authSlice.actions;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthIsSuccess = (state) => state.auth.isSuccess;
export const selectError = (state) => state.auth.error;
export const selectAuthState = (state) => state.auth;
export default authSlice.reducer;
