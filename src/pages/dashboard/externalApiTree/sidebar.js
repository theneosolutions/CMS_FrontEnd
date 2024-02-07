import React, { useState } from "react";

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const onDragStart = (event, node) => {
    console.log("datatata", event.dataTransfer, "helo bhai g", node);
    event.dataTransfer.setData("application/reactflow", node.type);
    event.dataTransfer.setData("application/reactflow2", JSON.stringify(node));

    event.dataTransfer.effectAllowed = "move";
  };

  const existingData = JSON.parse(localStorage.getItem("flow")) || [];

  const nodes = [
    { type: "Nafaz", label: "Nafaz" },
    { type: "Absher", label: "Absher" },
    { type: "Yakeen", label: "Yakeen" },
    { type: "AML", label: "AML" },
    { type: "Selaa", label: "Selaa" },
  ];
  const mergedData = [
    ...existingData,
    ...nodes.filter(
      (node) =>
        !existingData.some((existingNode) => existingNode.type === node.type)
    ),
  ];

  const filteredNodes = mergedData.filter((node) =>
    node.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log("filteredNodes", filteredNodes);

  return (
    <aside>
      <input
        className="search-input w-full h-9 px-2 border-gray-300 border-2 rounded-sm outline-none"
        type="text"
        placeholder="Search nodes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredNodes.map((node) => (
        <div
          key={node.type}
          className={`mt-4 dndnode ${node.type === "Sidebar" ? "input" : ""}`}
          onDragStart={(event) => onDragStart(event, node)}
          draggable>
          {node.label}
        </div>
      ))}
    </aside>
  );
}
