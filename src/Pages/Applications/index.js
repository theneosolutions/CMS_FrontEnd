import React, { useState, useEffect } from "react";
import ModeButton from "../../Components/Buttons/ModeButton";
import MyApplication2 from "../../Components/Cards/MyApplications2";
import CardMain from "../../Components/Cards/main";
import MyTeam from "../../Components/Cards/MyTeam";
import MyActivity from "../../Components/Cards/MyActivity";
import MyTask from "../../Components/Cards/MyTasks";
import { GiHamburgerMenu } from "react-icons/gi"; // You can use other icons from react-icons
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { useLocation } from "react-router-dom";

// import { getUserAction } from "../../Services/Store/slice";
import ProfileSidebar from "../../Components/Cards/ProfileSidebar";

import { Alert, Snackbar } from "@mui/material";
function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const value = queryParams.get("value");

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  return (
    <div className="">
      <div className="mt-5 space-y-6 ">
        <div className="flex flex-row space-x-6 rtl:space-x-reverse">
          <CardMain width="w-full" heading={t(type)} des={value}>
            <MyApplication2 />
          </CardMain>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
