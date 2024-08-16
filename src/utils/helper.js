export const findObjectById = (nodes, id) => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findObjectById(node.children, id);
      if (found) return found;
    }
  }
};

export const removeObjectById = (nodes, id) => {
  return nodes.filter((node) => {
    if (node.id === id) {
      console.log(node);
      return false;
    }
    if (node.children) {
      node.children = removeObjectById(node.children, id);
    }
    return true;
  });
};
