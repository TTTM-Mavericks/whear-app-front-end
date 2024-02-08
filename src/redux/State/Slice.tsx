import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clothesLogoUrlDefault } from '../../root/Texts';

interface State {
  email: string;
  password: string;
  isOpen: boolean;
  isAddedToCollections: boolean;
  isOpenPostingDialog: boolean;
  isOpenCommentsDialog: boolean;
  imageUrl: string;
  isOpenCreateClothesDialog: boolean;
  imageCreatingUrl: string;
  isUploadedImageToFireBase: boolean;
  imagePostingUrl: string;
}

const initialState: State = {
  email: '',
  password: '',
  isOpen: false,
  isAddedToCollections: false,
  isOpenPostingDialog: false,
  isOpenCommentsDialog: false,
  imageUrl: '../../assets/icon/user.png',
  isOpenCreateClothesDialog: false,
  imageCreatingUrl: clothesLogoUrlDefault,
  isUploadedImageToFireBase: false,
  imagePostingUrl: '#'
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
    setOpenAddToCollectionsDialog: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOpen = action.payload.isOpen;
    },
    setAddToCollections: (state, action: PayloadAction<{ isAddedToCollections: boolean }>) => {
      state.isAddedToCollections = action.payload.isAddedToCollections;
    },
    setOpenUpPostingDialog: (state, action: PayloadAction<{ isOpenPostingDialog: boolean }>) => {
      state.isOpenPostingDialog = action.payload.isOpenPostingDialog;
    },
    setOpenCommentsDialog: (state, action: PayloadAction<{ isOpenCommentsDialog: boolean }>) => {
      state.isOpenCommentsDialog = action.payload.isOpenCommentsDialog;
    },
    saveImageUrl: (state, action: PayloadAction<{ imageUrl: string }>) => {
      state.imageUrl = action.payload.imageUrl;
    },
    setOpenCreateClothesDialog: (state, action: PayloadAction<{ isOpenCreateClothesDialog: boolean }>) => {
      state.isOpenCreateClothesDialog = action.payload.isOpenCreateClothesDialog;
    },
    saveImageCreatingUrl: (state, action: PayloadAction<{ imageCreatingUrl: string }>) => {
      state.imageCreatingUrl = action.payload.imageCreatingUrl;
    },
    setUploadToFireBase: (state, action: PayloadAction<{ isUploadedImageToFireBase: boolean }>) => {
      state.isUploadedImageToFireBase = action.payload.isUploadedImageToFireBase;
    },
    saveImagePostingUrl: (state, action: PayloadAction<{ imagePostingUrl: string }>) => {
      state.imagePostingUrl = action.payload.imagePostingUrl;
    },
  },
});

export const { 
  signIn, 
  moveToForgotPassword, 
  setEmailSignIned, 
  saveImageCreatingUrl, 
  saveImageUrl, 
  setAddToCollections, 
  setOpenAddToCollectionsDialog, 
  setOpenCommentsDialog, 
  setOpenCreateClothesDialog, 
  setOpenUpPostingDialog, 
  setUploadToFireBase, 
  saveImagePostingUrl

} = authSlice.actions;
export default authSlice.reducer;
