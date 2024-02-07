import React, { useState, useEffect, useRef } from "react";
import { Button, Tooltip } from "Components";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import * as action from "Services/redux/reducer";
import LeftSideBar from "./leftSidebar";

function TestPage() {
  const dispatch = useDispatch();
  const getAppFlowData = useSelector((state) => state.getAppFlow);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const [state, setState] = React.useState(true);
  const [activeSideScreen, setActiveSideScreen] = React.useState("");

  const [active, setActive] = useState();

  useEffect(() => {
    getAppFlow();
  }, []);
  function getAppFlow() {
    dispatch({
      type: "GET_APP_FLOW",
    });
  }
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  const handleInputChange = (value) => {
    setActiveSideScreen(value);
  };

  return (
    <div
      style={{ height: "80vh" }}
      className="flex bg-black md:flex-row flex-col md:space-y-0 space-y-3 mt-5 md:mt-0 w-full flex w-full "
    >
      <WaveAnimation show={loading} />

      <div
        className={`${
          state ? "w-full md:w-1/5" : "w-full md:w-min"
        }		bg-gray-100  items-center rounded-lg h-max `}
      >
        <LeftSideBar
          state={state}
          setState={(e) => setState(e)}
          getAppFlowData={getAppFlowData}
          onClick={(e) => handleInputChange(e)}
        />
      </div>
      <div
        className={`${
          state ? "w-full md:w-3/5	" : "w-full"
        }	 flex   flex flex-row space-x-4 	 justify-center`}
      >
        <div className="flex flex-wrap">
          <div className="w-full md:w-56 px-2 cursor-pointer">
            <div
              className={`relative mt-4 w-full  bg-white border-4  rounded-3xl overflow-hidden`}
            >
              <div className="w-full h-6 bg-gray-800 justify-center flex text-white text-xs items-center pb-1">
                {activeSideScreen?.name}
              </div>
              <div className="w-full h-full">
                <img
                  src={activeSideScreen?.components?.lottieFile}
                  className="w-full h-full object-cover" // Remove pb-6 to eliminate bottom padding
                  alt="Your Image Alt Text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 md:w-1/5">
        {" "}
        <div className="m-4">
          <button className="top-4 right-4  text-gray-400   rounded w-max "></button>
          <div className="w-full  ">
            <a className="w-full text-center  justify-center flex text-gray-800 text-semibold text-primary underline text-xl">
              {active?.name}
            </a>
            <div className="flex flex-col space-y-2">
              {active?.button?.map((v, k) => {
                return (
                  <InputField
                    heading={v.name}
                    onChange={(e) => console.log(e)}
                  />
                );
              })}
            </div>
            <div className="flex flex-row justify-between">
              <div></div>
              <Button
                onButtonClick={() => console.log("helo")}
                buttonValue={"Create"}
                buttonStyle="px-20 w-full md:w-max mt-4"
              />
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        className="mt-4"
      >
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TestPage;

function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <input
        // required
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-primary border rounded-md px-3 py-1 outline-none mt-2 w-full"
      />
    </div>
  );
}

const data = [
  {
    name: "Splash1",
    button: [
      { id: "button1Splash1", navigationLink: "Splash2", name: "Next" },
      { id: "button2Splash1", navigationLink: "Splash3", name: "Back " },
    ],
    component: {
      toggleButton: "en",
      lottieFile: "",
      text: "Choose your product from Seulah",
    },
  },
  {
    name: "Splash2",
    button: [
      { id: "button1Splash2", navigationLink: "LogIn", name: "Next" },
      { id: "button2Splash2", navigationLink: "", name: "Back" },
    ],
    component: {
      toggleButton: "en",
      lottieFile: "",
      text: "Choose your product from Seulah",
    },
  },
  {
    name: "Splash3",
    button: [
      { id: "button1Splash3", navigationLink: "Home", name: "Next" },
      { id: "button2Splash3", navigationLink: "Splash2", name: "Back" },
    ],
    component: {
      toggleButton: "en",
      lottieFile: "",
      text: "Choose your product from Seulah",
    },
  },
];

{
  /* <div className="w-full h-80 bg-gray-100 px-3 py-3 space-y-3 flex flex-col">
                    {v?.button.map((o, l) => {
                      return (
                        <Tooltip
                          text={
                            o?.navigationLink
                              ? o?.navigationLink
                              : "Navigation Not Set"
                          }>
                          <button
                            onClick={() => (
                              handleSidebarToggle(), setActive(v)
                            )}
                            className={`border border-gray-200 rounded-lg text-sm w-full py-1 ${
                              o?.navigationLink && "bg-green-200"
                            }`}>
                            <a className="text-sm">{o.name}</a>
                          </button>
                        </Tooltip>
                      );
                    })}
                  </div> */
}
