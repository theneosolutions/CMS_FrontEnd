import { MdCloseFullscreen } from "react-icons/md";
import { FaCaretRight } from "react-icons/fa";
import React, { useState, useEffect } from "react";

function LeftSideBar({ state, setState, getAppFlowData, onClick }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNodes = getAppFlowData?.appFlow?.screenFlow?.filter((node) =>
    node?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="bg-gray-800 h-full" style={{ height: "80vh" }}>
      {state ? (
        <>
          <div className="   h-1/2  ">
            <div className="overflow-auto">
              {" "}
              <div className="flex flex-row justify-between w-full bg-gray-600 py-2 px-3">
                <a className="text-white   text-sm  justify-center text-center flex  text-lg font-semibold opacity-70">
                  Screens
                </a>
                <MdCloseFullscreen
                  onClick={() => setState(!state)}
                  className="text-white cursor-pointer hover:opacity-70 duration-200 text-lg"
                />
              </div>
            </div>

            {/* <input
            className="text-sm w-full py-1 px-2 border-gray-300 border-2 rounded-sm outline-none"
            type="text"
            placeholder="Search Screen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
            <div className="flex flex-col    overflow-hidden h-4/5	">
              {filteredNodes?.map((v, k) => {
                return (
                  <div
                    className="cursor-pointer duration-200  text-xs text-gray-200 opacity-80 w-full py-1.5 hover:text-gray-800 px-3  hover:bg-gray-200 "
                    onClick={() => onClick(v)}>
                    {v.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="  h-1/2 overflow-auto">
            <div className="flex flex-row justify-between w-full bg-gray-600  py-2 px-3">
              <a className="text-white   text-sm  justify-center text-center flex  text-lg font-semibold opacity-70">
                Components
              </a>
              <MdCloseFullscreen
                onClick={() => setState(!state)}
                className="text-white cursor-pointer hover:opacity-70 duration-200 text-lg"
              />
            </div>
            {/* <input
            className="text-sm w-full py-1 px-2 border-gray-300 border-2 rounded-sm outline-none"
            type="text"
            placeholder="Search Screen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
            <div className="flex flex-col  ">
              <div className="cursor-pointer duration-200  text-xs text-gray-200 opacity-80 w-full py-1.5 hover:text-gray-800 px-3  hover:bg-gray-200 ">
                Text Field
              </div>
              <div className="cursor-pointer duration-200  text-xs text-gray-200 opacity-80 w-full py-1.5 hover:text-gray-800 px-3  hover:bg-gray-200 ">
                Card
              </div>
              <div className="cursor-pointer duration-200  text-xs text-gray-200 opacity-80 w-full py-1.5 hover:text-gray-800 px-3  hover:bg-gray-200 ">
                ScrollView
              </div>
              <div className="cursor-pointer duration-200  text-xs text-gray-200 opacity-80 w-full py-1.5 hover:text-gray-800 px-3  hover:bg-gray-200 ">
                Text
              </div>
              <div className="cursor-pointer duration-200  text-xs text-gray-200 opacity-80 w-full py-1.5 hover:text-gray-800 px-3  hover:bg-gray-200 ">
                Pressable
              </div>
              <div className="cursor-pointer duration-200  text-xs text-gray-200 opacity-80 w-full py-1.5 hover:text-gray-800 px-3  hover:bg-gray-200 ">
                Text
              </div>
              <div className="cursor-pointer duration-200  text-xs text-gray-200 opacity-80 w-full py-1.5 hover:text-gray-800 px-3  hover:bg-gray-200 ">
                ScrollView
              </div>

              {/* {filteredNodes?.map((v, k) => {
                return (
                  <div
                    className="cursor-pointer duration-200 text-sm text-gray-200 opacity-80 w-full  px-2   "
                    onClick={() => onClick(v)}>
                    {v.name}
                  </div>
                );
              })} */}
            </div>
          </div>
        </>
      ) : (
        <div
          className=" flex flex-col 	cursor-pointer p-2 "
          onClick={() => setState(!state)}>
          <FaCaretRight className="text-primary  hover:opacity-70 duration-200 text-2xl" />
        </div>
      )}
    </div>
  );
}

export default LeftSideBar;
