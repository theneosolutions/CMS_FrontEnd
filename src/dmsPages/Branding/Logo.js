import React, { useState, useEffect, useRef } from "react";
import CardMain from "../../Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import UplaodIcon from "../../Assets/dms/Images/uplaod.svg";
import { FaEye } from "react-icons/fa";
import { Button } from "../../Components";
import { PiImageThin } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { BrandId } from "funtions/BrandId";

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

  console.log("getSingleBrand", getBrand);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };
  function handleClick() {
    fileInputRef.current.click();
  }
  function handleSelectImage(e) {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      // Create a FileReader to read the dimensions of the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        // Set the height and width based on the image dimensions
        img.onload = () => {
          setHeightInitial(img.height);
          setWidthInitial(img.width);
          setHeight(img.height);
          setWidth(img.width);
        };
      };

      reader.readAsDataURL(selectedImage);

      // Set the file in the state
      setImage(selectedImage);
      setImage2(URL.createObjectURL(selectedImage));
    }
  }

  function setContent() {
    console.log("height", height, "width", width);

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
    dispatch({
      type: "CREATE_LOGO",
      payload: data,
    });
    // console.log("helo");
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
      console.log(
        "getBrand?.brandingLogoDetail?.brandLogo?.height",
        getBrand?.brandingLogoDetail?.brandLogo?.height
      );
      setHeight(getBrand?.brandingLogoDetail?.brandLogo?.height);
      setWidth(getBrand?.brandingLogoDetail?.brandLogo?.width);
    }
  }, [getBrand]);
  return (
    <div className="container mx-auto mt-5 space-y-6">
      <div className="flex flex-col md:flex-row md:space-x-6 rtl:space-x-reverse">
        <CardMain
          width="w-full h-max md:w-1/2 md:mt-0 mt-4"
          heading={t("Upload")}>
          <div>
            <div
              onClick={handleClick}
              className="border  bg-secondry rounded-md border-dashed	 border-slate-200 items-center flex flex-col justify-center px-4 py-8">
              <img src={UplaodIcon} />
              <a className="font-semibold mt-3">
                Drag & drop files or{" "}
                <span className="underline text-primary font-bold cursor-pointer hover:opacity-80 duration-300">
                  Browse
                </span>
              </a>
              <a className="text-xs text-gray-600 mt-3">
                Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
              </a>
            </div>
            <div className="mt-2">
              <a className="text-xs opacity-70 font-semibold">
                Uploading - 3/3 files
              </a>
            </div>

            <div className="text-xs  px-4  border border-gray-100 h-full py-2 text-gray-700 w-full mt-2 rounded-full">
              your-file-here.PDF
            </div>

            <div className="mt-2">
              <a className="text-xs opacity-70 font-semibold">Uploaded</a>
            </div>
            <div className="flex flex-row justify-between text-xs  px-4  border border-green-400 h-full py-2 text-gray-700 w-full mt-2 rounded-full">
              <a>Logo.png</a>
              <a>
                <FaEye className="text-base text-primary cursor-pointer" />
              </a>
            </div>
            <div className="flex flex-row justify-between text-xs  px-4  border border-green-400 h-full py-2 text-gray-700 w-full mt-2 rounded-full">
              <a>Logo.png</a>
              <a>
                <FaEye className="text-base text-primary cursor-pointer" />
              </a>
            </div>
            <Button
              buttonValue="UPLOAD FILES"
              buttonStyle="w-full my-2 mt-5 text-xs font-semibold "
            />
          </div>
        </CardMain>
        <CardMain
          width=" h-max w-full md:w-1/2 md:mt-0 mt-4 "
          heading={t("Preview")}>
          <div className="border  bg-secondry rounded-md border-dashed	 border-slate-200 flex flex-col px-4 py-4">
            <div className="flex flex-row  justify-between space-x-2 flex flex-end">
              <div></div>
              <div className="flex flex-row  space-x-2 flex flex-end pb-4">
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
          <div className="flex flex-row space-x-6 mt-10">
            <div className="flex flex-col text-xs   text-gray-700  mt-2">
              <a>Height (px)</a>
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="rounded-md bg-secondry py-2 px-3 outline-none mt-2 w-28 text-sm"
              />
            </div>
            <div className="flex flex-col text-xs   text-gray-700  mt-2">
              <a>Width (px)</a>
              <input
                onChange={(e) => setWidth(e.target.value)}
                value={width}
                className="rounded-md bg-secondry py-2 px-3 outline-none mt-2 w-28 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-row space-x-6 mt-10 mb-4">
            <div className="flex flex-col text-xs   text-gray-700  mt-2 w-1/3 items-center text-center">
              <a
                onClick={resetImageSizes}
                className="border-red-400 border px-4 p-1 rounded-lg  py-2 w-full cursor-pointer ">
                Reset
              </a>
            </div>
            <div className="flex flex-col text-xs   text-gray-700  mt-2 w-1/3 items-center text-center">
              <a
                onClick={CreateLogo}
                className="border-blue-400 border px-4 p-1 rounded-lg  py-2 w-full cursor-pointer ">
                Save
              </a>
            </div>
            <div className="flex flex-col text-xs   text-gray-700  mt-2 w-1/3 items-center text-center">
              <a
                onClick={() => setContent()}
                className="duration-300 border-primary text-white bg-primary border  w-full p-2 rounded-lg  cursor-pointer hover:opacity-80">
                Update
              </a>
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
