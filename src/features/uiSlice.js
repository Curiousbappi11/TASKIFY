import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuToggle: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {

    MenuToggle: (state) => {
      state.isMenuToggle = !state.isMenuToggle;
    },

  }
})

export const {
  MenuToggle,
} = uiSlice.actions;
export default uiSlice.reducer;