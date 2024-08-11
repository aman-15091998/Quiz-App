import { createSlice } from '@reduxjs/toolkit';

export const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags:[]
  },
  reducers: {
    addTag:(state, action)=>{
          state.tags.push(action.payload);       //for adding a tag
    },
    removeTag:(state, action)=>{
      state.tags.splice(action.payload, 1);      //for removing a tag
}
  },
});
export const tagReducer=tagSlice.reducer;
export const tagActions=tagSlice.actions;
export const tagSelector=(state)=>state.tagReducer;