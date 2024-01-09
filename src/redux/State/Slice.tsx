import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  email: string;
  password: string;
  isOpen: boolean;
  isAddedToCollections: boolean;
  isOpenPostingDialog: boolean;
  isOpenCommentsDialog: boolean;
}

const initialState: State = {
  email: '',
  password: '',
  isOpen: false,
  isAddedToCollections: false,
  isOpenPostingDialog: false,
  isOpenCommentsDialog: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    moveToForgotPassword: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
    setEmailSignIned: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
    setOpenAddToCollectionsDialog: (state, action: PayloadAction<{isOpen: boolean}>) => {
      state.isOpen = action.payload.isOpen;
    },
    setAddToCollections: (state, action: PayloadAction<{isAddedToCollections: boolean}>) => {
      state.isAddedToCollections = action.payload.isAddedToCollections;
    },
    setOpenUpPostingDialog: (state, action: PayloadAction<{isOpenPostingDialog: boolean}>) => {
      state.isOpenPostingDialog = action.payload.isOpenPostingDialog;
    },
    setOpenCommentsDialog: (state, action: PayloadAction<{isOpenCommentsDialog: boolean}>) => {
      state.isOpenCommentsDialog = action.payload.isOpenCommentsDialog;
    },
  },
});

export const { signIn, moveToForgotPassword, setEmailSignIned } = authSlice.actions;
export default authSlice.reducer;
