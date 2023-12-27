import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import CardMain from "Components/Cards/main";

import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import { BrandId } from "funtions/BrandId";
import SliderComponent from "dmsPages/Branding";
import { useNavigate, useLocation } from "react-router-dom";
import SliderJson from "./splash2.json";
import Lottie from "lottie-react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [lottieOptions1, setLottieOptions1] = useState(null);
  const [image1, setImage1] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [position, setPosition] = useState(null);

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const getBrand = useSelector((state) => state.getSingleBrand);
  const allSliders = useSelector((state) => state.getAllSliders);

  // console.log("single slider slider state", allSliders);

  useEffect(() => {
    if (getBrand?.brandingSplashScreen) {
    }
  }, []);

  const data = allSliders.filter((slider) => slider.mainTittle === name);
  // console.log("data", data);
  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  function CreateSplash() {
    const data = {
      mainTitle: name,
      image: image1,
      title: title,
      position: position,
      description: description,
      brandId: BrandId(),
    };
    dispatch({
      type: "ADD_SLIDE_TO_SLIDER",
      payload: data,
    });
    setTimeout(() => getAllBrands(), 1000);
  }

  function getAllBrands() {
    dispatch({
      type: "GET_ALL_SLIDERS",
    });
  }
  return (
    <div className="flex flex-col mx-auto mt-5 space-y-6 ">
      <WaveAnimation show={loading} />
      <div className="flex lg:flex-row flex-col lg:space-x-4 ">
        <SliderComponent
          image={image1}
          setImage={(e) => setImage1(e)}
          lottieOptions={lottieOptions1}
          setLottieOptions={(e) => setLottieOptions1(e)}
          title={title}
          setTitle={(e) => setTitle(e)}
          description={description}
          setDescription={(e) => setDescription(e)}
          position={position}
          setPosition={(e) => setPosition(e)}
          onsubmit={() => CreateSplash()}
        />
      </div>

      {data[0]?.brandSliderScreenList.length > 0 && (
        <div className="flex flex-wrap  ">
          {data[0]?.brandSliderScreenList.map((v, k) => {
            return <ShowData data={v} />;
          })}
        </div>
      )}

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

function ShowData({ data }) {
  const { t } = useTranslation();
  // console.log("my data slide", data);

  return (
    <div className="md:mt-0 mt-4 w-full md:w-1/2 lg:w-1/3  p-2">
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
          <div className=" flex flex-col items-center justify-center ">
            {data && data.title && (
              <div className="flex flex-row text-xs text-gray-700 mt-2 w-full mt-3 pb-2">
                <a className="w-20">Title : </a>
                <a className="font-semibold">{data.title}</a>
              </div>
            )}
            <div className="flex flex-row text-xs   text-gray-700  mt-2 w-full  mt-3 pb-2">
              <a className="w-20  ">Position : </a>
              <a className="font-semibold">{data?.position}</a>
            </div>
            <div className="flex flex-row text-xs   text-gray-700  mt-2 w-full  mt-3 pb-2">
              <a className="w-20  ">Description : </a>
              <a className="font-semibold">{data?.desc}</a>
            </div>
            <div className="">
              {console.log("fileeeeeeeeeeeeeeeeeeee", JSON.parse(data?.file))}
              {data?.file ? (
                <Lottie animationData={JSON.parse(data?.file)} loop={true} />
              ) : (
                <div>Error loading animation</div>
              )}
            </div>
          </div>
        </div>
      </CardMain>
    </div>
  );
}
