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
import Splash from "Components/Splash";
function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [lottieOptions1, setLottieOptions1] = useState(null);
  const [lottieOptions2, setLottieOptions2] = useState(null);
  const [lottieOptions3, setLottieOptions3] = useState(null);
  const [lottieOptions4, setLottieOptions4] = useState(null);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);

  const getBrand = useSelector((state) => state.getSingleBrand);
  useEffect(() => {
    if (getBrand?.brandingSplashScreen) {
      console.log(
        "getBrand?.brandingSplashScreen",
        getBrand?.brandingSplashScreen
      );
      setLottieOptions1(JSON.parse(getBrand?.brandingSplashScreen));
    }
  }, []);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  // function handleSelectImage(e) {
  //   if (e.target.files && e.target.files[0]) {
  //     const selectedImage = e.target.files[0];

  //     // Check if the file is a JSON file
  //     if (selectedImage.name.endsWith(".json")) {
  //       const maxSize = 20 * 1024 * 1024; // 20 MB in bytes

  //       // Check if the file size is within the limit
  //       if (selectedImage.size <= maxSize) {
  //         const reader = new FileReader();
  //         reader.onload = (event) => {
  //           const animationData = JSON.parse(event.target.result);
  //           setLottieOptions(animationData);
  //         };
  //         reader.readAsText(selectedImage);
  //         setImage(selectedImage);
  //       } else {
  //         // Display an error message for files exceeding the size limit
  //         alert(
  //           "File size exceeds the limit. Please upload a file up to 10 MB."
  //         );
  //         // Optionally, you can reset the file input
  //         e.target.value = null;
  //       }
  //     } else {
  //       // Display an error message for non-JSON files
  //       alert("Please upload a JSON file (Lottie File).");
  //       // Optionally, you can reset the file input
  //       e.target.value = null;
  //     }
  //   }
  // }

  // const resetImageSizes = () => {
  //   setImage(null);
  //   setLottieOptions(null);
  // };

  function CreateSplash() {
    // console.log("image1", image1);
    // console.log("image2", image2);
    console.log("lotti1", lottieOptions1);
    console.log("lotti1", lottieOptions2);

    const formData = new FormData();
    formData.append("file", image1);
    // formData.append("file2", image2);
    // formData.append("file3", image3);
    // formData.append("file4", image4);
    formData.append("brandId", "65826de5d127bc5c79164e7a");

    // const data = {
    //   image: image,
    // };
    dispatch({
      type: "CREATE_SPLASH",
      payload: formData,
    });
    // setTimeout(() => getBrandData(), 1000);
  }
  function getBrandData() {
    dispatch({
      type: "GET_SINGLE_BRAND",
      payload: BrandId(),
    });
  }

  return (
    <div className="flex flex-col mx-auto mt-5 space-y-6">
      <WaveAnimation show={loading} />
      <div className="flex lg:flex-row flex-col lg:space-x-4">
        <Splash
          image={image1}
          setImage={(e) => setImage1(e)}
          setLottieOptions={(e) => setLottieOptions1(e)}
          lottieOptions={lottieOptions1}
        />
        {/* <Splash
          image={image2}
          setImage={(e) => setImage2(e)}
          setLottieOptions={(e) => setLottieOptions2(e)}
          lottieOptions={lottieOptions2}
        />
        <Splash
          image={image3}
          setImage={(e) => setImage3(e)}
          setLottieOptions={(e) => setLottieOptions3(e)}
          lottieOptions={lottieOptions3}
        />
        <Splash
          image={image4}
          setImage={(e) => setImage4(e)}
          setLottieOptions={(e) => setLottieOptions4(e)}
          lottieOptions={lottieOptions4}
        /> */}
      </div>

      <Button
        onButtonClick={CreateSplash}
        buttonValue="UPLOAD FILES"
        buttonStyle="w-full my-2 mt-5 text-xs font-semibold "
      />
      {/* <div className="flex flex-col md:flex-row md:space-x-6 rtl:space-x-reverse">
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
                Supported formates: JSON (Lottie File)
              </a>
            </div>

            <div className="text-xs  px-4  border border-gray-100 h-full py-2 text-gray-700 w-full mt-2 rounded-full">
              your-file-here.PDF
            </div>

            <div className="mt-2">
              <a className="text-xs opacity-70 font-semibold">Uploaded</a>
            </div>

            <Button
              onButtonClick={CreateSplash}
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
              {!image && !lottieOptions && (
                <PiImageThin className="text-primary h-44  w-full" />
              )}
              <Lottie
                animationData={lottieOptions}
                loop={true}
                height={200}
                width={200}
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
          </div>
        </CardMain>
      </div> */}

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
