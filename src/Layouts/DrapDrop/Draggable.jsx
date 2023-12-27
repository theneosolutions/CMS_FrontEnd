import React from "react";
import { useDrag } from "react-dnd";
import styles from "./styles/Draggable.module.css";
import Team from "../../Components/Teams";

function Draggable({ children, type, item, text, style, hideWhenDrag, state }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type,
      item,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [state]
  );

  if (isDragging && hideWhenDrag) {
    return <div ref={drag}></div>;
  }

  return (
    <span
      className={`px-2  ${styles.draggable} ${isDragging && styles.dragging}`}
      style={style}
      ref={drag}>
      {/* <span>{text}</span> */}
      <Card />
      {children}
    </span>
  );
}

function Card() {
  return (
    <div className="text-start w-full bg-white px-3 py-3 rounded-sm flex flex-col">
      <h1 className="text-xs font-semibold opacity-80">Paul James</h1>
      <h1 className="text-xs font-semibold opacity-40">
        #7172833 - Oct 18 ,2021
      </h1>
      <div className="flex flex-row justify-between mt-4">
        <h1 className="text-xs font-bold opacity-80">$6800</h1>
        <Team />
      </div>
    </div>
  );
}

export default Draggable;
