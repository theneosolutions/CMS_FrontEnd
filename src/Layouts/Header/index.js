import React, { useState, useRef, useEffect } from "react";

import { GiHamburgerMenu } from "react-icons/gi"; // You can use other icons from react-icons

import Alarm from "../../Assets/Images/alarm.svg";
import Message from "../../Assets/Images/message.svg";
import Chevron from "../../Assets/Images/chevron.svg";
import Globe from "../../Assets/Images/globe.svg";
import SearchIcon from "../../Assets/Images/searchIcon.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoSearchOutline } from "react-icons/io5";

function Header({ isOpen, toggleSidebar, className }) {
  const { t } = useTranslation();
  const brand = JSON.parse(localStorage.getItem("brand"));
  console.log("brandbrand", brand?.branding?.brandName);
  return (
    <div
      className={`px-3 md:px-10 py-4 flex flex-row justify-between  bg-secondry ${className}`}>
      <div className="flex flex-row space-x-4 rtl:space-x-reverse items-center">
        {isOpen ? null : (
          <div className="h-6 w-6">
            <GiHamburgerMenu
              className="mr-5 cursor-pointer h-full w-full"
              onClick={() => toggleSidebar()}
            />
          </div>
        )}
        <div className="flex flex-row items-center space-x-2 rtl:space-x-reverse md:flex hidden">
          <a className="text-xl underline text-primary ">
            {brand?.branding?.brandName}
          </a>

          <IoSearchOutline className="text-gray-600 text-lg" />
          <input
            placeholder={t("Search")}
            className="header-input bg-transparent outline-none text-gray-400"
          />
        </div>
      </div>
      <div className="flex flex-row md:space-x-3 space-x-1 rtl:space-x-reverse items-center">
        <div className="flex items-center flex-row md:space-x-3 space-x-1 rtl:space-x-reverse md:px-5 px-1">
          <Icons icon={Alarm} />
          <Icons icon={Message} notification={true} />
          <Icons2 icon={Globe} />
        </div>
        <div className="flex flex-row text-sm text-white items-center space-x-3 rtl:space-x-reverse">
          <div className="flex flex-col items-end">
            <a className="text-xs text-gray-600">{t("Admin")}</a>
            <a className="font-semibold md:text-base text-xs text-gray-600">
              Zain Malik
            </a>
          </div>
          <img
            className="md:h-10 md:w-10 h-6 w-6 rounded-full border "
            src="https://e7.pngegg.com/pngimages/304/305/png-clipart-man-with-formal-suit-illustration-web-development-computer-icons-avatar-business-user-profile-child-face.png"
          />{" "}
          <Dropdown />
        </div>
      </div>
    </div>
  );
}
export default Header;

const Icons2 = ({ icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLanguageChange = (language, direction) => {
    localStorage.setItem("preferredLanguage", language);
    localStorage.setItem("direction", direction);
    window.location.reload(true);
  };
  return (
    <div className={`relative inline-block text-left`} ref={dropDownRef}>
      <div
        onClick={toggleDropdown}
        className="h-6 w-6 md:h-8 md:w-8 bg-white border-gray-300 border rounded-full items-center text-center justify-center flex">
        <img src={icon} className="h-4 w-4 md:h-6 md:w-6" />
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1">
          <div className="py-1" role="none">
            <a
              onClick={() => handleLanguageChange("en", "ltr")}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
              role="menuitem"
              tabIndex="-1">
              English
            </a>
            <a
              onClick={() => handleLanguageChange("ar", "rtl")}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
              role="menuitem"
              tabIndex="-1">
              Arabic
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const Dropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown container

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const SwicthBrand = () => {
    console.log("switch ");
    localStorage.removeItem("brand");
    navigate("/brands");
  };
  // const isRTL = false;
  let isRTL = localStorage.getItem("direction");

  // Event listener to handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // useEffect to set up the event listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  function handleChangeMyAccount() {
    navigate("/my-account");
    setIsOpen(!isOpen);
  }
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button onClick={toggleDropdown} type="button" className="shadow-sm ">
          <img src={Chevron} />
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`origin-top-right absolute mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
            isRTL != "rtl" ? "right-0" : "left-0"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1">
          <div className="py-1" role="none">
            <a
              onClick={() => handleChangeMyAccount()}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
              role="menuitem"
              tabIndex="-1">
              My Account
            </a>
            <a
              onClick={SwicthBrand}
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
              role="menuitem"
              tabIndex="-1">
              Swicth Brand
            </a>
            <a
              onClick={toggleDropdown}
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
              role="menuitem"
              tabIndex="-1">
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const Icons = ({ icon, notification }) => {
  return (
    <div className="flex flex-row">
      <div className="h-6 w-6 border-gray-300 border md:h-8 md:w-8 bg-white rounded-full items-center text-center justify-center flex">
        <img src={icon} className="h-4 w-4 md:h-5 md:w-5" />
      </div>
      {notification && (
        <div className="bg-red-600 h-2 w-2 rounded-full -ml-2 border-white border-2"></div>
      )}
    </div>
  );
};
