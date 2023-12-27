import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "../../Components/Loading"; // Adjust the path based on your file structure
import { useTranslation } from "react-i18next";
import CardMain from "../../Components/Cards/main";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CreateQuestionsSet() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [question, setQuestions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); // State to hold selected checkbox IDs
  const [name, setName] = useState("");

  const questionsData = useSelector((state) => state.getAllQuestions);
  const allSets = useSelector((state) => state.getAllSets);
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_QUESTIONS",
    });
  }, []);
  useEffect(() => {
    getAllSets();
  }, []);

  useEffect(() => {
    setQuestions(questionsData);
  }, [questionsData]);

  const handleClose = () => {
    dispatch(action.Message({ open: false }));
  };

  function getAllSets() {
    dispatch({
      type: "GET_ALL_SETS",
    });
  }

  // Function to handle checkbox selection
  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Function to add selected IDs to a new array
  const handleAddSelectedToNewList = () => {
    if (!name) {
      return dispatch(
        action.Message({
          message: "PLease Add Set Name",
          open: true,
          error: true,
        })
      );
    }
    dispatch({
      type: "ADD_QUESTIONS_SET",
      payload: { name, selectedIds },
    });
    setSelectedIds([]);
    setTimeout(() => getAllSets(), 500);
  };

  return (
    <div className="">
      <WaveAnimation show={loading} />
      <div className="mt-6 flex flex-col md:flex-row md:space-x-3 rtl:space-x-reverse h-max">
        <CardMain
          heading={t("All List Of Questions")}
          width="md:w-3/5 w-full"
          showButton={selectedIds.length > -1 ? true : false}
          buttonValue={t("Add Selected To New List")}
          onButtonClick={handleAddSelectedToNewList} // Attach click handler
          Component={
            selectedIds.length > -1 ? (
              <InputField setName={setName} name={name} />
            ) : null
          }>
          <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
              <tr>
                <th scope="col" className="px-2 py-3 cursor-pointer">
                  {t("Action")}
                </th>
                <th scope="col" className="px-3 py-3 cursor-pointer">
                  {t("heading")}
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer">
                  {t("Question")}
                </th>
              </tr>
            </thead>
            <tbody>
              {question.map((v, k) => {
                return (
                  <tr
                    key={k}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-2 py-4">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(v.id)} // Attach change handler
                        checked={selectedIds.includes(v.id)} // Check if the ID is in selectedIds
                      />
                    </td>
                    <td className="px-3 py-4">{v.heading}</td>
                    <td className="px-6 py-4">{v.question}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardMain>
        <CardMain
          heading={t("All List Of Sets")}
          width="md:w-2/5 md:mt-0 mt-5	h-max">
          {allSets?.map((v, k) => {
            return (
              <div
                key={k}
                onClick={() =>
                  navigate(`/decisions/create-decision?id=${v.id}`)
                }
                className="w-full bg-gray-200 text-center mt-4 py-6 rounded-md hover:bg-gray-300 duration-300 cursor-pointer">
                {v.name} Click To Add Answers
              </div>
            );
          })}
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

export default CreateQuestionsSet;

function InputField({ name, setName }) {
  const { t } = useTranslation();

  return (
    <div>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder={t("Set name")}
        className="border-gray-300 border rounded-md px-2 py-1   outline-none"
      />
    </div>
  );
}
