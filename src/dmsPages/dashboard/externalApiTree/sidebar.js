import React, { useState } from "react";

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodes = [
    { type: "Nafaz", label: "Nafaz" },
    { type: "Absher", label: "Absher" },
    { type: "Yakeen", label: "Yakeen" },
    { type: "AML", label: "AML" },
    { type: "Selaa", label: "Selaa" },
  ];

  const filteredNodes = nodes.filter((node) =>
    node.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          onDragStart={(event) => onDragStart(event, node.type)}
          draggable>
          {node.label}
        </div>
      ))}
    </aside>
  );
}
