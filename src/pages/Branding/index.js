import React, { useRef } from "react";
import CardMain from "../../Components/Cards/main";
import { useTranslation } from "react-i18next";
import UplaodIcon from "../../Assets/dms/Images/uplaod.svg";
import { PiImageThin } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Lottie from "lottie-react";
import { FaRegSave } from "react-icons/fa";
import { RxReset } from "react-icons/rx";

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
  const fileInputRef = useRef(null); // Create a ref for the file input

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
    <div className="mt-5  w-full">
      <div className="flex flex-col md:flex-col w-full ">
        <CardMain width=" w-full h-max  md:mt-0 mt-4" heading={t("Upload")}>
          <div className="flex flex-row space-x-4 rtl:space-x-reverse">
            <div className="w-1/2">
              <div
                onClick={handleClick}
                className="border  bg-secondry rounded-md border-dashed	 border-slate-200 items-center flex flex-col justify-center px-4 py-8">
                <img src={UplaodIcon} />
                <a className="font-semibold mt-2 text-sm">
                  {t("Drag & drop files or")}{" "}
                  <span className="underline text-primary font-bold cursor-pointer hover:opacity-80 duration-300">
                    {t("Browse")}
                  </span>
                </a>
                <a className="text-xs text-gray-600 mt-3">
                  {t("Supported formates")}: JSON (Lottie File)
                </a>
              </div>
            </div>

            <div className=" w-1/2">
              <div className="flex flex-row space-x-6 rtl:space-x-reverse">
                <div className="flex flex-col text-xs w-1/2    text-gray-700   ">
                  <a>{t("Title")}</a>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder={t("Slide Title")}
                    className="rounded-md w-full bg-secondry py-2 px-3 outline-none mt-2  text-sm"
                  />
                </div>
                <div className="flex flex-col text-xs w-1/2    text-gray-700   ">
                  <a>Position{t("Title")}</a>
                  <input
                    type="number"
                    onChange={(e) => setPosition(e.target.value)}
                    value={position}
                    placeholder={t("Slide Position")}
                    className="rounded-md w-full bg-secondry py-2 px-3 outline-none mt-2  text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col text-xs   text-gray-700  mt-2 w-full  mt-3 pb-2">
                <a>{t("Description")}</a>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder={t("Description")}
                  className="rounded-md w-full bg-secondry py-2 px-3 outline-none mt-2 w-28 text-sm"
                />
              </div>
              {/* <div className="text-xs   px-4  border border-gray-500  py-2 text-gray-700 w-full mt-2 rounded-full">
                your-file-here.PDF
              </div> */}
            </div>
          </div>
        </CardMain>
        <div className=" mt-4  w-full ">
          <CardMain
            width=" h-max w-full md:w-full md:mt-0 mt-4 "
            heading={t("Preview")}>
            <div className="border  bg-secondry rounded-md border-dashed	 border-slate-200 flex flex-col px-4 py-4">
              <div className="flex flex-row  justify-between space-x-2 rtl:space-x-reverse flex flex-end">
                <div></div>
                <div className="flex flex-row  space-x-2 flex flex-end pb-4 rtl:space-x-reverse">
                  <FaRegEdit className="text-blue-500 cursor-pointer" />
                  <RiDeleteBin6Line className="text-red-400 cursor-pointer" />
                </div>
              </div>
              <div className=" flex flex-row items-center justify-center">
                {!image && !lottieOptions && (
                  <PiImageThin className="text-primary h-44  w-full" />
                )}
                <div className="w-32">
                  <Lottie animationData={lottieOptions} loop={true} />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between">
              <div></div>
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row rtl:space-x-reverse md:space-x-6 mt-10 mb-4">
                <div
                  onClick={resetImageSizes}
                  className="flex space-x-2 rtl:space-x-reverse flex-row rounded-lg text-xs justify-center items-center h-8 md:w-36 w-full border-red-400 cursor-pointer border text-gray-700 text-center">
                  <RxReset className="text-gray-500 cursor-pointer" />
                  <a className="">{t("Reset")}</a>
                </div>
                <button
                  disabled={
                    title && position && description && lottieOptions
                      ? false
                      : true
                  }
                  onClick={() => onsubmit()}
                  className="hover:opacity-80 text-white flex bg-primary space-x-2 rtl:space-x-reverse flex-row rounded-lg text-xs justify-center items-center h-8 md:w-36 w-full duration-200 cursor-pointer border text-center">
                  <FaRegSave className="text-white cursor-pointer" />
                  <a className="">{t("Save")}</a>
                </button>
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
