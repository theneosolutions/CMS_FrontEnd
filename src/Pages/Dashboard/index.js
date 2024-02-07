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
import { useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

function App() {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const dispatch = useDispatch();

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
          heading={t("3rd parties apis ")}>
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Companies")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Status")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Venue")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Date")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Time")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((v, k) => (
                <tr
                  key={k}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td
                    scope="row"
                    className="px-3 py-4 flex flex-row space-x-3 items-center rtl:space-x-reverse">
                    <Avatar
                      icon={v.avatar}
                      onClick={() => navigate("/profile")}
                    />

                    <a>{v.company}</a>
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {v.status}
                  </td>
                  <td className="px-3 py-4">{v.venue}</td>
                  <td className="px-3 py-4">{v.date}</td>
                  <td className="px-3 py-4">{v.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardMain>
        <CardMain
          width="w-full md:w-4/12 md:mt-0 mt-4"
          heading={t("Components List ")}>
          <Card color="bg-red-300" secondColor="bg-red-400" />
          <Card color="bg-blue-300" secondColor="bg-blue-400" />
          <Card color="bg-red-300" secondColor="bg-red-400" />
          <Card color="bg-green-300" secondColor="bg-green-400" />
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
function Card({ color, secondColor }) {
  return (
    <div className="border border-gray px-3 py-3 rounded-lg mt-3">
      <div className="flex flex-row justify-between ">
        <a className="text-gray-800 text-sm">Secreens number </a>
        <div
          className={`w-13 rounded-full h-5  flex flex-row items-center ${color}`}>
          <div
            className={`h-full w-5 rounded-full  items-center flex flex-row justify-center text-white ${secondColor}`}>
            <FaCaretDown />
          </div>
          <a className="text-xs px-2 text-white ">80%</a>
        </div>
      </div>

      <div className="flex flex-row justify-between mt-5 ">
        <a className="text-gray-800 text-sm font-semibold">36 </a>
        <div className="  flex flex-row items-center items-center justify-center">
          <a className="text-xs">Details</a>
          <FaChevronRight className="h-2" />
        </div>
      </div>
    </div>
  );
}
function Avatar({ icon, onClick }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/profile")}
      className="image-container relative inline-block duration-300 h-10 w-10 bg-gray-300">
      {/* <img
        onClick={onClick}
        src={icon}
        className="h-10 w-10 rounded-full cursor-pointer"
      /> */}
    </div>
  );
}

const data = [
  {
    id: "723748",

    company: "ELm",
    avatar:
      "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png",
    status: "Active",
    venue: "Avana 3",
    date: "21/06/2023",
    time: "02:09",
  },
  {
    id: "723748",

    company: "Nafath",
    avatar:
      "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png",
    status: "Active",
    venue: "Avana 3",
    date: "21/06/2023",
    time: "02:09",
  },
  {
    id: "723748",

    company: "Absher",
    avatar:
      "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png",
    status: "Active",
    venue: "Avana 3",
    date: "21/06/2023",
    time: "02:09",
  },
  {
    id: "723748",

    company: "Gosi",
    avatar:
      "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png",
    status: "Active",
    venue: "Avana 3",
    date: "21/06/2023",
    time: "02:09",
  },
  {
    id: "723748",

    company: "Yakeen",
    avatar:
      "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png",
    status: "Active",
    venue: "Avana 3",
    date: "21/06/2023",
    time: "02:09",
  },
];
