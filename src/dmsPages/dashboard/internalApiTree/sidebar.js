import React, { useState } from "react";

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodes = [
    { type: "Sidebar", label: "Sidebar" },
    { type: "Small Sidebar", label: "Small Sidebar" },
    { type: "Menu", label: "Menu" },
    { type: "Home", label: "Home" },
    { type: "Api", label: "Api" },
    { type: "Menu 2", label: "Menu 2" },
    { type: "About", label: "About" },
    { type: "About 2", label: "About 2" },
    { type: "Link", label: "Link" },
    { type: "Borrow", label: "Borrow" },
    { type: "Emails", label: "Emails" },
    { type: "Tasks", label: "Tasks" },
    { type: "Reporting", label: "Reporting" },
    { type: "Home 2", label: "Home 2" },
    { type: "Tasks 3", label: "Tasks 3" },
    { type: "Private", label: "Private" },
    { type: "Routes", label: "Routes" },
    { type: "Services", label: "Services" },
    { type: "App", label: "App" },
    { type: "Move", label: "Move" },
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
