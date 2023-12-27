import React from "react";
import CardMain from "../../../Components/Cards/main";
import { MdOutlineVerified } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function Absher() {
  return (
    <div className=" w-full flex flex-row space-x-5 rtl:space-x-reverse">
      <div className="w-1/2">
        <CardMain width="w-full	" heading={"Absher Verification Detail"}>
          <div className="space-y-6 my-5">
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">User Verification</a>
              <a className="text-gray-700 font-semibold flex flex-row rtl:space-x-reverse space-x-5">
                <MdOutlineVerified className="text-3xl text-green-700" />
              </a>
            </div>

            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Status</a>
              <a className="text-gray-700 font-semibold">Verified</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Client Id</a>
              <a className="text-gray-700 font-semibold">100012312</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Customer Id</a>
              <a className="text-gray-700 font-semibold">32</a>
            </div>

            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Transaction Id</a>
              <a className="text-gray-700 font-semibold">10-33-112-3331</a>
            </div>
          </div>
        </CardMain>
      </div>

      <div className="w-1/2">
        {" "}
        <CardMain width="w-full	" heading={"Absher Verification Detail"}>
          <div className="space-y-6 my-5">
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">User Verification</a>
              <a className="text-gray-700 font-semibold flex flex-row space-x-5 rtl:space-x-reverse">
                <RxCross2 className="text-3xl text-red-700" />
              </a>
            </div>

            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Status</a>
              <a className="text-gray-700 font-semibold">Not Verified</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Client Id</a>
              <a className="text-gray-700 font-semibold">100012312</a>
            </div>
            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Customer Id</a>
              <a className="text-gray-700 font-semibold">3566</a>
            </div>

            <div className="flex flex-row">
              <a className="w-2/5 text-gray-700 ">Transaction Id</a>
              <a className="text-gray-700 font-semibold">500000</a>
            </div>
          </div>
        </CardMain>
      </div>
    </div>
  );
}
export default Absher;
