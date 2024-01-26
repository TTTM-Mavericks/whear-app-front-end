export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Social: undefined;
  Introduce: undefined;
  Collections: undefined;
  Route: undefined;
  ForgotPassword: { email: string };
  PostingDetail: { postID: string };
  UserProfile: { userID: any };
  UserProfileSetting: undefined;
  ClothesDetailScreen: undefined;
  BasicInformationScreen: undefined;
  ChooseStyleYouLove: undefined;
  SearchScreen: {keyWord: any};
  // SearchScreen: undefined;


};

export interface RootState {
  auth: {
    openPolicy: boolean;
    // ... other auth properties
  };
  // ... other slices
}