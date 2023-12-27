import React, { useState } from "react";
import Team from "../../Teams";
import Data from "./_data";
import { useTranslation } from "react-i18next";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function MyApplication() {
  const { t } = useTranslation();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...Data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [Data, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  // const getSortIcon = (key) => {
  //   if (sortConfig.key === key) {
  //     return sortConfig.direction === "ascending" ? (
  //       <IoIosArrowUp />
  //     ) : (
  //       <IoIosArrowDown />
  //     );
  //   }
  //   return null;
  // };

  return (
    <div className="">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-50 font-normal">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => requestSort("borrower")}>
                {t("Borrower")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => requestSort("app_id")}>
                {t("App Id")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => requestSort("status")}>
                {t("Status")}
              </th>
              {/* Assuming Team Members is not sortable as it's a component */}
              <th scope="col" className="px-6 py-3">
                {t("Team Members")}
              </th>
              <th
                scope="col"
                className="px-6 py-3 cursor-pointer"
                onClick={() => requestSort("loan_amount")}>
                {t("Loan Amount")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((v, k) => (
              <tr
                key={k}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {v.borrower}
                </th>
                <td className="px-6 py-4">{v.app_id}</td>
                <td className="px-6 py-4">{Status(v.status)}</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <Team />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {v.laon_amount}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default MyApplication;
function Status(value) {
  const { t } = useTranslation();

  let color;
  if (value === t("Rejected")) {
    color = "bg-blue-400";
  } else if (value === t("Approved")) {
    color = "bg-red-400";
  }
  return (
    <div className="flex flex-row space-x-3 rtl:space-x-reverse items-center">
      <h1> {t(value)}</h1>
      <div className={`rounded-full h-1.5 w-1.5 ${color}`}></div>
    </div>
  );
}
