import { GET_EMAIL_SIGNINED, MOVE_TO_FORGOT_PASSWORD, OPEN_POLICY, SIGN_IN } from "./AuthAction";

interface AuthState {
  email: string;
  password: string;
  isOpen: boolean;
}

const initialState: AuthState = {
  email: '',
  password: '',
  isOpen: false,
};

const authReducer = (state = initialState, action: any): AuthState => {
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
    case OPEN_POLICY:
      return {
        ...state,
        isOpen: action.payload.isOpen,
      };
    default:
      return state;
  }
};

export default authReducer;
