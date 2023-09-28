import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type for our state
export interface DarkModeState {
  darkMode : boolean;
}


// Initial state
let initialState: DarkModeState;
initialState = {
  darkMode : true,
};

if (typeof window !== "undefined") {
  const localStorageState = localStorage.getItem("darkmodeState");
  
  if (localStorageState) {
    initialState = JSON.parse(localStorageState);
  }
}



export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    // Action to set the authentication status
    changeMode(state, action) {
      localStorage.setItem("darkmodeState", "" + !state.darkMode);
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  changeMode
} = darkModeSlice.actions;
export default darkModeSlice.reducer;