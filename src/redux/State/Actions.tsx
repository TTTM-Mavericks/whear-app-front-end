export const SIGN_IN = 'SIGN_IN';
export const MOVE_TO_FORGOT_PASSWORD = 'MOVE_TO_FORGOT_PASSWORD';
export const GET_EMAIL_SIGNINED = 'MOVE_TO_FORGOT_PASSWORD';
export const OPEN_ADD_TO_COLLECTIONS_DIALOG = 'OPEN_ADD_TO_COLLECTIONS_DIALOG';
export const ADD_TO_COLLECTIONS = 'ADD_TO_COLLECTIONS';
export const OPEN_UP_POSTING_DIALOG = 'OPEN_UP_POSTING_DIALOG';
export const OPEN_COMMENTS_DIALOG = 'OPEN_COMMENTS_DIALOG';
export const OPEN_CREATE_CLOTHES_DIALOG = 'OPEN_CREATE_CLOTHES_DIALOG';
export const SAVE_IMAGE_URL = 'SAVE_IMAGE_URL';
export const SAVE_IMAGE_CREATING_URL = 'SAVE_IMAGE_CREATING_URL';
export const SAVE_IMAGE_POSTING_URL = 'SAVE_IMAGE_POSTING_URL';
export const OPEN_UPGRADE_ROLES_DIALOG = 'OPEN_UPGRADE_ROLES_DIALOG';
export const IS_UPLOADED_IMAGE_TO_FIREBASE = 'IS_UPLOADED_IMAGE_TO_FIREBASE';
export const OPEN_CREATE_COLLECTION_DIALOG = 'OPEN_CREATE_COLLECTION_DIALOG';
export const SAVE_IMAGE_COLLECTION_URL = 'SAVE_IMAGE_COLLECTION_URL';
export const IS_LOGINED = 'IS_LOGINED';





export const signIn = (email: string, password: string) => ({
  type: SIGN_IN,
  payload: { email, password },
});

export const moveToForgotPassword = (email: string) => ({
  type: MOVE_TO_FORGOT_PASSWORD,
  payload: { email },
});

export const setEmailSignIned = (email: string) => ({
  type: GET_EMAIL_SIGNINED,
  payload: { email },
});

export const setOpenAddToCollectionsDialog = (isOpen: boolean) => ({
  type: OPEN_ADD_TO_COLLECTIONS_DIALOG,
  payload: isOpen,
});

export const setOpenUpPostingDialog = (isOpenPostingDialog: boolean) => ({
  type: OPEN_UP_POSTING_DIALOG,
  payload: isOpenPostingDialog,
});

export const setOpenCommentsDialog = (isOpenCommentsDialog: boolean) => ({
  type: OPEN_COMMENTS_DIALOG,
  payload: isOpenCommentsDialog,
});

export const setOpenCreateClothesDialog = (isOpenCreateClothesDialog: boolean) => ({
  type: OPEN_CREATE_CLOTHES_DIALOG,
  payload: isOpenCreateClothesDialog,
});

export const setAddToCollections = (isAddedToCollection: boolean) => ({
  type: ADD_TO_COLLECTIONS,
  payload: isAddedToCollection,
});

export const saveImageUrl = (imageUrl: string) => ({
  type: SAVE_IMAGE_URL,
  payload: imageUrl,
});

export const saveImageCreatingUrl = (imageCreatingUrl: string) => ({
  type: SAVE_IMAGE_CREATING_URL,
  payload: imageCreatingUrl,
});

export const setUploadToFireBase = (isUploadedImageToFireBase: boolean) => ({
  type: IS_UPLOADED_IMAGE_TO_FIREBASE,
  payload: isUploadedImageToFireBase,
});

export const saveImagePostingUrl = (imagePostingUrl: string) => ({
  type: SAVE_IMAGE_POSTING_URL,
  payload: imagePostingUrl,
});

export const setOpenUpgradeRolesDialog = (isOpenUpgradeRolesDialog: boolean) => ({
  type: OPEN_UPGRADE_ROLES_DIALOG,
  payload: isOpenUpgradeRolesDialog,
});

export const setCreateCollectionDialog = (isOpenCreateCollectionDialog: boolean) => ({
  type: OPEN_CREATE_COLLECTION_DIALOG,
  payload: isOpenCreateCollectionDialog,
});

export const saveImageCollectionngUrl = (imageCollectionUrl: string) => ({
  type: SAVE_IMAGE_COLLECTION_URL,
  payload: imageCollectionUrl,
});

export const setIsLogined = (isLogined: boolean) => ({
  type: IS_LOGINED,
  payload: isLogined,
});


