import { createSlice } from '@reduxjs/toolkit';

const langSettingSlice = createSlice({
  name: 'langSetting',
  initialState: false,
  reducers: {
    toggle: state => !state,
    open: () => true,
  },
});

export const { toggle, open } = langSettingSlice.actions;
export default langSettingSlice.reducer;
