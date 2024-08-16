import {
  DeleteFilled,
  EditFilled,
  FileOutlined,
  FolderOutlined,
  RightOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { useState } from "react";
import { useAppState } from "../../hooks/useAppState";

const Node = ({ node }) => {
  const { onEditName, onDelete, onAddFile } = useAppState();
  const [open, setOpen] = useState(false);
  const [addingFile, setAddingFile] = useState(false);
  const { label, id, children } = node;
  const [value, setValue] = useState(label);
  const [newLabel, setNewLabel] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const isFolder = Array.isArray(children) && children.length > 0;

  return (
    <>
      <div
        className="node"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span className={`right-arrow ${open ? "open" : ""}`}>
          {isFolder && <RightOutlined />}
        </span>

        {isEditing ? (
          <input
            value={value}
            onBlur={() => {
              onEditName(id, value);
              setIsEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEditName(id, value);
                setIsEditing(false);
              }
            }}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <span className="label">{label}</span>
        )}

        <Actions
          setIsEditing={setIsEditing}
          onDelete={onDelete}
          id={id}
          isFolder={isFolder}
          setOpen={setOpen}
          setAddingFile={setAddingFile}
        />
      </div>
      {isFolder && open && (
        <div className="node-content">
          <Nodes nodes={children} />
          {addingFile && (
            <input
              value={newLabel}
              onBlur={() => {
                onAddFile(id, newLabel);
                setAddingFile(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onAddFile(id, newLabel);
                  setAddingFile(false);
                }
              }}
              onChange={(e) => setNewLabel(e.target.value)}
            />
          )}
        </div>
      )}
    </>
  );
};

const Nodes = ({ nodes }) => {
  return (
    <div className="nodes">
      {nodes.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </div>
  );
};

export const FileExplorer = () => {
  const { nodes } = useAppState();
  return (
    <section className="file-explorer">
      <Nodes nodes={nodes} />
    </section>
  );
};
function Actions({
  setIsEditing,
  onDelete,
  id,
  isFolder,
  setOpen,
  setAddingFile,
}) {
  return (
    <div className="actions">
      <EditFilled onClick={() => setIsEditing(true)} />
      <DeleteFilled onClick={() => onDelete(id)} />
      {isFolder && (
        <>
          <FileOutlined
            onClick={(e) => {
              setOpen(true);
              setAddingFile(true);
              e.stopPropagation();
            }}
          />
          <FolderOutlined />
        </>
      )}
    </div>
  );
}
