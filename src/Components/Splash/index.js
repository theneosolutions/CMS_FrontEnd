import React, { useRef } from "react";
import CardMain from "../../Components/Cards/main";
import { useTranslation } from "react-i18next";
import UplaodIcon from "../../Assets/dms/Images/uplaod.svg";
import { PiImageThin } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Lottie from "lottie-react";

function Splash({ lottieOptions, setLottieOptions, image, setImage }) {
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
    <div className="  w-full flex flex-col md:flex-row md:space-x-5 rtl:space-x-reverse">
      <div className="flex flex-row md:flex-row  w-full md:w-1/2">
        <CardMain width="w-full  h-max  md:mt-0 mt-4 " heading={t("Upload")}>
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
              {image?.name || "your-file-here.json"}
            </div>
          </div>
        </CardMain>
      </div>
      <div className="  md:w-1/2">
        <CardMain width=" h-max w-full md:mt-0 mt-4 " heading={t("Preview")}>
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
                <Lottie animationData={lottieOptions} loop={true} />
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
