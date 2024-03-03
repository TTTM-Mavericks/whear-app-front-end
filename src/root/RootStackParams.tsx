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
  ClothesDetailScreen: { clothID: any };
  BasicInformationScreen: undefined;
  ChooseStyleYouLove: undefined;
  SearchScreen: {keyWord: any};
  NotificationScreen: undefined;
  AddingClothesScreen: undefined;
  AddingPostingsScreen: undefined;
  RecommendOutfitScreen: undefined;
  MessageScreen: undefined;
  NewsScreen: undefined;
  HotStoreScreen: undefined;
  Event: undefined;


};

export interface RootState {
  auth: {
    openPolicy: boolean;
    // ... other auth properties
  };
  // ... other slices
}