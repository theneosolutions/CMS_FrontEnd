import _data from "./_data";
import { useTranslation } from "react-i18next";

function MyActivity() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex flex-row space-x-2 rtl:space-x-reverse">
        <h1 className="font-semibold text-base text-black">Dec 25,2022</h1>
        <h1 className="font-semibold text-sm text-gray-400 mt-0.5 pb-5">
          19 {t("Actions")}
        </h1>
      </div>
      <div className="space-y-6">
        {_data?.map((v, k) => {
          return (
            <div
              className="flex flex-row space-x-4 rtl:space-x-reverse "
              key={k}>
              <img
                className="object-cover w-10 h-10  border-2 border-white rounded-full dark:border-gray-700 shrink-0 shadow-xl"
                src={v.icon}
                alt=""
              />

              <div className="flex flex-col ">
                <h1 className="text-sm text-gray-500">
                  {v.time} <span className="text-gray-800">{t(v.des)}</span>
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MyActivity;
