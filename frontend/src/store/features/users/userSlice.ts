import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UsersState {
  users: any[]; // Replace 'any' with a proper User type later
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using that type
const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // We will add reducers here later
  },

});

// Export the reducer
export default userSlice.reducer;
