import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import * as action from "Services/redux/reducer";
import LeftSideBar from "./leftSidebar";
import { MdCloseFullscreen } from "react-icons/md";

function TestPage() {
  const dispatch = useDispatch();
  const getAppFlowData = useSelector((state) => state.getAppFlow);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const [state, setState] = React.useState(true);
  const [activeSideScreen, setActiveSideScreen] = React.useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    getAppFlow();
  }, []);
  useEffect(() => {
    setActiveSideScreen(getAppFlowData?.appFlow?.screenFlow[0]);
  }, [getAppFlowData?.appFlow?.screenFlow[0]]);
  function getAppFlow() {
    dispatch({
      type: "GET_APP_FLOW",
    });
  }
  const handleClose = () => {
    dispatch(action.Message({ open: true }));
  };

  return (
    <div
      className={` ${
        isFullScreen
          ? "fixed top-0 left-0 w-full h-full bg-gray-300   z-50"
          : ""
      }`}>
      <div
        style={{ height: isFullScreen ? "100vh" : "80vh" }}
        className="flex bg-black md:flex-row flex-col md:space-y-0 space-y-3 mt-5 md:mt-0 w-full flex w-full ">
        <WaveAnimation show={loading} />

        <div
          className={`${
            state ? "w-full md:w-1/5" : "w-full md:w-min"
          }		bg-gray-100  items-center  h-max `}>
          <LeftSideBar
            isFullScreen={isFullScreen}
            state={state}
            setState={(e) => setState(e)}
            getAppFlowData={getAppFlowData}
            onClick={(e) => setActiveSideScreen(e)}
            activeSideScreen={activeSideScreen}
          />
        </div>

        <div
          className={`${
            state ? "w-full md:w-3/5	" : "w-full"
          }	 flex   flex flex-row space-x-4 	 justify-center items-center`}>
          {activeSideScreen && (
            <div className="flex flex-wrap">
              <div className="w-full md:w-56 px-2 cursor-pointer">
                <div
                  className={`relative mt-4 w-full  bg-white border-4  rounded-3xl overflow-hidden`}>
                  <div className="w-full h-6 bg-gray-800 justify-center flex text-white text-xs items-center pb-1">
                    {activeSideScreen?.name}
                  </div>
                  <div className="w-full h-full">
                    <img
                      src={activeSideScreen?.components?.lottieFile}
                      className="w-full h-full object-cover"
                      alt="Your Image Alt Text"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-gray-800 md:w-1/5 ">
          <div className="m-4 h-5/6		flex flex-col justify-between">
            <div className="">
              <button className="top-4 right-4  text-gray-400   rounded w-max ">
                <MdCloseFullscreen
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="text-white cursor-pointer hover:opacity-70 duration-200 text-lg"
                />
              </button>
              <div className="w-full   h-full">
                <a className="w-full text-center  justify-center flex text-gray-800 text-semibold text-slate-400  underline text-xl">
                  {activeSideScreen?.name}
                </a>
                <div className="flex flex-col space-y-2 mt-3">
                  {activeSideScreen?.button?.map((v, k) => {
                    return (
                      <InputField
                        heading={v.name}
                        onChange={(e) => console.log(e)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="">
              <button
                onClick={() => console.log("helo")}
                className={`bg-gray-700  rounded-md w-full  w-full  mt-4 	 text-gray-400  px-5 py-1.5   hover:bg-gray-600  duration-300 `}>
                Create
              </button>
            </div>
          </div>
        </div>

        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          className="mt-4">
          <Alert
            onClose={handleClose}
            severity={!error ? "success" : "error"}
            sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default TestPage;

function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-400">{heading}</a>

      <input
        // required
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className=" rounded-md px-3 py-1 outline-none mt-2 w-full bg-gray-600"
      />
    </div>
  );
}

function Select({ heading, value, onChange, type }) {
  var options = [
    { value: "option1", label: "Moderater" },
    { value: "option1", label: "Admin" },
    { value: "option2", label: "User" },
  ];
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>{" "}
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
