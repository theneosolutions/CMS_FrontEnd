import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoUnverified } from "react-icons/go";
import { useTranslation } from "react-i18next";
import Data from "./_data";
import CardMain from "../../../Components/Cards/main";
import Edit from "../../../Assets/Images/edit.svg";
import Delete from "../../../Assets/Images/delete.svg";
import { Model, Avatar } from "../../../Components";
import Approved from "../../../Assets/Images/approved.svg";
import Hold from "../../../Assets/Images/hold.svg";

function VerifiedUsers() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpenApprove, setModelOpenApprove] = useState(false);
  const [modelOpenHold, setModelOpenHold] = useState(false);

  function onDelete() {
    setModelOpen(true);
  }
  function onApprove() {
    setModelOpenApprove(true);
  }
  function onHold() {
    setModelOpenHold(true);
  }
  return (
    <div className="py-5">
      <CardMain
        width="w-full"
        heading={t("Un-Verified Users")}
        icon={<GoUnverified />}
        iconStyle="text-3xl text-green-600">
        <div className="overflow-x-auto relative  mt-4">
          <table className="w-full whitespace-nowrap  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("User Id")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("Main Name")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("First Name")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Last Name")}
                </th>
                <th scope="col" className="px-3 py-3">
                  {t("Approved/Hold")}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 cursor-pointer  sticky right-0 bg-white z-10">
                  {t("Edit/Delete")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Data.map((v, k) => (
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

                    <a>{v.id}</a>
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {v.mainName}
                  </td>
                  <td className="px-3 py-4">{v.firstName}</td>
                  <td className="px-3 py-4">{v.lastName}</td>
                  <td className="px-3 py-4 flex flex-row space-x-5 rtl:space-x-reverse">
                    <img
                      src={Approved}
                      onClick={() => onApprove()}
                      className="h-6 cursor-pointer"
                    />
                    <img
                      src={Hold}
                      onClick={() => onHold()}
                      className="h-6 cursor-pointer"
                    />
                  </td>
                  <th
                    scope="row"
                    className=" px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white sticky right-0 bg-white z-10">
                    <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                      <img src={Edit} className="h-6 cursor-pointer" />
                      <img
                        src={Delete}
                        className="h-6 cursor-pointer"
                        onClick={() => onDelete()}
                      />
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardMain>

      <Model
        heading="Delete User"
        isOpen={modelOpen}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpen(!modelOpen)}
        action1Value="Cancel"
        action2Value="Delete"
        action2={() => setModelOpen(false)}
        action1={() => setModelOpen(!modelOpen)}>
        <a className=" text-xl text-gray-800 ">
          Are You Sure To Delete
          <span className="font-semibold"> Ali Imtayaz</span> ?
        </a>
      </Model>
      <Model
        heading="Approve User"
        isOpen={modelOpenApprove}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpenApprove(!modelOpenApprove)}
        action1Value="Cancel"
        action2Value="Approve"
        action2={() => setModelOpenApprove(false)}
        action1={() => setModelOpenApprove(!modelOpenApprove)}>
        <a className=" text-xl text-gray-800 ">
          Are You Sure Approve ?
          <span className="font-semibold"> Ali Imtayaz</span> ?
        </a>
      </Model>
      <Model
        heading="Hold User"
        isOpen={modelOpenHold}
        style="w-1/3"
        innerStyle="py-10"
        setState={() => setModelOpenHold(!modelOpenHold)}
        action1Value="Cancel"
        action2Value="Hold"
        action2={() => setModelOpenHold(false)}
        action1={() => setModelOpenHold(!modelOpenHold)}>
        <a className=" text-xl text-gray-800 ">
          Are You Sure to Hold ?
          <span className="font-semibold"> Ali Imtayaz</span> ?
        </a>
      </Model>
    </div>
  );
}
export default VerifiedUsers;
