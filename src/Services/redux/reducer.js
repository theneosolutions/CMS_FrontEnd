import { createSlice } from "@reduxjs/toolkit";
const brand = JSON.parse(localStorage.getItem("brand"));
const initialState = {
  appState: "",
  message: "",
  open: false,
  error: false,
  Loading: false,
  islogin: false,
  user: null,
  getAllBrands: [],
  getAllSliders: {},
  getLogo: {},
  getSingleBrand: brand || {},
  fonts: [],
  getfonts: {},
  endpoints: {},
  getAppFlow: {},
};
const Reducer = createSlice({
  name: "seulah",
  initialState,
  reducers: {
    Loading: (state, action) => {
      const { Loading } = action.payload;
      state.Loading = Loading;
    },
    SetAppState: (state, action) => {
      state.appState = action.payload;
    },
    Message: (state, action) => {
      const { message, open, error } = action.payload;
      state.message = message;
      state.open = open;
      state.error = error;
    },
    Auth: (state, action) => {
      const { user, islogin } = action.payload;
      state.islogin = islogin;
      state.user = user;
    },
    GetBrands: (state, action) => {
      const { data } = action.payload;
      state.getAllBrands = data;
    },
    GetLogo: (state, action) => {
      const { data } = action.payload;
      state.getLogo = data;
    },
    GetAllSliders: (state, action) => {
      const { data } = action.payload;
      state.getAllSliders = data;
    },
    GetFonts: (state, action) => {
      const { data } = action.payload;
      state.fonts = data;
    },
    GetFontsAdmin: (state, action) => {
      const { data } = action.payload;
      state.getfonts = data;
    },
    GetEndpoints: (state, action) => {
      const { data } = action.payload;
      state.endpoints = data;
    },
    GetSingleBrand: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        getSingleBrand: data,
      };
    },
    GetappFlow: (state, action) => {
      const { data } = action.payload;
      state.getAppFlow = data;
    },
  },
});
export const {
  Message,
  Loading,
  SetAppState,
  Auth,
  GetBrands,
  GetLogo,
  GetSingleBrand,
  GetAllSliders,
  GetFonts,
  GetFontsAdmin,
  GetEndpoints,
  GetappFlow,
} = Reducer.actions;

export default Reducer.reducer;
