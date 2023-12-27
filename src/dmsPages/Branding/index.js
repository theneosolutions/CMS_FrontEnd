import React, { useState, useRef, useEffect } from "react";
import CardMain from "../../Components/Cards/main";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import UplaodIcon from "../../Assets/dms/Images/uplaod.svg";
import { Button } from "../../Components";
import { PiImageThin } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Lottie from "lottie-react";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import { BrandId } from "funtions/BrandId";

function App({
  lottieOptions,
  setLottieOptions,
  image,
  setImage,
  onsubmit,
  title,
  setTitle,
  description,
  setDescription,
  position,
  setPosition,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //   const [lottieOptions, setLottieOptions] = useState(null);

  //   const [image, setImage] = useState(null);

  const fileInputRef = useRef(null); // Create a ref for the file input
  const getBrand = useSelector((state) => state.getSingleBrand);
  useEffect(() => {
    if (getBrand?.brandingSplashScreen) {
      // console.log(
      //   "getBrand?.brandingSplashScreen",
      //   getBrand?.brandingSplashScreen
      // );
      // setLottieOptions(JSON.parse(getBrand?.brandingSplashScreen));
    }
  }, []);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  function handleClick() {
    fileInputRef.current.click();
  }

  function handleSelectImage(e) {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      // Check if the file is a JSON file
      if (selectedImage.name.endsWith(".json")) {
        const maxSize = 20 * 1024 * 1024; // 20 MB in bytes

        // Check if the file size is within the limit
        if (selectedImage.size <= maxSize) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const animationData = JSON.parse(event.target.result);
            setLottieOptions(animationData);
          };
          reader.readAsText(selectedImage);
          setImage(selectedImage);
        } else {
          // Display an error message for files exceeding the size limit
          alert(
            "File size exceeds the limit. Please upload a file up to 10 MB."
          );
          // Optionally, you can reset the file input
          e.target.value = null;
        }
      } else {
        // Display an error message for non-JSON files
        alert("Please upload a JSON file (Lottie File).");
        // Optionally, you can reset the file input
        e.target.value = null;
      }
    }
  }

  const resetImageSizes = () => {
    setImage(null);
    setLottieOptions(null);
  };

  function CreateSplash() {
    const data = {
      image: image,
    };
    dispatch({
      type: "CREATE_SPLASH",
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

  return (
    <div className="mt-5  w-full">
      <div className="flex flex-col md:flex-row w-full space-x-5">
        <CardMain width="w-1/2 h-max  md:mt-0 mt-4" heading={t("Upload")}>
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
                Supported formates: JSON (Lottie File)
              </a>
            </div>

            <div className="text-xs  px-4  border border-gray-100 h-full py-2 text-gray-700 w-full mt-2 rounded-full">
              your-file-here.PDF
            </div>
            <div className="flex flex-row space-x-6 mt-3">
              <div className="flex flex-col text-xs w-1/2    text-gray-700  mt-2  ">
                <a>Title</a>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Slide Title"
                  className="rounded-md w-full bg-secondry py-2 px-3 outline-none mt-2  text-sm"
                />
              </div>
              <div className="flex flex-col text-xs w-1/2    text-gray-700  mt-2  ">
                <a>Position</a>
                <input
                  onChange={(e) => setPosition(e.target.value)}
                  value={position}
                  placeholder="Slide Position"
                  className="rounded-md w-full bg-secondry py-2 px-3 outline-none mt-2  text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col text-xs   text-gray-700  mt-2 w-full  mt-3 pb-2">
              <a>Description</a>
              <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Discription"
                className="rounded-md w-full bg-secondry py-2 px-3 outline-none mt-2 w-28 text-sm"
              />
            </div>
          </div>
          <Button
            buttonDisable={
              title && position && description && lottieOptions ? false : true
            }
            onButtonClick={onsubmit}
            buttonValue="UPLOAD FILES"
            buttonStyle="w-full my-2 mt-5 text-xs font-semibold "
          />
        </CardMain>
        <div className="md:mt-0 mt-4 w-1/2 ">
          <CardMain
            width=" h-max w-full md:w-full md:mt-0 mt-4 "
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
                {!image && !lottieOptions && (
                  <PiImageThin className="text-primary h-44  w-full" />
                )}
                <div className="">
                  <Lottie
                    animationData={lottieOptions}
                    loop={true}
                    // height={200}
                    // width={200}
                  />
                </div>
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
            </div>
          </CardMain>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleSelectImage}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default App;
