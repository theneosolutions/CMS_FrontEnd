import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { routes } from "./routes";
import Profile from "Pages/Profile";
import TestPage from "Pages/TestPage";
import Applications from "Pages/Applications";
import UserDetail from "Pages/UserDetail";
import MyAccount from "Pages/MyAccount";
import Login from "Pages/authentication/Login";
import Otp from "Pages/authentication/otp";
import ReactFlow from "../Pages/ReactFlow";
import UserAnswer from "../Pages/Users/user-answers";
import CreateBrand from "dmsPages/Branding/createBrand";
import SingleSlider from "dmsPages/singleSlider";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes}
          <Route path="/profile" element={<Profile />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/user-detail" element={<UserDetail />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/user-answers" element={<UserAnswer />} />
          <Route path="/single-slider" element={<SingleSlider />} />
        </Route>

        <Route path="/brands" element={<CreateBrand />} />

        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/apitree" element={<ReactFlow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
