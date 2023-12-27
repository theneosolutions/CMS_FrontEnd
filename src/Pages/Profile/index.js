import React, { useState } from "react";

import ProfileTab from "./Tabs/profile";
import Applications from "./Tabs/applications";
import Documents from "./Tabs/documents";
import OtheReport from "./Tabs/otherReports";
import Product from "./Tabs/product";
import Reports from "./Tabs/reports";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { RxUpdate } from "react-icons/rx";

import { MdDeleteOutline } from "react-icons/md";

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
      setState("Profile");
      navigate(location.pathname + `?name=Profile`);
    }
  }, []);
  const getTab = () => {
    const activeItem = data.find((item) => item.label === state);
    return activeItem
      ? activeItem.tab
      : "Select an item to see the description.";
  };
  function setNavigation(stateValue) {
    if (stateValue === "Other Reports") {
      return navigate("/user-detail?name=Anti fraud Detail");
    }
    setState(stateValue);
    navigate(location.pathname + `?name=${stateValue}`);
  }
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="space-x-5 flex rtl:space-x-reverse">
          {data?.map((v, k) => {
            return (
              <button
                key={k}
                onClick={() => setNavigation(v.label)}
                className={`hover:shadow-lg shadow-md duration-300 rounded px-3 py-2 border-primary  border text-sm ${
                  state === v.label
                    ? "bg-primary text-white"
                    : "bg-white text-gray-800"
                }`}>
                {v.label}
              </button>
            );
          })}
        </div>
        <div className="space-x-5 flex flex-row rtl:space-x-reverse">
          <button className="hover:bg-opacity-80 items-center hover:shadow-lg text-white flex flex-row  space-x-1 rtl:space-x-reverse shadow-md duration-300 rounded px-5 py-2 border-primary  border text-sm bg-primary text-white">
            <a className="font-semibold">Update</a>{" "}
            <RxUpdate className="text-base text-white" />
          </button>
          <button className="hover:bg-opacity-80 flex flex-row  items-center rtl:space-x-reverse space-x-1 rtl:space-x-reverse hover:shadow-lg shadow-md duration-300 rounded px-5 py-2 border-red-400  border text-sm bg-red-400 text-white">
            <a className="font-semibold">Delete</a>{" "}
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      </div>

      <div className="flex flex-row space-x-5 mt-5 ">{getTab()}</div>
    </div>
  );
}
export default Template;

const data = [
  {
    label: "Profile",
    tab: <ProfileTab />,
  },
  {
    label: "Applications",
    tab: <Applications />,
  },
  {
    label: "Product",
    tab: <Product />,
  },
  {
    label: "Documents",
    tab: <Documents />,
  },
  {
    label: "Eligibility Reports ",
    tab: <Reports />,
  },
  {
    label: "Other Reports",
    tab: <OtheReport />,
  },
];
