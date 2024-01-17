import React from "react";
function Button({
  buttonColor,
  buttonStyle,
  buttonDisable,
  onButtonClick,
  buttonValue,
  type,
}) {
  return (
    <button
      type={type}
      disabled={buttonDisable}
      onClick={onButtonClick}
      className={` rounded-tr-lg  rounded-bl-lg	 text-white  px-5 py-2  ${buttonStyle} hover:bg-opacity-90  duration-300 ${
        buttonColor ? buttonColor : `bg-primary `
      }`}>
      {buttonValue}
    </button>
  );
}
export default Button;
