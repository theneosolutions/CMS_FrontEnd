import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TestPage() {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.getSingleSetData);

  const [localData, setLocalData] = useState(reduxData);

  const [inputValues, setInputValues] = useState({});
  const [numericValues, setNumericValues] = useState({});

  var setId = 2;
  const handleInputChange = (id, value) => {
    console.log("id", id);
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: [value],
    }));
  };
  const handleInputNumericChange = (heading, value) => {
    setNumericValues((prevNumericValues) => ({
      ...prevNumericValues,
      [heading]: parseFloat(value),
    }));
  };
  const handleCheckboxChange = (questionId, option) => {
    setInputValues((prevInputValues) => {
      const prevOptions = prevInputValues[questionId] || [];
      const updatedOptions = prevOptions.includes(option)
        ? prevOptions.filter((prevOption) => prevOption !== option)
        : [...prevOptions, option];

      return {
        ...prevInputValues,
        [questionId]: updatedOptions,
      };
    });
  };

  const handleRadioChange = (questionId, option) => {
    setInputValues({
      ...inputValues,
      [questionId]: [option],
    });
  };
  useEffect(() => {
    getSingleQuestion(setId);
  }, []);
  useEffect(() => {
    if (!isDataEqual(reduxData, localData)) {
      setLocalData(reduxData);
      console.log("hshcjajhkadjkadjkadjakdjkasjk");
      console.log("Setting localData to reduxData");
    }
  }, [reduxData]);

  const isDataEqual = (data1, data2) => {
    return JSON.stringify(data1) === JSON.stringify(data2);
  };

  function getSingleQuestion(id) {
    dispatch({
      type: "GET_SINGLE_SET_DATA",
      payload: { id: id, forUser: true },
    });
  }

  function AddUserAnswersToSet(id) {
    // console.log("data", numericValues);
    console.log("inputs", [inputValues], "numericData", [numericValues]);
    dispatch({
      type: "ADD_USER_ANSWER_TO_SET",
      payload: { id: setId, data: [inputValues], numericData: [numericValues] },
    });
  }

  return (
    <>
      <div className="flex flex-row space-x-10">
        <div>
          {localData?.Text_Question?.map((v, k) => {
            return (
              <div key={k} className="flex flex-col mt-2">
                <a className="heading"> {v?.question}</a>
                <input
                  className="w-52 h-10 rounded-md mt-2 px-2 outline-none"
                  onChange={(e) => handleInputChange(v?.id, e.target.value)}
                  value={inputValues[v?.id] ? inputValues[v?.id][0] : null}
                />
              </div>
            );
          })}
        </div>

        <div>
          {localData?.Numeric_Question?.map((v, k) => {
            const heading = v.heading;

            return (
              <div key={k} className="flex flex-col mt-2">
                <a className="heading">{v.question}</a>
                <input
                  type="number"
                  className="w-52 h-10 rounded-md mt-2  px-2 outline-none"
                  onChange={(e) =>
                    handleInputNumericChange(heading, e.target.value)
                  }
                  value={numericValues[heading] || ""}
                />
              </div>
            );
          })}
        </div>
        <div>
          {localData?.Other_Question?.map((v, k) => {
            const questionId = v?.eligibilityQuestions?.id; // Assuming there's an 'id' property in your data
            const options = v?.eligibilityQuestions?.options;
            const isCheckbox = options.length > 2;

            return (
              <div key={k} className="flex flex-col">
                <a className="heading ">{v?.eligibilityQuestions?.question}</a>
                <div>
                  {options?.map((l, k) => (
                    <div key={k} className="flex flex-row  items-center mt-2 ">
                      <input
                        type={isCheckbox ? "checkbox" : "radio"}
                        className="w-10 h-5 rounded-md  outline-none"
                        onChange={() =>
                          isCheckbox
                            ? handleCheckboxChange(questionId, l)
                            : handleRadioChange(questionId, l)
                        }
                        checked={
                          isCheckbox
                            ? inputValues[questionId]?.includes(l)
                            : inputValues[questionId]?.[0] === l
                        }
                      />
                      <a>{l}</a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        onClick={() => AddUserAnswersToSet()}
        className="bg-blue-400 px-3 py-2 text-sm rounded-md text-white mt-10 cursor-pointer hover:bg-blue-600 duration-200 text-center">
        Submit
      </div>
    </>
  );
}

export default TestPage;
const other = [
  {
    1: ["zain"],
    2: ["malik"],
    3: ["zain"],
    5: ["text"],
    7: ["Female"],
    8: ["Yes", "Nhi Btana", "No"],
    9: ["Yes "],
  },
];

const numeric = [
  {
    salary: 2000,
    yearlyexpense: 3000,
  },
];
