import React, { useState } from "react";

import Antifraud from "./companyTabs/antiFraud";
import Absher from "./companyTabs/absher";
import Nafath from "./companyTabs/nafath";
import AmlDetails from "./companyTabs/amlDetails";
import Sima from "./companyTabs/sima";
import TakwaDetails from "./companyTabs/takwadetails";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Template() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const oldState = queryParams.get("name");

  const [state, setState] = useState("");
  useEffect(() => {
    if (oldState) {
      setState(oldState);
    } else {
      setState("Anti fraud Detail");
      // navigate(location.pathname + `?name=Anti fraud Detail`);
    }
  }, []);
  const getTab = () => {
    const activeItem = data.find((item) => item.label === state);
    return activeItem
      ? activeItem.tab
      : "Select an item to see the description.";
  };
  function setNavigation(stateValue) {
    setState(stateValue);
    navigate(location.pathname + `?name=${stateValue}`);
  }
  return (
    <div>
      <div className="space-x-5 flex">
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
      <div className="flex flex-row space-x-5 mt-5 ">{getTab()}</div>
    </div>
  );
}
export default Template;

const data = [
  {
    label: "Anti fraud Detail",
    tab: <Antifraud />,
  },
  {
    label: "Absher Detail",
    tab: <Absher />,
  },

  {
    label: "AML Details",
    tab: <AmlDetails />,
  },
  {
    label: "Takwa Details",
    tab: <TakwaDetails />,
  },
  {
    label: "Nafath Detail",
    tab: <Nafath />,
  },
  {
    label: "Sima Details",
    tab: <Sima />,
  },
];
