import React from "react";
import { FaTimes } from "react-icons/fa";
import appRoutes from "../../Routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import Logo from "../../Assets/Images/logo.svg";
import "./sidebar.css";
import { useTranslation } from "react-i18next";

function App({ isOpen, toggleSidebar }) {
  const sidebarWidth = isOpen ? "w-72" : "w-0"; // Adjust sidebar width
  const { t } = useTranslation();

  return (
    <div className="flex  flex-col bg-greeen-400">
      <div
        className={`h-screen ${sidebarWidth} text-white bg-primary  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out transform`}>
        <div style={{ height: "23vh" }} className="">
          <div className=" h-12 justify-end flex">
            <FaTimes
              size={20}
              onClick={() => toggleSidebar()}
              className="mt-5 mx-5 cursor-pointer"
            />
          </div>
          <div className="px-8">
            <img src={Logo} className="mb-5" />

            <a className="mt-10  uppercase">{t("Menu")}</a>
          </div>
        </div>

        <div className="mt-3 overflow-y-auto	" style={{ height: "77vh" }}>
          {appRoutes?.map((route, index) =>
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index} />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
