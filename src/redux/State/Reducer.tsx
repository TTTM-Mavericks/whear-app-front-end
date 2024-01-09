import { ADD_TO_COLLECTIONS, GET_EMAIL_SIGNINED, MOVE_TO_FORGOT_PASSWORD, OPEN_ADD_TO_COLLECTIONS_DIALOG, OPEN_COMMENTS_DIALOG, OPEN_UP_POSTING_DIALOG, SIGN_IN } from "./Actions";

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
  isOpenCommentsDialog: false,
};

const Reducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    case MOVE_TO_FORGOT_PASSWORD:
      return {
        ...state,
        email: action.payload.email,
      };
    case GET_EMAIL_SIGNINED:
      return {
        ...state,
        email: action.payload.email,
      };
    case OPEN_ADD_TO_COLLECTIONS_DIALOG:
      return {
        ...state,
        isOpen: action.payload,
      };
    case ADD_TO_COLLECTIONS:
      return {
        ...state,
        isAddedToCollections: action.payload,
      };
    case OPEN_UP_POSTING_DIALOG:
      return {
        ...state,
        isOpenPostingDialog: action.payload,
      };
    case OPEN_COMMENTS_DIALOG:
      return {
        ...state,
        isOpenCommentsDialog: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
