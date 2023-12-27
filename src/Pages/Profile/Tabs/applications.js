import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "../../../Components/Cards/ProfileSidebar";

import { ConvertToQuery } from "../../../funtions/toQuery";
function ApplicationTab() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row space-x-5 rtl:space-x-reverse mt-5 w-full">
      <div className="w-1/4">
        <ProfileSidebar />
      </div>
      <div className="w-3/4	">
        <div className="flex flex-row  space-x-7 rtl:space-x-reverse ">
          <App
            heading="Total No. Of Application"
            value="300"
            style="w-1/3"
            border="border-primary "
            onClick={() =>
              navigate(
                ConvertToQuery("/applications", [
                  { id: 1 },
                  { type: "Total No. Of Application" },
                  { value: 1000 },
                ])
              )
            }
          />

          <App
            heading="Viewed"
            value="10"
            border="border-purple-800"
            style="w-1/3"
            onClick={() => navigate("/applications?id=1&type=Viewed&value=300")}
          />

          <App
            heading="Approved"
            value="200"
            border="border-stone-600"
            style="w-1/3"
            onClick={() =>
              navigate("/applications?id=1&type=Approved&value=300")
            }
          />
        </div>
        <div className="flex flex-row space-x-7 rtl:space-x-reverse mt-6">
          <App
            heading="Rejected"
            value="7800"
            style="w-1/3"
            border="border-red-600"
            onClick={() =>
              navigate("/applications?id=1&type=Rejected&value=300")
            }
          />

          <App
            heading="Pending"
            value="7800"
            border="border-blue-300          "
            style="w-1/3"
            onClick={() =>
              navigate("/applications?id=1&type=Pending&value=300")
            }
          />

          <App
            heading="All Applications"
            value="7800"
            border="border-gray-400"
            style="w-1/3"
            onClick={() =>
              navigate("/applications?id=1&type=All Applications&value=300")
            }
          />
        </div>
      </div>
    </div>
  );
}
export default ApplicationTab;

function App({ heading, value, border, style, onClick }) {
  return (
    <div
      onClick={() => onClick()}
      className={`items-center border border-primary flex flex-col  px-4 py-4 rounded-md text-center pb-8  ${style} hover:bg-gray-100 hover:shadow-2xl bg-white duration-300 cursor-pointer`}>
      <a>{heading}</a>
      <div
        className={` flex flex-col items-center justify-center  w-32 h-32 mt-5 rounded-full border-8 ${border} rounded-full`}>
        <a className="text-gray-600 text-2xl">{value}</a>
      </div>
    </div>
  );
}
