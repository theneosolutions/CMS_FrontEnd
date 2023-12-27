import React from "react";
import CardMain from "../../Components/Cards/main";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../Services/redux/reducer";
import { Alert, Snackbar } from "@mui/material";
import WaveAnimation from "../../Components/Loading"; // Adjust the path based on your file structure
import { useNavigate } from "react-router-dom";
import Edit from "../../Assets/Images/edit.svg";
import Delete from "../../Assets/Images/delete.svg";
import { Button, CheckOperaterStyle } from "Components";
import { useTranslation } from "react-i18next";

const CreateDesicion = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);
  const open = useSelector((state) => state.open);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.Loading);
  const setData = useSelector((state) => state.getAllDecisions);

  React.useEffect(() => {
    getAllDecisions();
  }, []);

  const handleClose = () => {
    dispatch(action.Message({ open: false })); // Closing the message
  };

  function getAllDecisions() {
    dispatch({
      type: "GET_ALL_DECISIONS",
    });
  }
  return (
    <>
      <WaveAnimation show={loading} />
      <div className="font-semibold text-xl">{t("List Of Decisions")}</div>
      <input
        placeholder={t("Search Decision from here")}
        className="mb-4 mt-4 p-2 px-4 border rounded w-full border-primary  outline-none"
      />
      {setData?.QuestionSets?.length < 1 && <NoDecisionFound />}
      {setData?.QuestionSets?.map((v, k) => {
        return (
          <CardMain
            key={k}
            width="h-max border border-primary mt-5"
            heading={v?.setName}>
            {v?.otherQuestions.length > 0 ? (
              <>
                {" "}
                <>
                  <a className="bg-gray-200 px-3 py-2  rounded-md">
                    {" "}
                    Other Questions:
                  </a>

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
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {v?.otherQuestions?.map((o, key) => {
                        return (
                          <tr
                            key={key}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-2 py-4">
                              {o?.eligibilityQuestions.id}
                            </td>
                            <td className="px-6 py-4">
                              {o?.eligibilityQuestions.question}
                            </td>
                            <td className="px-6 py-4 flex flex-row rtl:space-x-reverse space-x-4">
                              {o?.eligibilityQuestions?.options?.map(
                                (option, index) => {
                                  var answers = o?.answer || [];
                                  var isActive = answers?.includes(option);

                                  return (
                                    <div
                                      key={index}
                                      className="flex flex-row space-x-2 rtl:space-x-reverse items-center">
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

                            <th
                              scope="row"
                              className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                              <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                                <img src={Edit} className="h-6" />
                                <img src={Delete} className="h-6" />
                              </div>
                            </th>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>{" "}
              </>
            ) : null}
            {v?.formula?.formula && (
              <div className="mt-6">
                <a className="bg-gray-200 px-3 py-2  rounded-md"> Formula:</a>
                <div className="flex flex-row items-center  mt-3 mb-6">
                  <div className="flex flex-wrap ">
                    {v?.formula?.formula?.map((t, key) => {
                      return (
                        <div key={key} className="m-1">
                          {CheckOperaterStyle(t)}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-row text-primary items-center text-3xl space-x-5 rtl:space-x-reverse mx-5 font-bold text-gray-700">
                    <a className="">{v?.formula?.operation}</a>
                    <a>{v?.formula?.value}</a>
                  </div>
                </div>
              </div>
            )}
            {v?.textQuestions?.length > 0 && (
              <div className="mt-5">
                <a className="bg-gray-200 px-3 py-2  rounded-md">
                  Text Questions:
                </a>
                <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
                    <tr>
                      <th scope="col" className="px-2 py-3 cursor-pointer">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 cursor-pointer">
                        Heading
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
                    {v?.textQuestions?.map((s, m) => {
                      return (
                        <tr
                          key={m}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-2 py-4">
                            {s?.eligibilityQuestions?.id}
                          </td>
                          <td className="px-6 py-4">
                            {s?.eligibilityQuestions?.heading}
                          </td>
                          <td className="px-6 py-4">
                            {s?.eligibilityQuestions?.question}
                          </td>
                          <th
                            scope="row"
                            className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex flex-row space-x-3 rtl:space-x-reverse">
                              <img src={Edit} className="h-6" />
                              <img src={Delete} className="h-6" />
                            </div>
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardMain>
        );
      })}

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

function NoDecisionFound() {
  const navigate = useNavigate();
  return (
    <CardMain width="h-max ">
      <div className="flex flex-col items-center  justify-center  mt-6 m-1 py-10">
        <p className="text-2xl text-gray-700 font-semibold">
          No Decision Created Yet !
        </p>
        <Button
          buttonValue={"Add New Decision"}
          buttonStyle={"mt-5"}
          onButtonClick={() => navigate("/decisions/create-decision")}
        />
      </div>
    </CardMain>
  );
}
