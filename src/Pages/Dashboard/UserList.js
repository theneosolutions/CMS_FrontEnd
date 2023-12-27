import React, { useState, useEffect } from "react";
import ModeButton from "../../Components/Buttons/ModeButton";
import MyApplication from "../../Components/Cards/MyApplications";
import CardMain from "../../Components/Cards/main";
import MyTeam from "../../Components/Cards/MyTeam";
import MyActivity from "../../Components/Cards/MyActivity";
import MyTask from "../../Components/Cards/MyTasks";
import { GiHamburgerMenu } from "react-icons/gi"; // You can use other icons from react-icons
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";

function App() {
  const { t } = useTranslation();
  const DummyData = useSelector((state) => state.dummy);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  return (
    <div className="container mx-auto mt-5 space-y-6">
      <div className="flex flex-col md:flex-row md:space-x-6 rtl:space-x-reverse">
        <CardMain
          width="w-full md:w-8/12 md:mt-0 mt-4"
          heading={t("My Applications")}
          des={"1,406 " + t("In Process")}>
          <MyApplication />
        </CardMain>
        <CardMain
          width="w-full md:w-4/12 md:mt-0 mt-4"
          heading={t("My Activity")}
          des={t(" Last ") + 5 + t(" Weeks ")}>
          <MyActivity />
        </CardMain>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6 rtl:space-x-reverse">
        <CardMain
          width="w-full md:w-8/12 md:mt-0 mt-4"
          heading={t("My Tasks")}
          des={`24 ` + t("Open")}>
          <MyTask />
        </CardMain>
        <CardMain
          width="w-full md:w-4/12 md:mt-0 mt-4"
          heading={t("My Team")}
          des={`4 ` + t("Online")}>
          <MyTeam />
        </CardMain>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        className="mt-4">
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
