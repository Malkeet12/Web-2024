import propTypes from "prop-types";
import { useState, createContext } from "react";
import { findObjectById, removeObjectById } from "../utils/helper";

export const AppStateContext = createContext();

const items = [
  {
    label: "src",
    id: "1",
    children: [
      {
        label: "components",
        id: "2",
        children: [
          {
            label: "autocomplete.jsx",
            id: "3",
          },
        ],
      },
    ],
  },
  {
    label: "package.json",
    id: "4",
  },
];

export const AppStateProvider = ({ children }) => {
  const [nodes, setNodes] = useState(items);

  const onEditName = (id, value) => {
    const clone = JSON.parse(JSON.stringify(nodes));
    const current = findObjectById(clone, id);
    current.label = value;
    setNodes(clone);
  };
  const onDelete = (id) => {
    let clone = JSON.parse(JSON.stringify(nodes));
    clone = removeObjectById(clone, id);
    setNodes(clone);
  };
  const onAddFile = (id, value) => {
    const clone = JSON.parse(JSON.stringify(nodes));
    const current = findObjectById(clone, id);
    const newNode = { label: value, id: Date.now() };
    current.children.push(newNode);
    setNodes(clone);
  };
  return (
    <AppStateContext.Provider
      value={{ nodes, setNodes, onEditName, onDelete, onAddFile }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
AppStateProvider.propTypes = {
  children: propTypes.node.isRequired,
};
