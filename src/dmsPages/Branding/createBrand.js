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
import { BrandId } from "funtions/BrandId";

function CreateBrand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const getBrands = useSelector((state) => state.getAllBrands);
  const getBrand = useSelector((state) => state.getSingleBrand);
  console.log("getSingleBrand state", getBrand);

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };
  const { t } = useTranslation();

  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    if (BrandId()) {
      navigate("/branding/logo");
    }
    getAllBrands();
  }, [BrandId()]);
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "CREATE_BRAND",
      payload: brandName,
    });
    getAllBrands();
  }
  function getAllBrands() {
    dispatch({
      type: "GET_ALL_BRANDS",
    });
  }
  function handleBrand(v) {
    console.log("log log ", v);
    dispatch({
      type: "GET_SINGLE_BRAND",
      payload: v,
    });
  }
  // useEffect(() => {
  //   if (getBrand) {
  //     navigate("/dashboard/userlist");
  //   }
  // }, [getBrand]);

  return (
    <div className="flex flex-row  space-x-4 bg-gray-200 h-screen px-10 py-10">
      <WaveAnimation show={loading} />

      <CardMain width="w-1/2" heading={"Create Brand"}>
        <form onSubmit={handleSubmit}>
          <div className="flex md:flex-row flex-col md:space-x-20 mt-5 rtl:space-x-reverse">
            <div className=" w-full space-y-5">
              <InputField
                id="Brand Name"
                heading={t("Brand Name")}
                value={brandName}
                onChange={(e) => setBrandName(e)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end mt-10">
            <Button
              type="submit"
              buttonValue={t("Submit")}
              buttonStyle="px-20 py-1 w-full md:w-max"
            />
          </div>
        </form>
      </CardMain>
      {getBrands.length > 0 && (
        <CardMain width="w-1/2" heading={"All Brands"}>
          <div className="flex flex-col space-y-3">
            {getBrands.map((v, k) => {
              return (
                <div
                  onClick={() => handleBrand(v.id)}
                  className="px-3 py-6 items-center justify-center flex flex-row border-primary border rounded-lg hover:bg-secondry duration-200  ">
                  Brand :{" "}
                  <span className="text-primary px-1 font-bold">
                    {v.brandName}
                  </span>
                </div>
              );
            })}
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
