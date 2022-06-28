import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import pollReducer from '../features/poll/pollSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    poll: pollReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
