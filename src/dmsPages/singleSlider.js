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
  const [active, setActive] = useState({});
  // console.log("single slider slider state", allSliders);

  useEffect(() => {
    if (getBrand?.brandingSplashScreen) {
    }
  }, []);

  const data = allSliders?.filter((slider) => slider.mainTittle === name);
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
  useEffect(() => {
    console.log("data[0]", data[0]?.brandSliderScreenList[0]);
    setActive(data[0]?.brandSliderScreenList[0]);
  }, []);
  return (
    <div className="flex flex-col mx-auto mt-5 ">
      <WaveAnimation show={loading} />
      <div className="flex lg:flex-row flex-col lg:space-x-4  rtl:space-x-reverse">
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
        <div className="border-b mt-4 flex flex-row w-full pt-3 px-4 bg-white rounded-t-md  space-x-6">
          {data[0]?.brandSliderScreenList.map((v, k) => {
            return (
              <div
                onClick={() => setActive(v)}
                style={{ marginBottom: -1 }}
                className={`cursor-pointer opacity-80  ${
                  active.title === v.title
                    ? "border-b-2 border-blue-400 text-blue-400"
                    : null
                }  px-3 py-1`}>
                <a>{v.title}</a>
              </div>
            );
          })}
        </div>
      )}
      {data[0]?.brandSliderScreenList.length > 0 && (
        <div className="flex flex-wrap  ">
          {active && <ShowData data={active} />}
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
  let animationData = null;
  try {
    animationData = data?.file ? JSON.parse(data?.file) : null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  return (
    <div className="bg-white px-5 w-full py-6">
      <div className="bg-white border  bg-secondry border-dashed	 border-slate-200 flex flex-col px-4 py-4">
        <div className="flex flex-row  justify-between space-x-2 flex flex-end rtl:space-x-reverse">
          <div></div>
          <div className="flex flex-row  space-x-2 flex flex-end pb-4 rtl:space-x-reverse">
            <FaRegEdit className="text-blue-500 cursor-pointer" />
            <RiDeleteBin6Line className="text-red-400 cursor-pointer" />
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center ">
          {data && data?.title && (
            <div className="flex flex-row text-xs text-gray-700  w-full  pb-2">
              <a className="w-20">Title : </a>
              <a className="font-semibold">{data?.title}</a>
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
          <div className="w-32 h-52">
            {animationData ? (
              <Lottie animationData={animationData} loop={true} />
            ) : (
              <div>Error loading animation</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
