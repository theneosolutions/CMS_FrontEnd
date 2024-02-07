import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const Sidebar = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-300 opacity-40 z-40"
          onClick={onClose}></div>
      )}
      <div
        className={`flex flex-col fixed top-0 right-0 h-full w-0 bg-white overflow-x-hidden transition-all duration-500 ${
          isOpen ? "w-72 z-50" : "z-10"
        }`}>
        <div className="m-4">
          <button
            className="top-4 right-4  text-gray-400   rounded w-max "
            onClick={onClose}>
            <IoCloseOutline className="text-2xl" />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
