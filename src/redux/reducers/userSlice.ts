import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// Define a type for the slice state
export interface CounterState {
  isAuth: boolean;
  loading: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  isAuth: false,
  loading: true,
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
  },
});

export const { setIsAuth, setILoading } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectIsLoading = (state: RootState) => state.user.loading;
export default userSlice.reducer;
