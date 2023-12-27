import React from "react";
function CheckStyle(operation) {
  let style;
  if (
    operation === "-" ||
    operation === "+" ||
    operation === "/" ||
    operation === "%" ||
    operation === "*"
  ) {
    style = "bg-opacity-40 px-4 w-max rounded-lg text-3xl mt-3";
  } else {
    style = " px-4 py-2 w-max rounded-lg border-primary border mt-3";
  }
  return <div className={style}>{operation}</div>;
}
export default CheckStyle;
