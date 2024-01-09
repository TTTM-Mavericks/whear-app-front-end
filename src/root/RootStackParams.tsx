export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Social: undefined;
  Introduce: undefined;
  Route: undefined;
  ForgotPassword: { email: string };
  PostingDetail: {postID: string};

};

export interface RootState {
  auth: {
    openPolicy: boolean;
    // ... other auth properties
  };
  // ... other slices
}