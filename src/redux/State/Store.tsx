import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../components/auth/AuthState/AuthReducer';
import Reducer from './Reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    store: Reducer,
  },
});

export default store;
