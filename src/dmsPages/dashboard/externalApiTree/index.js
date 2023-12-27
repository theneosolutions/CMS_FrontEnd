import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Panel,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./sidebar";

import "./index.css";

const initialNodes = [];
const flowKey = "example-flow";

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    // setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  return (
    <div className="dndflow">
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onEdgeUpdate={onEdgeUpdate}
          fitView>
          <Controls />
          <Background variant="dots" gap={12} size={1} />
          <Panel position="top-right ">
            <div className="px-4 rtl:space-x-reverse">
              <button
                className="duration-200 bg-green-400 m-2  text-white  rtl:space-x-reverse py-2 px-5 rounded-md  hover:bg-green-500 cursor-pointer "
                onClick={onSave}>
                Save
              </button>
              <button
                className="duration-200 bg-blue-400 m-2 text-white rtl:space-x-reverse py-2 px-3 rounded-md  hover:bg-blue-500 cursor-pointer "
                onClick={onRestore}>
                Restore
              </button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

function FlowWithProvider(props) {
  return (
    <ReactFlowProvider>
      <DnDFlow {...props} />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;
