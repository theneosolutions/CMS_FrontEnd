import React, { useState, useEffect } from "react";
import CardMain from "Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "Components/Loading";
import * as action from "Services/redux/reducer";
import { useTranslation } from "react-i18next";

const Fonts = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const fonts = useSelector((state) => state.fonts);
  const [selecteFonts, setSelectedFonts] = useState([]); // State to hold selected checkbox IDs

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };
  useEffect(() => {
    dispatch({
      type: "GET_FONTS",
    });
  }, []);

  const handleCheckboxChange = (font) => {
    if (!isSelected(font)) {
      setSelectedFonts([...selecteFonts, font]);
    }
  };

  const isSelected = (font) => {
    return selecteFonts.some(
      (selectedFont) => selectedFont.family === font.family
    );
  };

  function handleAddFonts(v) {
    console.log("fonts", v);
    dispatch({
      type: "SET_FONTS",
      payload: v,
    });
    handleCheckboxChange(v);
  }
  return (
    <div className="flex flex-row space-x-6">
      <WaveAnimation show={loading} />

      <CardMain
        width="w-1/2"
        heading={"Set Fonts File"}
        Component={<Search setSearchInput={setSearchInput} />}>
        <div className="flex flex-row flex-wrap ">
          <div className="overflow-x-auto w-full">
            <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                <tr>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("Font Name")}
                  </th>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("Action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {fonts?.items
                  ?.filter((font) =>
                    font.family
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())
                  )
                  .map((v, k) => (
                    <tr
                      key={k}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-3 py-4">{v.family}</td>
                      <td className="px-3 py-4">
                        <div className="flex flex-row space-x-4 ">
                          <a
                            onClick={() => handleAddFonts(v)}
                            className="bg-primary rounded-md px-5 py-1 text-white hover:opacity-80 cursor-pointer">
                            Save
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardMain>
      <CardMain width="w-1/2 h-min" heading={"Set Fonts File"}>
        <div className="flex flex-row flex-wrap ">
          <div className="overflow-x-auto w-full">
            <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                <tr>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("Font Name")}
                  </th>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("State")}
                  </th>
                  <th scope="col" className="px-3 py-3 cursor-pointer">
                    {t("Action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {selecteFonts?.map((v, k) => (
                  <tr
                    key={k}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-3 py-4">{v.family}</td>
                    <td className="px-3 py-4">
                      <div className="flex flex-row space-x-4 ">
                        <a className="bg-green-700 rounded-md px-3 py-1 text-white cursor-pointer">
                          Published
                        </a>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex flex-row space-x-4 ">
                        <a className="bg-red-400 rounded-md px-3 py-1 text-white hover:opacity-80 cursor-pointer">
                          Remove
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardMain>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!error ? "success" : "error"}
          sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Fonts;

function Search({ setSearchInput }) {
  return (
    <div>
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={"Search Font"}
        className="border-gray-300 border rounded-md px-2 py-1   outline-none"
      />
    </div>
  );
}
