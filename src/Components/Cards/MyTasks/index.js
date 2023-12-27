import { useState } from "react";
import { useTranslation } from "react-i18next";

// import _data from "./_data";
function MyTask() {
  const [active, setActive] = useState("1");
  const { t } = useTranslation();

  return (
    <div className="">
      <div className="flex flex-row space-x-10 rtl:space -x-reverse text-md text-gray-800 opacity-90">
        <div
          onClick={() => setActive("1")}
          className={`${
            active === "1" ? "border-b-2 border-orange-300 pb-2" : ""
          } cursor-pointer`}>
          <h1 className={`${active === "1" ? "font-semibold" : ""}`}>
            {t("All Open")} (24)
          </h1>
        </div>
        <div
          onClick={() => setActive("2")}
          className={`${
            active === "2" ? "border-b-2 border-orange-300 pb-2" : ""
          } cursor-pointer`}>
          <h1 className={`${active === "2" ? "font-semibold" : ""}`}>
            {t("Not Done")} (6)
          </h1>
        </div>
        <div
          onClick={() => setActive("3")}
          className={`${
            active === "3" ? "border-b-2 border-orange-300 pb-2" : ""
          } cursor-pointer`}>
          <h1 className={`${active === "3" ? "font-semibold" : ""}`}>
            {t("In Review")} (4)
          </h1>
        </div>
      </div>
      <div className="h-0.5 w-full bg-gray-200 -mt-0.5"></div>
      {data?.map((v, k) => {
        return (
          <div
            key={k}
            className="flex flex-row space-x-4  rtl:space-x-reverse py-4 border-b-2 text-md text-gray-800">
            <h1 className="w-3/5 truncate ">
              {t("The Application for John Smith personal loan was updated")}
            </h1>
            <h1 className="w-1/5 bg-blue-100 bg-opacity-50 items-center justify-center text-center text-blue-500">
              {t("In Review")}
            </h1>
            <h1 className="w-1/5">Dec, 2000</h1>
          </div>
        );
      })}
    </div>
  );
}
export default MyTask;

const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
