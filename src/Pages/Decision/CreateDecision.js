import React, { useEffect, useState } from "react";
import CardMain from "../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import { Model } from "../../Components";
import CreateFormula from "../../Pages/Decision/CreateFormula";
import WaveAnimation from "../../Components/Loading"; // Adjust the path based on your file structure
import { useNavigate, useLocation } from "react-router-dom";
import Edit from "../../Assets/Images/edit.svg";
import Delete from "../../Assets/Images/delete.svg";
import { useTranslation } from "react-i18next";

const CreateDesicion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [modelOpen, setModelOpen] = useState(false);
  const [setId, setSetId] = useState();
  const [checkedValues, setCheckedValues] = useState([]);

  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const setData = useSelector((state) => state.getSingleSetData);
  const singleQuestion = useSelector((state) => state.getQuestionOfSet);
  const allSets = useSelector((state) => state.getAllSets);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const setid = queryParams.get("id");

  useEffect(() => {
    if (setid) {
      setSetId(setid);
      setSelectedSetData(setid);
    }
    getAllSets();
  }, []);

  function getAllSets() {
    dispatch({
      type: "GET_ALL_SETS",
    });
  }

  function getSingleQuestion(id) {
    dispatch({
      type: "GET_QUESTION_OF_SET", // get all questions
      payload: { id: id, setid: setId },
    });
  }

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  async function addAnswersData() {
    var obj = {
      answers: checkedValues,
      id: setId,
      questionId: singleQuestion.id,
    };
    await dispatch({
      type: "ADD_ANSWER_THE_QUESTION", // get all questions
      payload: obj,
    });
    setModelOpen(false);
    await setTimeout(() => setSelectedSetData(setId), 400);
  }

  function setSelectedSetData(id) {
    navigate(`/decisions/create-decision?id=${id}`);
    setSetId(id);
    dispatch({
      type: "GET_SINGLE_SET_DATA", // get all questions
      payload: { id: id, forUser: false },
    });
  }
  return (
    <>
      <WaveAnimation show={loading} />

      <CardMain heading={t("Create Decision")} width="h-max md:mt-0 mt-4">
        <select
          value={setId}
          className="mb-4 p-2 px-4 border rounded mt-4 w-full border-primary cursor-pointer"
          onChange={(e) => setSelectedSetData(e.target.value)}>
          {setId ? null : <option value="Select">{t("Select Set")}</option>}

          {allSets?.map((v, k) => {
            return (
              <option key={k} value={v.id}>
                {v.name}
              </option>
            );
          })}
        </select>

        {setData?.Other_Question?.length > 0 && (
          <>
            <div
              className="bg-primary w-full opacity-20 my-2"
              style={{ height: 1 }}></div>
            <div className="overflow-x-auto">
              <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                  <tr>
                    <th scope="col" className="px-2 py-3 cursor-pointer">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer">
                      Question
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer">
                      Options
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer">
                      Add Answers
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {setData?.Other_Question?.map((v, k) => (
                    <tr
                      key={k}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-2 py-4">
                        {v?.eligibilityQuestions.id}
                      </td>
                      <td className="px-6 py-4">
                        {v?.eligibilityQuestions.question}
                      </td>
                      <td className="px-6 py-4 flex flex-row space-x-4 rtl:space-x-reverse">
                        {v?.eligibilityQuestions?.options.map(
                          (option, index) => {
                            const isActive = v?.answer?.includes(option);

                            return (
                              <div
                                key={index}
                                className="flex flex-row space-x-2 items-center">
                                <input
                                  type="radio"
                                  checked={isActive}
                                  disabled={true}
                                  style={{ accentColor: "red" }}
                                  className={`h-4 w-4 ${
                                    isActive
                                      ? "bg-red-300 text-red-500 bg-red-500 border-green-400"
                                      : ""
                                  }`}
                                />
                                <span>{option}</span>
                              </div>
                            );
                          }
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div
                          onClick={() => {
                            getSingleQuestion(v?.eligibilityQuestions.id);
                            setModelOpen(true);
                            setCheckedValues([]);
                          }}
                          className="bg-gray-200 w-max py-2 px-5 hover:bg-gray-300 duration-300 rounded-md text-xs cursor-pointer text-sky-800">
                          Add Answer
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                          <img src={Edit} className="h-6" alt="Edit" />
                          <img src={Delete} className="h-6" alt="Delete" />
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardMain>
      {setData?.Numeric_Question?.length > 0 && (
        <CreateFormula setId={setId} formula={setData?.Formula} />
      )}

      {setData?.Text_Question?.length > 0 && (
        <CardMain heading={"Text Question"} width="h-max mt-5 ">
          <>
            <div
              className="bg-primary w-full opacity-20 my-2"
              style={{ height: 1 }}></div>
            <div className="overflow-x-auto">
              <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                  <tr>
                    <th scope="col" className="px-2 py-3 cursor-pointer">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer">
                      Question
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {setData?.Text_Question?.map((v, k) => (
                    <tr
                      key={k}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-2 py-4">{v?.id}</td>
                      <td className="px-6 py-4">{v?.question}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                          <img src={Edit} className="h-6" alt="Edit" />
                          <img src={Delete} className="h-6" alt="Delete" />
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        </CardMain>
      )}

      <Model
        heading="Add Answer to this Question"
        isOpen={modelOpen}
        setState={() => setModelOpen(!modelOpen)}
        action1Value="Cancel"
        action2Value="Add Answers"
        action2={() => addAnswersData()}
        action1={() => setModelOpen(!modelOpen)}>
        <Checboxes
          checkedValues={checkedValues}
          setCheckedValues={(e) => setCheckedValues(e)}
          singleQuestion={singleQuestion}
        />
      </Model>

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

export default CreateDesicion;
function Checboxes({ singleQuestion, checkedValues, setCheckedValues }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked) {
      // Add the value to the array if it's not already present
      setCheckedValues((prevValues) => [...new Set([...prevValues, value])]);
    } else {
      // Remove the value from the array
      setCheckedValues((prevValues) => prevValues.filter((v) => v !== value));
    }
    console.log("checkedValues", checkedValues);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col ">
        <div className="flex flex-col ">
          <span>
            <a className="text-xl font-semibold text-sky-800 mt-2 underline">
              {singleQuestion?.question}
            </a>
          </span>

          <a className="text-lg mt-4 underline">Options:</a>
          {singleQuestion?.Option?.map((v, k) => {
            return (
              <div key={k} className="flex flex-row items-center mx-2">
                <div className="h-1 w-1 rounded-full bg-sky-800 p-1 mt-1"></div>
                <a className="py-1 text-sky-800 font-semibold pl-2 pr-2">{v}</a>
              </div>
            );
          })}
          <a className="text-lg mt-6 underline">Answers:</a>
        </div>
        <>
          {singleQuestion?.Option?.map((v, k) => (
            <div
              key={k}
              className="flex flex-row space-x-3 rtl:space-x-reverse items-center py-2">
              <input
                type="checkbox"
                className="h-4 w-4 border rounded mt-0.5"
                onChange={(e) => handleCheckboxChange(v, e.target.checked)}
              />
              <a className="text-md text-gray-600">{v}</a>
            </div>
          ))}
        </>
      </div>
    </form>
  );
}
