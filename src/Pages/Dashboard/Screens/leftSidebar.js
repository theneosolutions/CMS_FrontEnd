import { MdCloseFullscreen } from "react-icons/md";
import { FaCaretRight } from "react-icons/fa";
import React, { useState, useEffect } from "react";

function LeftSideBar({ state, setState, getAppFlowData, onClick }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNodes = getAppFlowData?.appFlow?.screenFlow?.filter((node) =>
    node?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      {state ? (
        <div className="px-3 py-3 pb-2">
          <div className="flex flex-row justify-between w-full">
            <a className="underline uppercase text-sm  justify-center text-center flex mb-2 text-lg font-semibold opacity-70">
              Screens
            </a>
            <MdCloseFullscreen
              onClick={() => setState(!state)}
              className="text-primary cursor-pointer hover:opacity-70 duration-200 text-lg"
            />
          </div>
          <input
            className="text-sm w-full py-1 px-2 border-gray-300 border-2 rounded-sm outline-none"
            type="text"
            placeholder="Search Screen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-col space-y-3 mt-4">
            {filteredNodes?.map((v, k) => {
              return (
                <div
                  className="cursor-pointer  hover:bg-gray-200  duration-200 shadow-lg text-sm text-gray-700 opacity-80 w-full py-1 px-2 border-gray-300 border rounded-sm text-center"
                  onClick={() => onClick(v.name)}>
                  {v.name}
                </div>
              );
            })}
          </div>
        </div>
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
