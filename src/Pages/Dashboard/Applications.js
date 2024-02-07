import React from "react";
import DragDrop from "../../Layouts/DrapDrop";
import { useTranslation } from "react-i18next";
function Applications() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="mt-5 flex flex-row space-x-4 rtl:space-x-reverse ">
        <div className="w-1/2">
          <DragDrop />
        </div>
        <div className="w-1/2">
          <DragDrop />
        </div>
      </div>
    </div>
  );
}

export default Applications;
