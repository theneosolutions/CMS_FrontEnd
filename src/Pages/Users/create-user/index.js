import React from "react";
import CardMain from "../../../Components/Cards/main";
import { useState, useRef } from "react";
import { Button } from "Components";
import { RiImageAddLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import * as action from "Services/redux/reducer";

function CreateUser() {
  const dispatch = useDispatch();

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };
  const [image, setImage] = useState(null);
  const { t } = useTranslation();

  const fileInputRef = useRef(null); // Create a ref for the file input

  function handleSelectImage(e) {
    console.log("slec", e.target.files);
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  }
  function handleClick() {
    fileInputRef.current.click();
  }
  function handleSubmit(e) {
    e.preventDefault();

    // console.log("helo", {
    //   avatar: image,
    //   firstName: firstName,
    //   email: email,
    //   idNumber: idNumber,
    //   number: number,
    //   username: username,
    //   password: password,
    //   dateOfBirth: date, // assuming 'date' represents the date of birth
    //   role: role,
    // });
    CreateNewUser();
  }
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(new Date());
  const [role, setRole] = useState("option1");

  function CreateNewUser() {
    if (validatePassword()) {
      dispatch({
        type: "Add_NEW_USER",
        payload: {
          email: email,
          username: username,
          password: password,
          name: firstName,
        },
      });
    } else {
      dispatch(
        action.Message({
          message: "Password does not meet requirements",
          open: true,
          error: true,
        })
      ); // Closing the message

      // You can display an error message or take other actions based on your requirements.
    }
  }
  const validatePassword = () => {
    // Password requirements
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Check if all requirements are met
    if (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    ) {
      return true; // Password is valid
    } else {
      return false; // Password is not valid
    }
  };
  return (
    <div>
      {/* <WaveAnimation show={loading} /> */}
      <form onSubmit={handleSubmit}>
        <CardMain width="w-full" heading={"Create User"}>
          <div className="flex flex-row justify-center ">
            <div
              onClick={handleClick}
              className="h-32 w-32 overflow-hidden rounded-full border border-primary text-center justify-center flex  flex-row items-center text-primary hover:bg-gray-100 duration-200 cursor-pointer">
              {!image && <RiImageAddLine style={{ fontSize: 70 }} />}
              {image && <img src={image} className="h-full w-full " />}
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
            <div className="md:w-1/2 w-full space-y-5">
              <InputField
                id="firstName"
                heading={t("First Name")}
                value={firstName}
                onChange={(e) => setFirstName(e)}
              />
              <InputField
                heading={t("Email")}
                value={email}
                onChange={(e) => setEmail(e)}
              />
              <InputField
                heading={t("ID number")}
                value={idNumber}
                onChange={(e) => setIdNumber(e)}
              />
              <InputField
                type="number"
                heading={t("Mobile Number")}
                value={number}
                onChange={(e) => setNumber(e)}
              />
            </div>
            <div className="md:w-1/2 w-full md:mt-0 mt-3 space-y-5">
              <InputField
                heading={t("User Name")}
                value={username}
                onChange={(e) => setUserName(e)}
              />
              <Calender
                type="calendar"
                heading={t("DOB")}
                value={date}
                onChange={(e) => setDate(e)}
              />
              <InputField
                heading={t("Password")}
                value={password}
                onChange={(e) => setPassword(e)}
              />
              <Select
                heading={t("Choose Option")}
                type="select"
                // value={role}
                options={t(role)}
                onChange={(e) => setRole(e)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end mt-10">
            <Button
              type="submit"
              buttonValue={t("Submit")}
              buttonStyle="px-20 py-2 w-full md:w-max"
            />
          </div>
        </CardMain>
      </form>
      <div className="w-full">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleSelectImage}
          style={{ display: "none" }}
        />
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default CreateUser;

function Select({ heading, value, onChange, type }) {
  const { t } = useTranslation();

  var options = [
    { value: "option1", label: "Moderater" },
    { value: "option1", label: "Admin" },
    { value: "option2", label: "User" },
  ];
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>{" "}
      <select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </select>
    </div>
  );
}

function Calender({ heading, value, onChange, type }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <DatePicker
        selected={value}
        onChange={(date) => onChange(date)}
        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full"
      />
    </div>
  );
}

function InputField({ heading, value, onChange, type }) {
  return (
    <div className="flex flex-col w-full">
      <a className="text-sm text-gray-700">{heading}</a>

      <input
        // required
        type={type || "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full"
      />
    </div>
  );
}
