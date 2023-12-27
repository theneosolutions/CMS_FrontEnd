import _data from "./_data";
import { useTranslation } from "react-i18next";

function MyTeam() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {_data.map((v, k) => {
        return (
          <div className="flex flex-row space-x-4 rtl:space-x-reverse" key={k}>
            <div className="relative">
              <img
                className="object-cover w-10 h-10  border-2 border-white rounded-full dark:border-gray-700 shrink-0 shadow-xl"
                src={v.icon}
                alt=""
              />
              <div
                className={`absolute bottom-0 right-0  w-2 h-2 rounded-full ${
                  v.online ? "bg-green-400" : "bg-gray-300"
                }`}></div>
            </div>
            <div className="flex flex-col ">
              <h1>{v.name}</h1>
              <h1 className="text-sm -mt-1 opacity-70 text-gray-600">
                {v.online ? t("Online") : v.des}
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default MyTeam;
