import { clothesLogoUrlDefault } from "../../root/Texts";
import {
  ADD_TO_COLLECTIONS,
  GET_EMAIL_SIGNINED,
  IS_LOGINED,
  IS_UPLOADED_IMAGE_TO_FIREBASE,
  MOVE_TO_FORGOT_PASSWORD,
  OPEN_ADD_TO_COLLECTIONS_DIALOG,
  OPEN_COMMENTS_DIALOG, 
  OPEN_CREATE_CLOTHES_DIALOG,
  OPEN_CREATE_COLLECTION_DIALOG,
  OPEN_UPGRADE_ROLES_DIALOG,
  OPEN_UP_POSTING_DIALOG,
  SAVE_IMAGE_COLLECTION_URL,
  SAVE_IMAGE_CREATING_URL,
  SAVE_IMAGE_POSTING_URL,
  SAVE_IMAGE_URL,
  SIGN_IN
} from "./Actions";

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
  isOpenUpgradeRolesDialog: boolean;
  isOpenCreateCollectionDialog: boolean;
  imageCollectionUrl: string;
  isLogined: boolean
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
  imagePostingUrl: '#',
  isOpenUpgradeRolesDialog: false,
  isOpenCreateCollectionDialog: false,
  imageCollectionUrl: '#',
  isLogined: false,


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
    case SAVE_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.payload,
      };
    case OPEN_CREATE_CLOTHES_DIALOG:
      return {
        ...state,
        isOpenCreateClothesDialog: action.payload,
      };
      case SAVE_IMAGE_CREATING_URL:
      return {
        ...state,
        imageCreatingUrl: action.payload,
      };
      case IS_UPLOADED_IMAGE_TO_FIREBASE:
      return {
        ...state,
        isUploadedImageToFireBase: action.payload,
      };
      case SAVE_IMAGE_POSTING_URL:
      return {
        ...state,
        imagePostingUrl: action.payload,
      };
      case OPEN_UPGRADE_ROLES_DIALOG:
      return {
        ...state,
        isOpenUpgradeRolesDialog: action.payload,
      };
      case OPEN_CREATE_COLLECTION_DIALOG:
      return {
        ...state,
        isOpenCreateCollectionDialog: action.payload,
      };
      case SAVE_IMAGE_COLLECTION_URL:
      return {
        ...state,
        imageCollectionUrl: action.payload,
      };
      case IS_LOGINED:
      return {
        ...state,
        isLogined: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
