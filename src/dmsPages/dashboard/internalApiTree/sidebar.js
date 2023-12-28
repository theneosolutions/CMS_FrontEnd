import React, { useState } from "react";

export default function Sidebar({ setName, name }) {
  const [searchTerm, setSearchTerm] = useState("");
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodes = [
    { type: "/decisions", label: "/decisions" },
    { type: "/login", label: "/login" },
    { type: "/Signup", label: "/Signup" },
    { type: "/Decision2", label: "/Decision2" },
    { type: "/Decision3", label: "/Decision3" },
    { type: "/Names", label: "/Names" },
  ];

  const filteredNodes = nodes.filter((node) =>
    node.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside>
      <input
        className="search-input w-full h-9 px-2 border-blue-500 border-2 rounded-sm outline-none"
        type="text"
        placeholder="Name of Set"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="search-input w-full h-9 px-2 border-gray-300 border-2 rounded-sm outline-none mt-4"
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
