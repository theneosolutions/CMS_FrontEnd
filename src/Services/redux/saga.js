import axios from "axios";
import { call, put, takeLatest, select } from "@redux-saga/core/effects";
import * as action from "./reducer";
import { store } from "./store";
import { BrandId } from "funtions/BrandId";

var baseUrlUser = "https://6b49-182-180-180-140.ngrok-free.app";
var baseUrlDecisions =
  "https://2146-2a00-5400-e053-7ddb-28c6-f8a3-45fd-17fc.ngrok-free.app/api/v1/dms";
var baseUrlCMS = "https://bc7f-182-188-103-146.ngrok-free.app/api/v1/cms";

function* GetAllQuestionsData() {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.get,
      baseUrlDecisions + "/eligibilityQuestions/getAllQuestions",
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    yield put(action.GetAllQuestions(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
    yield put(action.Loading({ Loading: false }));
  }
}
function* GetAllSetsData(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.get,
      baseUrlDecisions + "/questionSet/getAllQuestionSet",
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    yield put(action.GetAllSets(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetSingleQuestion(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.get,
      baseUrlDecisions +
        `/eligibilityQuestions/getQuestionById?id=${payload.payload.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    yield put(action.GetSingleQuestion(response.data.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetSingleSetData(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.get,
      baseUrlDecisions +
        `/questionSet/getQuestionSetByNumericAndString?id=${payload.payload.id}&forUser=${payload.payload.forUser}`,
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    yield put(action.GetSingleSetData(response.data.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* DeleteQuestion(payload) {
  try {
    const response = yield call(
      axios.delete,
      baseUrlDecisions +
        `/eligibilityQuestions/delete-question?id=${payload.id}`
    );
    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    // yield put(action.GetAllQuestions(response));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* AddQuestions({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.post,
      baseUrlDecisions + "/eligibilityQuestions/save-question",
      payload
    );

    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.AddQuestions(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
    yield put(action.Loading({ Loading: false }));
  }
}

function* AddQuestionsSet({ payload }) {
  try {
    const response = yield call(
      axios.post,
      baseUrlDecisions + `/questionSet/saveSet?setName=${payload.name}`,
      payload.selectedIds
    );

    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.AddNewQuestionsSet(response));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetLabels(payload) {
  try {
    const response = yield call(
      axios.get,
      baseUrlDecisions + "/api/v1/admin/get-all-labels",
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    yield put(action.getLables(response));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetQuestionOfSet(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.get,
      baseUrlDecisions +
        `/questionSet/getQuestionByIdAndSetId?questionId=${payload.payload.id}&setId=${payload.payload.setid}`,
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    yield put(action.GetQuestionOfSet(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* AddNewFormula({ payload }) {
  try {
    const response = yield call(
      axios.post,
      baseUrlDecisions + `/formula/create?setId=${payload.setId}`,
      payload
    );

    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.AddFormula(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* AddAnswertoQuestion({ payload }) {
  try {
    const response = yield call(
      axios.post,
      baseUrlDecisions +
        `/questionSet/updateAnswer?id=${payload.id}&questionId=${payload.questionId}`,
      payload.answers
    );

    const message = response.data.message;
    yield put(action.Message({ message: message, open: true, error: false }));
    yield put(action.AddFormula(response));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetAllDecisions(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.get,
      baseUrlDecisions + `/questionSet/getAllDecision`,
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    yield put(action.GetAllDecisions(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* AddUsersAnswersToSet({ payload }) {
  console.log("other", payload.data, "numeric", payload.numericData);
  try {
    const response1 = yield call(
      axios.post,
      baseUrlDecisions + `/questionSet/updateUserAnswer?id=${payload.id}`,
      payload.data
    );
    console.log("response1", response1);

    const response2 = yield call(
      axios.post,
      baseUrlDecisions +
        `/formula/calculateFormula?setId=${payload.id}&userId=8`,
      payload.numericData
    );
    console.log("response2", response2.data.data);
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetAllUsers(payload) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.get,
      baseUrlDecisions +
        `/formula/checkAllUserEligibility?userVerifiedType=${payload.payload}`,
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    yield put(action.GetAllUsers(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* AddNewUser({ payload }) {
  console.log("data", payload);

  try {
    yield put(action.Loading({ Loading: true }));

    const response1 = yield call(
      axios.post,
      baseUrlUser + `/api/auth/signup`,
      payload
    );
    console.log("response1", response1.data.message);
    yield put(action.Loading({ Loading: false }));
    yield put(
      action.Message({
        message: response1.data.message,
        open: true,
        error: false,
      })
    );
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    console.log("helo ,error");
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* UserLogin({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.post,
      baseUrlUser + `/api/auth/signin`,
      payload
    );
    if (response.data.accessToken) {
      yield put(action.Auth({ user: response.data, islogin: true }));
      localStorage.setItem(
        "user",
        JSON.stringify({ islogin: true, data: response.data })
      );
      yield put(
        action.Message({ message: "Login Success", open: true, error: false })
      );
    }
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
//////////////////////////////////////////////////////////////////
// branding
function* CreateBrand({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.post,
      baseUrlCMS + `/branding/save?brandName=${payload}`,
      payload
    );
    localStorage.setItem("brand", JSON.stringify(response?.data?.data));

    yield put(action.GetSingleBrand(response?.data));
    yield put(action.Loading({ Loading: false }));
    const message = response?.data?.message;
    yield put(action.Message({ message: message, open: true, error: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetAllBrands() {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(axios.get, baseUrlCMS + `/branding/getAll`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });
    yield put(action.GetBrands(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* GetSingleBrand({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.get,
      baseUrlCMS + `/branding/getBrandDetail?id=${payload}`,
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    if (response.data) {
      localStorage.setItem("brand", JSON.stringify(response.data));
    }

    yield put(action.GetSingleBrand(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetAllSliders({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.get,
      baseUrlCMS +
        `/brandSplashScreen/brandSliderScreen/getById?brandId=${BrandId()}`,
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    console.log("response responseresponse", response);
    yield put(action.GetAllSliders(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* CreateLogo({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const formData = new FormData();
    formData.append("file", payload.image);
    formData.append("brandId", BrandId());
    formData.append("height", payload.height);
    formData.append("width", payload.width);

    const response = yield call(
      axios.post,
      baseUrlCMS + "/brandLogo/uploadLogo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    yield put(action.Loading({ Loading: false }));
    const message = response?.data?.message;
    yield put(action.Message({ message, open: true, error: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));

    const message = error.response?.data?.message || "An error occurred";
    yield put(action.Message({ message, open: true, error: true }));
  }
}
function* CreateSplash({ payload }) {
  console.log("payload", payload);
  try {
    yield put(action.Loading({ Loading: true }));
    // const formData = new FormData();
    // formData.append("file", payload.image);
    // formData.append("brandId", BrandId());

    const response = yield call(
      axios.post,
      baseUrlCMS + "/brandSplashScreen/brandingSplashScreen",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }
    );
    yield put(action.Loading({ Loading: false }));
    const message = response?.data?.message;
    yield put(action.Message({ message, open: true, error: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response?.data?.message || "An error occurred";
    yield put(action.Message({ message, open: true, error: true }));
  }
}
function* SetColor({ payload }) {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.post,
      baseUrlCMS + `/brandColor/brandingColor?brandId=${BrandId()}`,
      payload
    );
    const message = response?.data?.message;
    yield put(action.Loading({ Loading: false }));
    yield put(action.Message({ message: message, open: true, error: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* SetFonts({ payload }) {
  console.log("payload fonts", payload);
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axios.post,
      baseUrlCMS + `/brandFont/saveFontFamily?brandId=${BrandId()}`,
      payload
    );
    const message = response?.data?.message;
    yield put(action.Loading({ Loading: false }));
    yield put(action.Message({ message: message, open: true, error: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}

function* CreateSlide({ payload }) {
  console.log("payload CreateSlide", payload);
  const formData = new FormData();
  formData.append("file", payload.image);

  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.post,
      baseUrlCMS +
        `/brandSplashScreen/brandingSliderScreen?mainTittle=${payload.mainTitle}&brandId=${payload.brandId}&desc=${payload.description}&title=${payload.title}&position=${payload.position}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }
    );
    const message = response?.data?.message;
    yield put(action.Loading({ Loading: false }));
    yield put(action.Message({ message: message, open: true, error: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetFonts({ payload }) {
  console.log("helooooo");
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.get,

      `https://webfonts.googleapis.com/v1/webfonts?key=AIzaSyAH_8hQqpI7EgrJ7IylHbR8Du8Hi9BEbsY`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response responseresponse", response);
    yield put(action.GetFonts(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetFontsAdmin({ payload }) {
  console.log("helooooo admin fonts");
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.get,
      baseUrlCMS +
        `/brandFont/fontFamily/getFontFamilyForAdmin?brandId=${BrandId()}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response responseresponse fonts admin", response);
    yield put(action.GetFontsAdmin(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetEndpoints({ payload }) {
  console.log("helooooo admin endpoints");
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(axios.get, baseUrlCMS + `/appFlow/getAll`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
      },
    });
    console.log("response responseresponse APP FLOW admin", response.data);
    yield put(action.GetEndpoints(response.data));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* SaveApiTree({ payload }) {
  console.log("payload tree hai bhai tree", payload);

  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(
      axios.post,
      baseUrlCMS + `/apiFlow/saveApiFlow?brandId=${BrandId()}`,
      payload
    );
    const message = response?.data?.message;
    yield put(action.Loading({ Loading: false }));
    yield put(action.Message({ message: message, open: true, error: false }));
  } catch (error) {
    yield put(action.Loading({ Loading: false }));
    const message = error.response.data.message;
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
export default function* HomeSaga() {
  yield takeLatest("ADD_QUESTION", AddQuestions);
  yield takeLatest("GET_ALL_QUESTIONS", GetAllQuestionsData);
  yield takeLatest("DELETE_QUESTION", DeleteQuestion);
  yield takeLatest("ADD_QUESTIONS_SET", AddQuestionsSet);
  yield takeLatest("GET_ALL_SETS", GetAllSetsData);
  yield takeLatest("GET_SINGLE_SET_DATA", GetSingleSetData);
  yield takeLatest("GET_LABLES", GetLabels);
  yield takeLatest("GET_SINGLE_QUESTION", GetSingleQuestion);
  yield takeLatest("ADD_NEW_FORMULA", AddNewFormula);
  yield takeLatest("ADD_ANSWER_THE_QUESTION", AddAnswertoQuestion);
  yield takeLatest("GET_QUESTION_OF_SET", GetQuestionOfSet);
  yield takeLatest("GET_ALL_DECISIONS", GetAllDecisions);
  yield takeLatest("ADD_USER_ANSWER_TO_SET", AddUsersAnswersToSet);
  yield takeLatest("GET_ALL_USERS", GetAllUsers);
  yield takeLatest("Add_NEW_USER", AddNewUser);
  yield takeLatest("LOGIN_USER", UserLogin);
  // cms start
  yield takeLatest("CREATE_BRAND", CreateBrand);
  yield takeLatest("GET_ALL_BRANDS", GetAllBrands);
  yield takeLatest("CREATE_LOGO", CreateLogo);
  yield takeLatest("CREATE_SPLASH", CreateSplash);

  yield takeLatest("GET_SINGLE_BRAND", GetSingleBrand);
  yield takeLatest("SET_COLOR", SetColor);
  yield takeLatest("SET_FONTS", SetFonts);
  yield takeLatest("ADD_SLIDE_TO_SLIDER", CreateSlide);
  yield takeLatest("GET_ALL_SLIDERS", GetAllSliders);
  yield takeLatest("GET_FONTS", GetFonts);
  yield takeLatest("GET_FONTS_ADMIN", GetFontsAdmin);
  yield takeLatest("GET_ENDPOINTS", GetEndpoints);
  yield takeLatest("SAVE_API_TREE", SaveApiTree);
}
