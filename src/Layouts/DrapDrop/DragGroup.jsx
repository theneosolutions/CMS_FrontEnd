import React from "react";
import styles from "./styles/DragGroup.module.css";

function DragGroup({ children }) {
  return <div className={`space-y-2 ${styles.group}`}>{children}</div>;
}

export default DragGroup;
