import React from "react";
import Color from "Components/Colors";
import { useDispatch, useSelector } from "react-redux";
import WaveAnimation from "Components/Loading";
import { Alert, Snackbar } from "@mui/material";
import * as action from "Services/redux/reducer";
import Test from "Components/test";
import { BrandId } from "funtions/BrandId";

const Colors = () => {
  const dispatch = useDispatch();

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const getBrand = useSelector((state) => state.getSingleBrand);
  const loading = useSelector((state) => state.Loading);

  console.log("colors colors", getBrand);
  function handleColor(color, name) {
    dispatch({
      type: "SET_COLOR",
      payload: [{ color: color, name: name }],
    });

    setTimeout(() => handleBrand(), 500);
    // handleBrand();
  }

  function handleBrand() {
    // console.log("getBrand", getBrand.brandId);
    dispatch({
      type: "GET_SINGLE_BRAND",
      payload: BrandId(),
    });
  }

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  const backendColors = getBrand?.brandingColor?.colors || [];

  const predefinedColors = [
    { name: "Primary", color: "#21C0D9" },
    { name: "Secondary", color: "#FFFFFF" },
    { name: "Quaternary", color: "#000000" },
    { name: "Tertiary", color: "#9B9787" },
    { name: "ErrorColor", color: "#B11818" },
    { name: "Quinary", color: "#A5DAE7" },
    { name: "Senary", color: "#F9F9FA" },
    { name: "Danger", color: "#E52E2D" },
    { name: "Success", color: "#63BA04" },
    { name: "Disabled", color: "#C7C7C7" },
    { name: "PopUp", color: "#C7C7C7" },
  ];

  return (
    <>
      <WaveAnimation show={loading} />
      <Test />
      <div className="flex flex-wrap">
        {predefinedColors.map((colorData) => (
          <Color
            key={colorData.name}
            name={colorData.name}
            color={
              backendColors.find((bc) => bc.name === colorData.name)?.color ||
              colorData.color
            }
            published={backendColors.some((bc) => bc.name === colorData.name)}
            onClick={(color, name) => handleColor(color, name)}
          />
        ))}
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Colors;
