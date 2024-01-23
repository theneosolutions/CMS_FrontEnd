import React, { useState, useEffect, useRef } from "react";
import CardMain from "../../Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import UplaodIcon from "../../Assets/dms/Images/uplaod.svg";
import { PiImageThin } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BrandId } from "funtions/BrandId";
import { RxReset } from "react-icons/rx";
import { RxUpdate } from "react-icons/rx";
import { FaRegSave } from "react-icons/fa";

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [heightInitial, setHeightInitial] = useState(90);
  const [widthInitial, setWidthInitial] = useState(90);
  const [mainheight, setMainHeight] = useState(90);
  const [mainwidth, setMainWidth] = useState(90);
  const [height, setHeight] = useState(90);
  const [width, setWidth] = useState(90);

  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);

  const fileInputRef = useRef(null); // Create a ref for the file input
  const getBrand = useSelector((state) => state.getSingleBrand);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  function handleClick() {
    fileInputRef.current.click();
  }
  function handleSelectImage(e) {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      // Check if the selected file is either PNG or SVG
      if (
        selectedImage.type === "image/png" ||
        selectedImage.type === "image/svg+xml"
      ) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;

          img.onload = () => {
            setHeightInitial(img.height);
            setWidthInitial(img.width);
            setHeight(img.height);
            setWidth(img.width);
          };
        };
        reader.readAsDataURL(selectedImage);
        setImage(selectedImage);
        setImage2(URL.createObjectURL(selectedImage));
      } else {
        // Show an alert if the file type is not PNG or SVG
        alert("Please upload a PNG or SVG file.");
        // Optionally, you can reset the file input to clear the selected file
        e.target.value = null;
      }
    }
  }

  function setContent() {
    // Convert the height and width values to numbers
    const newHeight = parseFloat(height);
    const newWidth = parseFloat(width);

    // Check if the values are valid numbers
    if (!isNaN(newHeight) && !isNaN(newWidth)) {
      setMainHeight(newHeight);
      setMainWidth(newWidth);
    } else {
      console.error("Invalid height or width values");
    }
  }
  const resetImageSizes = () => {
    setHeight(heightInitial);
    setWidth(widthInitial);
    setMainHeight(heightInitial);
    setMainWidth(widthInitial);
  };
  function CreateLogo(e) {
    const data = {
      height: mainheight,
      width: mainwidth,
      image: image,
    };

    console.log("this is data ", data);
    dispatch({
      type: "CREATE_LOGO",
      payload: data,
    });

    setTimeout(() => getBrandData(), 1000);
  }

  function getBrandData() {
    dispatch({
      type: "GET_SINGLE_BRAND",
      payload: BrandId(),
    });
  }
  useEffect(() => {
    if (getBrand?.brandingLogoDetail?.brandLogoContent) {
      setImage2(
        `data:image/jpeg;base64,${getBrand?.brandingLogoDetail?.brandLogoContent}`
      );
      setHeight(getBrand?.brandingLogoDetail?.brandLogo?.height);
      setWidth(getBrand?.brandingLogoDetail?.brandLogo?.width);
    }
  }, [getBrand]);
  return (
    <div className="container mx-auto mt-5 space-y-6">
      <div className="flex flex-col lg:flex-col  rtl:space-x-reverse">
        <CardMain width="w-full h-max lg:mt-0 mt-4 " headerDisable={true}>
          <div className="pt-1 pb-1">
            <div
              onClick={handleClick}
              className="border  bg-secondry rounded-md border-dashed	 border-slate-200 items-center flex flex-col justify-center px-4 py-8">
              <img src={UplaodIcon} className="w-14" />
              <a className="font-semibold mt-2 text-sm">
                {t("Drag & drop files or")}{" "}
                <span className="underline text-primary font-bold cursor-pointer hover:opacity-80 duration-300">
                  {t("Browse")}
                </span>
              </a>
              <a className="text-xs text-gray-600 mt-1">
                {t("Supported formates")} : {t("PNG")},{t("SVG")}
              </a>
            </div>
          </div>
        </CardMain>
        <CardMain width=" h-max w-full  mt-4 " headerDisable={true}>
          <div className="border  bg-secondry rounded-md border-dashed	 border-slate-200 flex flex-col px-4 py-4 mt-2">
            <div className="flex flex-row  justify-between space-x-2 flex flex-end rtl:space-x-reverse">
              <div></div>
              <div className="flex flex-row rtl:space-x-reverse space-x-2 flex flex-end pb-4">
                <FaRegEdit className="text-blue-500 cursor-pointer" />
                <RiDeleteBin6Line className="text-red-400 cursor-pointer" />
              </div>
            </div>
            <div className=" flex flex-row items-center justify-center">
              {!image && !image2 && (
                <PiImageThin
                  className="text-primary "
                  style={{ height: mainheight, width: mainwidth }}
                />
              )}
              {image2 && (
                <img
                  src={image2}
                  style={{ height: mainheight, width: mainwidth }}
                />
              )}
              {/* <img
                  src={`data:image/jpeg;base64,${getBrand.logoContent}`}
                  style={{ height: mainheight, width: mainwidth }}
                /> */}
            </div>
          </div>
          <div className="flex flex-row space-x-6 mt-6 rtl:space-x-reverse">
            <div className="md:w-28 w-5/12	 flex flex-col text-xs   text-gray-700  mt-2">
              <a>{t("Height")} (px)</a>
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="rounded-md bg-secondry py-2 px-3 outline-none mt-2  text-sm"
              />
            </div>
            <div className="md:w-28 w-5/12	 flex flex-col text-xs   text-gray-700  mt-2">
              <a>{t("Width")} (px)</a>
              <input
                onChange={(e) => setWidth(e.target.value)}
                value={width}
                className="rounded-md bg-secondry py-2 px-3 outline-none mt-2  text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div></div>
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6 rtl:space-x-reverse mt-10 mb-4">
              <div
                onClick={resetImageSizes}
                className="flex rtl:space-x-reverse space-x-2 flex-row rounded-lg text-xs justify-center items-center h-8 md:w-36 w-full border-red-400 cursor-pointer border text-gray-700 text-center">
                <RxReset className="text-gray-500 cursor-pointer" />
                <a className="">{t("Reset")}</a>
              </div>

              <div
                onClick={() => setContent()}
                className="flex rtl:space-x-reverse space-x-2 flex-row rounded-lg text-xs justify-center items-center h-8 md:w-36 w-full border-blue-400 cursor-pointer border text-gray-700 text-center">
                <RxUpdate className="text-gray-500 cursor-pointer" />
                <a className="">{t("Update Pixels")}</a>
              </div>

              <div
                onClick={() => CreateLogo()}
                className="rtl:space-x-reverse hover:opacity-80 text-white flex bg-primary space-x-2 flex-row rounded-lg text-xs justify-center items-center h-8 md:w-36 w-full duration-200 cursor-pointer border text-center">
                <FaRegSave className="text-white cursor-pointer" />
                <a className="">{t("Save")}</a>
              </div>
            </div>
          </div>
        </CardMain>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleSelectImage}
        style={{ display: "none" }}
      />
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        className="mt-4">
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

export default App;
