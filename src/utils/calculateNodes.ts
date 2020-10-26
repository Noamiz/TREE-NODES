import { TreeDefinition } from "../components/tree";

export default function calculateRecusriveNumOfNodes(
  treeItems: TreeDefinition[]
): number {
  if (!treeItems) return 0;
  let counter = 0;
  treeItems.forEach((treeItem) => {
    counter += helper(treeItem);
  });
  return counter;
}

function helper(treeItem: TreeDefinition): number {
  if (!treeItem.children || treeItem.children.length === 0) return 1;
  let counter = 1;
  treeItem.children.forEach((treeItem) => {
    counter += helper(treeItem);
  });
  return counter;
}
