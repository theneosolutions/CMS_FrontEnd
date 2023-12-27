import React, { useState, useEffect } from "react";
import CardMain from "Components/Cards/main";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as action from "Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "Components/Loading"; // Adjust the path based on your file structure

function App() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const questionsData = useSelector((state) => state.getAllQuestions);

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  useEffect(() => {
    getAllQuestion();
  }, []);
  function getAllQuestion() {
    dispatch({
      type: "GET_ALL_QUESTIONS", // get all questions
    });
  }

  return (
    <div className="bg-red-300">
      <WaveAnimation show={loading} />

      <div className="flex flex-row w-full bg-green-300 space-x-5 rtl:space-x-reverse mt-6">
        <CardMain heading={t("Answers of this user")} width="w-full	 h-max">
          <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-2 py-3 cursor-pointer">
                  Question
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  Options
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  User Answers
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {questionsData?.map((v, k) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-2 py-4"> {v?.question}</td>
                    <td className="px-6 py-3 flex flex-row space-x-4">
                      {[1, 1, 1, 1].map((l, s) => {
                        return (
                          <div
                            key={k}
                            className="flex flex-row space-x-2 items-center">
                            <input
                              type="radio"
                              disabled={true}
                              className={`h-4 w-4
                                    
                                      }`}
                            />
                            <span>Yes</span>
                          </div>
                        );
                      })}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-row space-x-2 items-center">
                        <input
                          type="radio"
                          disabled={true}
                          className={`h-4 w-4
                                    
                                      }`}
                        />
                        <span>Yes</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="w-1/12	text-2xl	cursor-pointer text-gray-400 hover:text-red-400 duration-300">
                        {<MdDelete />}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardMain>
      </div>
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
}

export default App;
