import React from "react";
import ProfileSidebar from "../../../Components/Cards/ProfileSidebar";

// import CompanyTabs from "./companyTabs";
function ProfileTab() {
  return (
    <div className="w-full">
      <div className="flex flex-row space-x-5 rtl:space-x-reverse mt-5  w-full">
        <div className="w-1/4">
          <ProfileSidebar />
        </div>
        <div className="w-3/4	">
          <div className="description">
            <div className="flex flex-row space-x-4 rtl:space-x-reverse">
              <Card1 />
              <Card2 />
              <Card3 />
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <CompanyTabs /> */}
        <PersonalDetailCard />
      </div>
    </div>
  );
}
export default ProfileTab;
function PersonalDetailCard() {
  return (
    <div className=" mt-6 border border-primary w-full  px-4 flex flex-col justify-center rounded-lg py-5 bg-white space-y-4">
      <div className="flex flex-row justify-between">
        <div className="px-4 py-2 border border-primary rounded-md bg-gray-200 w-max text-sm bg-transparent">
          Personal Details
        </div>
        <div className="px-6 hover:bg-opacity-80 duration-200 py-2 border border-primary rounded-md  w-max text-sm   text-white bg-primary cursor-pointer ">
          See All Api Details
        </div>
      </div>

      <div>
        <a className="text-lg font-semibold">Family Info:</a>
        <div className="mt-5 flex flex-row space-x-8 rtl:space-x-reverse ">
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <a className="text-lg font-semibold">Residential info</a>
        <div className="mt-5 flex flex-row space-x-8 rtl:space-x-reverse ">
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
          <div className="flex flex-col w-1/4	">
            <a className="text-md font-semibold text-gray-600">
              Food and living expenses
            </a>
            <a className="text-sm text-gray-600">(Monthly)</a>
            <div className="flex flex-row justify-between mt-5 bg-gray-50 rounded-md px-3 py-2 ">
              <a>900.00</a>
              <a className="text-sm text-gray-500 ">SAR </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Card1() {
  return (
    <div className="border border-primary w-1/3	 items-center flex flex-col justify-center rounded-lg py-9 bg-white space-y-14">
      <div className="px-4 py-1 border border-primary rounded-md bg-gray-200 w-max text-sm bg-transparent">
        Loan Details
      </div>
      <div className=" flex flex-col items-center justify-center  w-40 h-40 mt-5 rounded-full border-8 border-primary rounded-full">
        <a>Loan Amout</a>
        <a className="text-green-400 text-2xl">7800</a>
      </div>
      <div className="flex flex-col text-sm py-4 text-sm text-gray-500">
        <a>Remaining Amount : 4000</a>
        <a>Monthly installment : 300</a>
      </div>
    </div>
  );
}
function Card2() {
  return (
    <div className="border border-primary w-1/3	 items-center flex flex-col rounded-lg py-9 bg-white">
      <div className="px-4 py-1 border border-primary rounded-md bg-gray-200 w-max text-sm bg-transparent">
        User Activities
      </div>

      <div className="flex flex-col text-sm py-2 text-sm text-gray-500 mt-5">
        <a>Your Account is logged in</a>
        <a className="font-semibold">Mac Book Pro 10:34PM</a>
      </div>
      <div className="flex flex-col text-sm py-2 text-sm text-gray-500">
        <a>Your Account is logged in</a>
        <a className="font-semibold">Mac Book Pro 10:34PM</a>
      </div>
      <div className="flex flex-col text-sm py-2 text-sm text-gray-500">
        <a>Your Account is logged in</a>
        <a className="font-semibold">Mac Book Pro 10:34PM</a>
      </div>
      <div className="flex flex-col text-sm py-2 text-sm text-gray-500">
        <a>Your Account is logged in</a>
        <a className="font-semibold">Mac Book Pro 10:34PM</a>
      </div>
      <div className="flex flex-col text-sm py-2 text-sm text-gray-500">
        <a>Your Account is logged in</a>
        <a className="font-semibold">Mac Book Pro 10:34PM</a>
      </div>
      <div className=" mt-4 px-4 py-1 border border-primary rounded-md bg-gray-200 w-max text-sm bg-transparent">
        See All
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="border border-primary w-1/3	 items-center flex flex-col rounded-lg py-9 bg-white">
      <div className="px-4 py-1 border border-primary rounded-md bg-gray-200 w-max text-sm bg-transparent">
        Work & Education
      </div>

      <div className="flex flex-col text-sm py-2 text-sm text-gray-500 mt-5">
        <a className="font-semibold">Product Manger at DroitLab</a>
        <a className="text-xs">2023 - Present</a>
      </div>
      <div className="flex flex-col text-sm py-2 text-sm text-gray-500">
        <a className="font-semibold">Ui ux designer at Drobok</a>
        <a className="text-xs">2023 - Present</a>
      </div>
      <div className="flex flex-col text-sm py-2 text-sm text-gray-500">
        <a className="font-semibold">Student at Calloge</a>
        <a className="text-xs">2023 - Present</a>
      </div>
      <div className="flex flex-col text-sm py-2 text-sm text-gray-500">
        <a className="font-semibold">Ui ux designer at Drobok</a>
        <a className="text-xs">2023 - Present</a>
      </div>
      <div className="flex flex-col text-sm py-2 text-sm text-gray-500">
        <a className="font-semibold">Ui ux designer at Drobok</a>
        <a className="text-xs">2023 - Present</a>
      </div>
    </div>
  );
}
