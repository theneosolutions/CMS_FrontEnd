import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar({ setName, name }) {
  const [searchTerm, setSearchTerm] = useState("");
  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node.type);
    event.dataTransfer.setData("application/reactflow2", JSON.stringify(node));

    event.dataTransfer.effectAllowed = "move";
  };
  const dispatch = useDispatch();
  const endpoints = useSelector((state) => state.endpoints);
  console.log(
    "apisssssssssssssapisssssssssssssapisssssssssssss",
    endpoints[0]?.apiFlow
  );
  useEffect(() => {
    dispatch({
      type: "GET_ENDPOINTS",
    });
  }, []);

  const nodes2 =
    endpoints[0]?.apiFlow?.map((endpoint) => {
      // Split the endpoint by slashes
      const parts = endpoint.split("/");
      console.log("parts", parts);
      // Extract the last two parts as label
      const label = `/${parts[parts.length - 2]}/${parts[parts.length - 1]}`;

      // Create the object with type and label
      return { type: endpoint, label: label };
    }) || [];
  console.log("helo from endpoints", nodes2);

  const nodes = [
    { type: "/decisions", label: "/decisions" },
    { type: "/login", label: "/login" },
    { type: "/Signup", label: "/Signup" },
    { type: "/Decision2", label: "/Decision2" },
    { type: "/Decision3", label: "/Decision3" },
    { type: "/Names", label: "/Names" },
  ];

  const filteredNodes = nodes2?.filter((node) =>
    node.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="bg-red-400">
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
          onDragStart={(event) => onDragStart(event, node)}
          draggable>
          {node.label}
        </div>
      ))}
    </aside>
  );
}

const apiFlow = [
  "/api/v1/cms/branding/save",
  "/api/v1/cms/branding/getById",
  "/api/v1/cms/branding/getBrandDetailByName",
  "/api/v1/cms/branding/getAll",
  "/api/v1/cms/branding/deleteById",
  "/api/v1/cms/navbar/save",
  "/api/v1/cms/navbar/getById",
  "/api/v1/cms/navbar/getAll",
];
