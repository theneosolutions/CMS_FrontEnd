import React, { useState } from "react";
import { SketchPicker } from "react-color";
import CardMain from "../../Components/Cards/main";
import { useTranslation } from "react-i18next";
import { Button } from "../../Components";

const Color = ({ name, color, published, onClick }) => {
  const { t } = useTranslation();

  const [selectedColor, setSelectedColor] = useState(color || "E2DE31");

  const handleColorChange = (color) => {
    const newColor = color.hex;
    setSelectedColor(newColor);
  };

  return (
    <>
      <div className="flex flex-row md:w-1/2 lg:w-1/3 xl:w-1/4 mt-5 items-center justify-center">
        <CardMain width="w-min h-min  md:mt-0 mt-4 m-2" headerDisable={true}>
          <div className="items-center text-center">
            <a className="text-lg font-semibold">{name}</a>
            <div className="flex flex-row justify-between my-3">
              <a>{selectedColor}</a>
              {published ? (
                <a className="bg-green-500 px-2 py-0.5 rounded-md text-white text-xs pt-1">
                  Published
                </a>
              ) : (
                <a className="bg-blue-400 px-2 py-0.5 rounded-md text-white text-xs pt-1">
                  Draft
                </a>
              )}
            </div>
            <SketchPicker
              width={200}
              height={200}
              color={selectedColor}
              onChange={handleColorChange}
              onChangeComplete={(color, event) => console.log(color)}
            />
          </div>
          <Button
            onButtonClick={() => onClick(selectedColor, name)}
            buttonValue="Confirm"
            buttonStyle="w-full my-2 mt-5 text-xs font-semibold "
          />
        </CardMain>
      </div>
    </>
  );
};

export default Color;
