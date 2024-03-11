export const SIGN_IN = 'SIGN_IN';
export const MOVE_TO_FORGOT_PASSWORD = 'MOVE_TO_FORGOT_PASSWORD';
export const GET_EMAIL_SIGNINED = 'MOVE_TO_FORGOT_PASSWORD';
export const OPEN_POLICY = 'OPEN_POLICY';
export const ACCEPTED_POLICY = 'ACCEPTED_POLICY';






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

export const setOpenPolicy = (isOpen: boolean) => ({
  type: OPEN_POLICY,
  payload: isOpen,
});

export const setAcceptedPolicy = (isAcceptedPolicy: boolean) => ({
  type: ACCEPTED_POLICY,
  payload: isAcceptedPolicy,
});
