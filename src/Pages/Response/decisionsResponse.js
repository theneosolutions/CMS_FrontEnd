import React, { useEffect } from "react";
import CardMain from "Components/Cards/main";
import { useState, useRef } from "react";
import { Button } from "Components";
import { RiImageAddLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [setId, setSetId] = useState();

  const [imageSuccess, setImageSucesss] = useState(null);
  const [imageError, setImageError] = useState(null);

  const fileInputRefSuccess = useRef(null); // Create a ref for the file input
  const fileInputRefError = useRef(null); // Create a ref for the file input
  const allSets = useSelector((state) => state.getAllSets);

  function handleSelectSuccessImage(e) {
    if (e.target.files && e.target.files[0]) {
      setImageSucesss(URL.createObjectURL(e.target.files[0]));
    }
  }
  function handleSelectErrorImage(e) {
    if (e.target.files && e.target.files[0]) {
      setImageError(URL.createObjectURL(e.target.files[0]));
    }
  }
  function handleClickSucccess() {
    fileInputRefSuccess.current.click();
  }
  function handleClickError() {
    fileInputRefError.current.click();
  }
  function handleSubmit(e) {
    e.preventDefault();
    var success = {
      image: imageSuccess,
      message: messageSuccess,
      description: desSuccess,
    };
    var error = {
      image: imageError,
      message: messageError,
      description: desError,
    };
    console.log("helo", {
      success,
      error,
    });
  }
  const [messageSuccess, setMessageSuccesss] = useState("");
  const [messageError, setMessageError] = useState("");
  const [desSuccess, setDesSuccess] = useState("");
  const [desError, setDesError] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const setid = queryParams.get("id");

  function getAllSets() {
    dispatch({
      type: "GET_ALL_SETS",
    });
  }
  useEffect(() => {
    if (setid) {
      setSetId(setid);
      setSelectedSetData(setid);
    }
    getAllSets();
  }, []);
  function setSelectedSetData(id) {
    navigate(location.pathname + `?id=${id}`);
    setSetId(id);
    dispatch({
      type: "GET_SINGLE_SET_DATA", // get all questions
      payload: { id: id, forUser: false },
    });
  }

  return (
    <div>
      <select
        value={setId}
        className="mb-4 p-2 px-4 border rounded mt-4 w-full border-primary cursor-pointer"
        onChange={(e) => setSelectedSetData(e.target.value)}>
        {setId ? null : <option value="Select">Select Set</option>}

        {allSets?.map((v, k) => {
          return (
            <option key={k} value={v.id}>
              {v.name}
            </option>
          );
        })}
      </select>
      {setId && (
        <form onSubmit={handleSubmit}>
          <CardMain width="w-full" heading={"Response for Eligibility 1"}>
            <div className="flex flex-row space-x-20 rtl:space-x-reverse mt-5">
              <div className="w-1/2 space-y-10 items-center bg-green-50 flex flex-col py-12">
                <a className="text-lg text-primary underline">
                  {" "}
                  For Success Response
                </a>

                <div
                  onClick={handleClickSucccess}
                  className="h-32 w-32 overflow-hidden rounded-full border border-primary text-center justify-center flex  flex-row items-center text-primary hover:bg-gray-100 duration-200 cursor-pointer">
                  {!imageSuccess && <RiImageAddLine style={{ fontSize: 70 }} />}
                  {imageSuccess && (
                    <img src={imageSuccess} className="h-full w-full " />
                  )}
                </div>
                <InputField
                  heading="Message"
                  value={messageSuccess}
                  onChange={(e) => setMessageSuccesss(e)}
                  style="w-52"
                />
                <InputField
                  heading="Description"
                  value={desSuccess}
                  onChange={(e) => setDesSuccess(e)}
                  style="w-72"
                />
              </div>
              <div className="w-1/2 space-y-10 items-center bg-red-50 flex flex-col py-12">
                <a className="text-lg text-red-600 underline">
                  {" "}
                  For Error Response
                </a>

                <div
                  onClick={handleClickError}
                  className="h-32 w-32 overflow-hidden rounded-full border border-primary text-center justify-center flex  flex-row items-center text-primary hover:bg-gray-100 duration-200 cursor-pointer">
                  {!imageError && <RiImageAddLine style={{ fontSize: 70 }} />}
                  {imageError && (
                    <img src={imageError} className="h-full w-full " />
                  )}
                </div>
                <InputField
                  id="firstName"
                  heading="Message"
                  value={messageError}
                  onChange={(e) => setMessageError(e)}
                  style="w-52"
                />
                <InputField
                  heading="Description"
                  value={desError}
                  onChange={(e) => setDesError(e)}
                  style="w-72"
                />
              </div>
            </div>
            <div className="flex flex-row justify-end mt-10">
              <Button
                type="submit"
                buttonValue="Submit"
                buttonStyle="px-20 py-2"
              />
            </div>
          </CardMain>
        </form>
      )}
      <div className="w-full">
        <input
          ref={fileInputRefSuccess}
          type="file"
          onChange={handleSelectSuccessImage}
          style={{ display: "none" }}
        />
      </div>
      <div className="w-full">
        <input
          ref={fileInputRefError}
          type="file"
          onChange={handleSelectErrorImage}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
export default CreateUser;

function InputField({ heading, value, onChange, type, style }) {
  return (
    <div className={`flex flex-col ${style}`}>
      <input
        required
        type={type || "text"}
        value={value}
        placeholder={heading}
        onChange={(e) => onChange(e.target.value)}
        className="border-primary border rounded-md px-3 py-2 outline-none mt-2 w-full"
      />
    </div>
  );
}
