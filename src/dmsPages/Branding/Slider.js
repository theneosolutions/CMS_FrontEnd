import React, { useEffect } from "react";
import CardMain from "Components/Cards/main";
import { useState } from "react";
import { Button } from "Components";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import * as action from "Services/redux/reducer";
import { useNavigate } from "react-router-dom";

function CreateBrand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const allSliders = useSelector((state) => state.getAllSliders);
  // const getBrand = useSelector((state) => state.getSingleBrand);

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };
  const { t } = useTranslation();

  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    getAllBrands();
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/single-slider?name=${brandName}`);
  }
  function getAllBrands() {
    dispatch({
      type: "GET_ALL_SLIDERS",
    });
  }
  function handleBrand(v) {
    navigate(`/single-slider?name=${v}`);
  }

  return (
    <div className="flex flex-col   bg-gray-200 mt-5 md:mt-0">
      <WaveAnimation show={loading} />

      <CardMain width="w-full " headerDisable={true}>
        <form onSubmit={handleSubmit}>
          <div className="flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
            <div className=" w-full space-y-5">
              <InputField
                id="Brand Name"
                heading={t("Create New Slider")}
                value={brandName}
                onChange={(e) => setBrandName(e)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end mt-10">
            <Button
              type="submit"
              buttonValue={t("Create")}
              buttonStyle="px-20  w-full md:w-max"
            />
          </div>
        </form>
      </CardMain>
      {allSliders.length > 0 && (
        <CardMain width="w-full mt-4" heading={"All Sliders"}>
          <div className="flex flex-wrap    ">
            {allSliders?.map((v, k) => {
              return (
                <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-1 cursor-pointer">
                  <div
                    className="flex flex-col space-y-3 "
                    onClick={() => handleBrand(v?.mainTittle)}>
                    <div className="px-3 py-6 items-center justify-center flex flex-col border-primary border rounded-lg hover:bg-secondry duration-200  ">
                      <a>Slider Name : {v?.mainTittle}</a>
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </div>
        </CardMain>
      )}

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
export default CreateBrand;

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
