import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

import Header from "../Layouts/Header";
const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={` bg-gray-200 flex flex-row fixed w-full `}>
      <Sidebar isOpen={isOpen} toggleSidebar={() => toggleSidebar()} />
      <div className="w-full bg-gray-200 h-screen  relative overflow-scroll">
        <Header toggleSidebar={() => toggleSidebar()} isOpen={isOpen} />
        <div className="md:px-10 px-3 pb-8  md:pt-6">{<Outlet />}</div>
      </div>
    </div>
  );
};

export default MainLayout;
