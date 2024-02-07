import React, { useState, useEffect, useRef } from "react";
import CardMain from "Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import UplaodIcon from "Assets/dms/Images/uplaod.svg";
import { FaEye } from "react-icons/fa";
import { Button } from "Components";
import { useNavigate, useLocation } from "react-router-dom";

import AllMedia from "./Tabs/AllMedia";
import Audio from "./Tabs/Audio";
import Documents from "./Tabs/Documents";
import Image from "./Tabs/Image";
import Video from "./Tabs/Video";

function ListMedia() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const [state, setState] = useState("");

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  function setNavigation(stateValue) {
    setState(stateValue);
    navigate(location.pathname + `?name=${stateValue}`);
  }
  return (
    <div className="container mx-auto mt-5 space-y-6">
      <div className="flex flex-row items-center space-x-4 justify-between">
        <div className="h-3 w-full flex flex-row items-center rounded-xl overflow-hidden	 bg-gray-300">
          <div className="h-full w-10/12 rounded-xl	bg-primary"></div>
        </div>
        <a>80%</a>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-6 rtl:space-x-reverse">
        <CardMain width="w-full h-max  md:mt-0 mt-4 " headerDisable={true}>
          <div className="space-x-6 flex rtl:space-x-reverse mx-2 mt-3">
            {data?.map((v, k) => {
              return (
                <button
                  key={k}
                  onClick={() => setNavigation(v.label)}
                  className={`hover:shadow-lg shadow-md duration-300 rounded px-5 py-2 border-primary  border text-sm ${
                    state === v.label
                      ? "bg-primary text-white"
                      : "bg-white text-gray-800"
                  }`}>
                  {v.label}
                </button>
              );
            })}
          </div>
          <div className=" my-3 ">
            <h1 className="text-sm mx-2">Dec 10, 2020</h1>
            <div className="flex flex-wrap">
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => {
                return (
                  <div className=" h-52 w-1/5 p-2">
                    <div className="bg-gray-200 h-full w-full rounded-lg"></div>
                  </div>
                );
              })}
            </div>
          </div>
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

export default ListMedia;

const data = [
  {
    label: "All",
    tab: <AllMedia />,
  },
  {
    label: "Image",
    tab: <Image />,
  },
  {
    label: "Video",
    tab: <Video />,
  },
  {
    label: "Audio",
    tab: <Audio />,
  },
  {
    label: "Document",
    tab: <Documents />,
  },
];
