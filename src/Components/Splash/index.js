import React, { useRef } from "react";
import CardMain from "../../Components/Cards/main";
import { useTranslation } from "react-i18next";
import UplaodIcon from "../../Assets/dms/Images/uplaod.svg";
import { PiImageThin } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Lottie from "lottie-react";
import { Button } from "../../Components";
import { RxReset } from "react-icons/rx";
import { RxUpdate } from "react-icons/rx";
import { FaRegSave } from "react-icons/fa";
function Splash({
  lottieOptions,
  setLottieOptions,
  image,
  setImage,
  CreateSplash,
}) {
  const { t } = useTranslation();

  const fileInputRef = useRef(null); // Create a ref for the file input
  function handleClick() {
    fileInputRef.current.click();
  }

  function handleSelectImage(e) {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      if (selectedImage.name.endsWith(".json")) {
        const maxSize = 20 * 1024 * 1024; // 20 MB in bytes

        if (selectedImage.size <= maxSize) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const animationData = JSON.parse(event.target.result);
            setLottieOptions(animationData);
          };
          reader.readAsText(selectedImage);
          setImage(selectedImage);
        } else {
          alert(
            "File size exceeds the limit. Please upload a file up to 10 MB."
          );
          e.target.value = null;
        }
      } else {
        alert("Please upload a JSON file (Lottie File).");
        e.target.value = null;
      }
    }
  }

  const resetImageSizes = () => {
    setImage(null);
    setLottieOptions(null);
  };

  return (
    <div className="  w-full flex flex-col md:flex-col  rtl:space-x-reverse">
      <div className="flex flex-row md:flex-row  w-full ">
        <CardMain headerDisable={true} width="w-full  h-max  md:mt-0 mt-4 ">
          <div className="pt-1 pb-1">
            <div
              onClick={handleClick}
              className="border  bg-secondry rounded-md border-dashed	 border-slate-200 items-center flex flex-col justify-center px-4 py-8">
              <img src={UplaodIcon} className="w-14" />
              <a className="font-semibold mt-2 text-sm">
                Drag & drop files or{" "}
                <span className="underline text-primary font-bold cursor-pointer hover:opacity-80 duration-300">
                  Browse
                </span>
              </a>
              <a className="text-xs text-gray-600 mt-1">
                Supported formates: PNG , SVG
              </a>
            </div>
            {/* <div className="text-xs  px-4  border border-gray-100 h-full py-2 text-gray-700 w-full mt-2 rounded-full">
              {image?.name || "your-file-here.json"}
            </div> */}
          </div>
        </CardMain>
      </div>
      <CardMain width=" h-max w-full  mt-4 " headerDisable={true}>
        <div className="border  bg-secondry rounded-md border-dashed	 border-slate-200 flex flex-col px-4 py-4">
          <div className="flex flex-row  justify-between space-x-2 flex flex-end">
            <div></div>
            <div className="flex flex-row  space-x-2 flex flex-end pb-4">
              <FaRegEdit className="text-blue-500 cursor-pointer" />
              <RiDeleteBin6Line className="text-red-400 cursor-pointer" />
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center w-full ">
            {!image && !lottieOptions && (
              <PiImageThin className="text-primary h-44    w-full" />
            )}
            <div className="w-1/3	">
              <Lottie animationData={lottieOptions} loop={true} />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div></div>
          <div className="flex md:flex-row flex-col space-y-4 md:space-y-0 md:space-x-6 mt-10 mb-4">
            <div
              onClick={resetImageSizes}
              className="flex space-x-2 flex-row rounded-lg text-xs justify-center items-center h-8 md:w-36 w-full border-red-400 cursor-pointer border text-gray-700 text-center">
              <RxReset className="text-gray-500 cursor-pointer" />
              <a className="">Reset</a>
            </div>

            <div
              onClick={CreateSplash}
              className="text-white flex bg-primary space-x-2 flex-row rounded-lg text-xs justify-center items-center h-8 md:w-36 w-full hover:opacity-90 duration-200 cursor-pointer border text-center">
              <FaRegSave className="text-white cursor-pointer" />
              <a className="">UPLOAD FILES</a>
            </div>
          </div>
        </div>
      </CardMain>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleSelectImage}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default Splash;
