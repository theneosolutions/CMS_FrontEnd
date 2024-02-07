import axios from "axios";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import * as action from "./reducer";
import { BrandId } from "funtions/BrandId";

var baseUrlUser = "https://seulah.ngrok.app";
var baseUrlCMS = "https://seulah.ngrok.app/api/v1/cms";

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
  try {
    yield put(action.Loading({ Loading: true }));

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
    yield put(action.GetFonts(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetFontsAdmin({ payload }) {
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
    yield put(action.GetFontsAdmin(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));

    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
function* GetEndpoints() {
  try {
    yield put(action.Loading({ Loading: true }));

    const response = yield call(axios.get, baseUrlCMS + `/appFlow/getAll`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
      },
    });
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
function* GetAppFlow() {
  try {
    yield put(action.Loading({ Loading: true }));
    const response = yield call(
      axios.get,
      baseUrlCMS + `/screenFlow/getAppFlow?brandId=123`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
      }
    );
    yield put(action.GetappFlow(response));
    yield put(action.Loading({ Loading: false }));
  } catch (error) {
    const message = error.response.data.message;
    yield put(action.Loading({ Loading: false }));
    yield put(action.Message({ message: message, open: true, error: true }));
  }
}
export default function* HomeSaga() {
  yield takeLatest("LOGIN_USER", UserLogin);
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
  yield takeLatest("GET_APP_FLOW", GetAppFlow);
}
