import { MdCloseFullscreen } from "react-icons/md";
import { FaCaretRight } from "react-icons/fa";
import React, { useState } from "react";
import "./sidebar.css";
function LeftSideBar({
  state,
  setState,
  getAppFlowData,
  onClick,
  isFullScreen,
  activeSideScreen,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNodes = getAppFlowData?.appFlow?.screenFlow?.filter((node) =>
    node?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Component = (yourObject) => {
    const objectArray = Object.entries(yourObject);
    return (
      <div>
        {objectArray?.map(([key, value]) => (
          <div
            key={key}
            className="cursor-pointer duration-200  text-sm text-gray-200 opacity-80 w-full py-2 hover:text-gray-800 px-3  hover:bg-gray-200 ">
            {key}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="bg-gray-800 h-full "
      style={{ height: isFullScreen ? "100vh" : "80vh" }}>
      {state ? (
        <>
          <div className="   h-1/2 ">
            <div className=" h-1/6	">
              <div className="flex flex-row justify-between w-full bg-gray-600  px-3 h-full items-center">
                <a className="text-white   text-sm  justify-center text-center flex  text-lg font-semibold opacity-70">
                  Screens
                </a>
                <MdCloseFullscreen
                  onClick={() => setState(!state)}
                  className="text-white cursor-pointer hover:opacity-70 duration-200 text-lg"
                />
              </div>
            </div>

            <div className="flex flex-col overflow-hidden overflow-y-auto h-4/5">
              {filteredNodes?.map((v, k) => (
                <div
                  className="cursor-pointer duration-200 text-sm text-gray-200 opacity-80 w-full py-2 hover:text-gray-800 px-3 hover:bg-gray-200"
                  onClick={() => onClick(v)}>
                  {v.name}
                </div>
              ))}
            </div>
          </div>
          <div className="  h-1/2 ">
            <div className="flex flex-row justify-between w-full bg-gray-600 px-3 h-1/6 items-center">
              <a className="text-white   text-sm  justify-center text-center flex  text-lg font-semibold opacity-70">
                Components
              </a>
              <MdCloseFullscreen
                onClick={() => setState(!state)}
                className="text-white cursor-pointer hover:opacity-70 duration-200 text-lg"
              />
            </div>

            <div className="flex flex-col  overflow-auto h-4/5">
              {activeSideScreen?.button?.map((v, k) => {
                return (
                  <div
                    key={k}
                    className="cursor-pointer duration-200  text-sm text-gray-200 opacity-80 w-full py-2 hover:text-gray-800 px-3  hover:bg-gray-200 ">
                    {v.name} (button)
                  </div>
                );
              })}
              {activeSideScreen && (
                <> {Component(activeSideScreen.components)}</>
              )}
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
