import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { routes } from "./routes";
import TestPage from "pages/TestPage";
import TestPage2 from "pages/TestPage/test2";
import MyAccount from "pages/MyAccount";
import Login from "pages/authentication/Login";
import Otp from "pages/authentication/otp";
import CreateBrand from "pages/Branding/createBrand";
import SingleSlider from "pages/singleSlider";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes}
          <Route path="/test" element={<TestPage />} />
          <Route path="/test2" element={<TestPage2 />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/single-slider" element={<SingleSlider />} />
        </Route>

        <Route path="/brands" element={<CreateBrand />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
