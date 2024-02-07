import React from "react";
import { Button } from "../../Components";
function CardMain({
  children,
  width,
  heading,
  des,
  icon,
  iconStyle,
  buttonValue,
  onButtonClick,
  showButton,
  Component,
  buttonDisable,
  buttonStyle,
  header,
  headerDisable,
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm px-5 py-4 rtl:space-x-reverse  ${width}`}
    >
      <div className="flex flex-col md:flex-row  md:space-x-2 rtl:space-x-reverse justify-between">
        {!headerDisable && (
          <div className="flex flex-row space-x-2 rtl:space-x-reverse items-center pb-4">
            <div className="flex flex-row space-x-2 rtl:space-x-reverse items-center">
              <h1 className="font-semibold text-lg text-black ">{heading}</h1>
              <div className={`${iconStyle}`}>{icon}</div>
            </div>
            <h1 className="font-semibold text-md text-gray-400 mt-0.5">
              {des}
            </h1>
          </div>
        )}

        {Component}
        {showButton && (
          <Button
            buttonColor={buttonStyle}
            buttonValue={buttonValue}
            buttonDisable={buttonDisable}
            buttonStyle={` rounded-lg text-white text-sm px-5 py-2 md:mt-0 mt-3 `}
            onButtonClick={onButtonClick}
          />
        )}
      </div>

      {children}
    </div>
  );
}

export default CardMain;
