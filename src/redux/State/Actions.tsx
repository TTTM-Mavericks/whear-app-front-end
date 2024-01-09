export const SIGN_IN = 'SIGN_IN';
export const MOVE_TO_FORGOT_PASSWORD = 'MOVE_TO_FORGOT_PASSWORD';
export const GET_EMAIL_SIGNINED = 'MOVE_TO_FORGOT_PASSWORD';
export const OPEN_ADD_TO_COLLECTIONS_DIALOG = 'OPEN_ADD_TO_COLLECTIONS_DIALOG';
export const ADD_TO_COLLECTIONS = 'ADD_TO_COLLECTIONS';
export const OPEN_UP_POSTING_DIALOG = 'OPEN_UP_POSTING_DIALOG';
export const OPEN_COMMENTS_DIALOG = 'OPEN_COMMENTS_DIALOG';






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

export const setAddToCollections = (isAddedToCollection: boolean) => ({
  type: ADD_TO_COLLECTIONS,
  payload: isAddedToCollection,
});


