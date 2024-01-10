import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { Button } from "../../Components";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure
import { BrandId } from "funtions/BrandId";
import Splash from "Components/Splash";
function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [lottieOptions1, setLottieOptions1] = useState(null);
  const [image1, setImage1] = useState(null);

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);

  const getBrand = useSelector((state) => state.getSingleBrand);
  useEffect(() => {
    if (getBrand?.brandingSplashScreen) {
      setLottieOptions1(JSON.parse(getBrand?.brandingSplashScreen));
    }
  }, []);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  function CreateSplash() {
    const formData = new FormData();
    formData.append("file", image1);
    formData.append("brandId", BrandId());
    dispatch({
      type: "CREATE_SPLASH",
      payload: formData,
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
      </div>
      <Button
        onButtonClick={CreateSplash}
        buttonValue="UPLOAD FILES"
        buttonStyle="w-full my-2 mt-5 text-xs font-semibold "
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
