import React from "react";
import CardMain from "Components/Cards/main";
import { useState, useRef } from "react";
import { Button } from "Components";
import { RiImageAddLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

function MyAccount() {
  const { t } = useTranslation();

  return (
    <div>
      <CardMain width="w-full" heading={t("My Profile")}>
        <div className="flex flex-row justify-center ">
          <div className="h-32 w-32 overflow-hidden rounded-full border border-primary text-center justify-center flex  flex-row items-center text-primary hover:bg-gray-100 duration-200 cursor-pointer">
            <img
              src={
                "data:image/jpeg;base64,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"
              }
              className="h-full w-full "
            />
          </div>
        </div>

        <div className="flex flex-row space-x-20 rtl:space-x-reverse mt-5">
          <div className="w-1/2 space-y-5">
            <InputField
              heading={t("First Name")}
              value="Lorem Ipsum"
              onChange={(e) => console.log("helo", e)}
            />
            <InputField
              heading={t("Email")}
              value="loremipsum@gmail.com"
              onChange={(e) => console.log("helo", e)}
            />
            <InputField
              heading={t("ID number")}
              value="3244-44-22"
              onChange={(e) => console.log("helo", e)}
            />
            <InputField
              type="number"
              heading={t("Mobile Number")}
              value="031544167899"
              onChange={(e) => console.log("helo", e)}
            />
          </div>
          <div className="w-1/2  space-y-5">
            <InputField
              heading={t("Last Name")}
              value="Lorem Ipsum "
              onChange={(e) => console.log("helo", e)}
            />
            <InputField
              type="calendar"
              heading={t("DOB")}
              value="20/23/2000"
              onChange={(e) => console.log("helo", e)}
            />
            <InputField
              heading={t("Password")}
              value="***********"
              onChange={(e) => console.log("helo", e)}
            />
            <InputField
              heading={t("Role")}
              value={t("Moderater")}
              onChange={(e) => console.log("helo", e)}
            />
          </div>
        </div>
        <div className="flex flex-row justify-end mt-10">
          <Button buttonValue={t("Edit")} buttonStyle="px-20 py-2" />
        </div>
      </CardMain>
    </div>
  );
}
export default MyAccount;

function InputField({ heading, value }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>
      <a className=" rounded-md  py-2 outline-none mt-2 w-full bg-gray-50 px-3">
        {value}
      </a>
    </div>
  );
}
