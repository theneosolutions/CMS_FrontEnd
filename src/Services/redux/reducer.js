import { createSlice } from "@reduxjs/toolkit";
// import { BrandId } from "funtions/BrandId";
const brand = JSON.parse(localStorage.getItem("brand"));
const initialState = {
  appState: "",
  addQuestions: {},
  getAllQuestions: [],
  addQuestionsSet: {},
  getAllSets: [],
  getLables: [],
  getSingleSetData: {},
  getSingleQuestion: {},
  getQuestionOfSet: {},
  getAllDecisions: [],
  addFormula: {},
  getAllUsers: [],
  message: "",
  open: false,
  error: false,
  Notifications: {},
  Loading: false,
  // verify: false,

  islogin: false,
  user: null,

  // Cms Start
  getAllBrands: [],
  getAllSliders: {},

  getLogo: {},
  getSingleBrand: brand || {},
  fonts: [],
  getfonts: {},
};
const Reducer = createSlice({
  name: "seulah",
  initialState,
  reducers: {
    AddQuestions: (state, action) => {
      const { data } = action.payload;
      state.addQuestions = data;
    },
    GetAllQuestions: (state, action) => {
      const { data } = action.payload;
      state.getAllQuestions = data;
    },
    AddNewQuestionsSet: (state, action) => {
      const { data } = action.payload;
      state.addQuestionsSet = data;
    },
    GetAllSets: (state, action) => {
      const { data } = action.payload;
      state.getAllSets = data;
    },
    getLables: (state, action) => {
      const { data } = action.payload;
      state.getLables = data;
    },

    Notifications: (state, action) => {
      state.Notifications = action.payload;
    },
    Loading: (state, action) => {
      const { Loading } = action.payload;

      state.Loading = Loading;
    },
    SetAppState: (state, action) => {
      state.appState = action.payload;
    },
    GetSingleSetData: (state, action) => {
      state.getSingleSetData = action.payload;
    },
    GetSingleQuestion: (state, action) => {
      state.getSingleQuestion = action.payload;
    },
    AddFormula: (state, action) => {
      const { data } = action.payload;
      state.addFormula = data;
    },
    GetQuestionOfSet: (state, action) => {
      const { data } = action.payload;
      state.getQuestionOfSet = data;
    },
    GetAllDecisions: (state, action) => {
      const { data } = action.payload;
      state.getAllDecisions = data;
    },
    GetAllUsers: (state, action) => {
      const { data } = action.payload;
      state.getAllUsers = data;
    },
    Message: (state, action) => {
      const { message, open, error } = action.payload;
      console.log("helo");
      state.message = message;
      state.open = open;
      state.error = error;
    },

    Auth: (state, action) => {
      const { user, islogin } = action.payload;
      console.log(" action.payload;", action.payload);
      state.islogin = islogin;
      state.user = user;
      // state.error = error;
    },

    //Cms Start
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
    GetSingleBrand: (state, action) => {
      const { data } = action.payload;
      console.log("what the hell is this ? ", data);
      return {
        ...state,
        getSingleBrand: data,
      };
    },
  },
});
export const {
  Message,
  AddQuestions,
  GetAllQuestions,
  AddNewQuestionsSet,
  getLables,
  Loading,
  GetAllSets,
  SetAppState,
  GetSingleSetData,
  GetSingleQuestion,
  AddFormula,
  GetQuestionOfSet,
  GetAllDecisions,
  GetAllUsers,
  Auth,
  Message2,

  //Branding
  GetBrands,
  GetLogo,
  GetSingleBrand,
  GetAllSliders,
  GetFonts,
  GetFontsAdmin,
} = Reducer.actions;

export default Reducer.reducer;
