import React from "react";
import { useDrop } from "react-dnd";
import styles from "./styles/Droppable.module.css";
import { useTranslation } from "react-i18next";

function Droppable({ accept, handleDrop, text, children, state, big, style }) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept,
      drop: (item, monitor) => handleDrop(item, monitor, state),
      collect: (monitor) => ({
        isOver: !!monitor.isOver({ shallow: true }),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [state] // Dependency
  );

  const isActive = isOver && canDrop;

  return (
    <div
      className={`w-1/2 bg-gray-300 pb-4 text-center rounded-md ${
        isActive && styles.over
      } ${!isActive && canDrop && styles.can} ${big && styles.big}`}
      style={style}
      ref={drop}>
      <div>{<Card />}</div>
      {/* <Card /> */}
      {children}
    </div>
  );
}

function Card() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-start py-3 px-3">
      <div className="flex flex-row space-x-2 rtl:space-x-reverse">
        <h1 className="font-semibold text-lg text-black">{t("New Leads")}</h1>
        <h1 className="font-semibold text-md text-gray-400 mt-0.5 ">5</h1>
      </div>
      <h1 className="font-semibold text-xs text-gray-400 mt-1">$1,324,334</h1>
    </div>
  );
}
export default Droppable;
