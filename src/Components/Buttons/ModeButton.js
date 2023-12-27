import React from "react";
function ModeButton({ value }) {
  return (
    <div className="space-x-2 rtl:space-x-reverse border-gray-300 border rounded-full px-4 py-1 text-sm font-semibold text-green-600 flex flex-row items-center justify-center ">
      <div className="w-4 h-4 bg-green-600 border-4 border-green-100 border-opacity-95	 rounded-full  pt-1"></div>
      <h1>{value}</h1>
    </div>
  );
}
export default ModeButton;
