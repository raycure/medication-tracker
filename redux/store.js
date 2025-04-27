import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from './authSlice.js';

const authPersistConfig = {
	key: 'auth',
	storage: AsyncStorage,
	whitelist: ['isLoggedIn'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
export default store;
