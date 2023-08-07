import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// Define a type for the slice state

interface UserType {
  email: String;
  name: String;
  photo: String;
  role: String;
  _id: String;
  wallet?: Number;
}

export interface UserState {
  isAuth: boolean;
  loading: boolean;
  user: UserType;
}

// Define the initial state using that type
const initialState: UserState = {
  isAuth: false,
  loading: true,
  user: {
    email: "",
    name: "",
    photo: "",
    role: "",
    _id: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setILoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      (state.isAuth = false),
        (state.user = initialState.user),
        (state.loading = false);
    },
  },
});

export const { setIsAuth, setILoading, setUser, logoutUser } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectIsLoading = (state: RootState) => state.user.loading;
export default userSlice.reducer;
