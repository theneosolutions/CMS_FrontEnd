import React from "react";
import CardMain from "../../../Components/Cards/main";
import { MdOutlineVerified } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function Takwa() {
  return (
    <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
      <div className="w-1/2">
        <CardMain width="w-full	" heading={"Takwa Verification Detail"}>
          <div className="space-y-6 my-2">
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Is Owner ?</a>
              <a className="text-gray-700 font-semibold text-green-700">Yes</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Refrence No.</a>
              <a className="text-gray-700 font-semibold">#1000123312</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Customer Id</a>
              <a className="text-gray-700 font-semibold">32566</a>
            </div>

            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Mobile</a>
              <a className="text-gray-700 font-semibold">0300410392399</a>
            </div>
          </div>
        </CardMain>
      </div>

      <div className="w-1/2">
        {" "}
        <CardMain width="w-full	" heading={"Takwa Verification Detail"}>
          <div className="space-y-6 my-2">
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Is Owner ?</a>
              <a className="text-gray-700 font-semibold text-red-700">No</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Refrence No.</a>
              <a className="text-gray-700 font-semibold">#1000123312</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Customer Id</a>
              <a className="text-gray-700 font-semibold">32566</a>
            </div>

            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Mobile</a>
              <a className="text-gray-700 font-semibold">0300410392399</a>
            </div>
          </div>
        </CardMain>
      </div>
    </div>
  );
}
export default Takwa;
