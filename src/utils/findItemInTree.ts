import { TreeDefinition } from "../components/tree";

export default function findItemInTree(
  treeItems: TreeDefinition[],
  itemId: string
): TreeDefinition | null {
  return (
    treeItems
      .map((child) => helper(child, itemId))
      .find((treeItem) => !!treeItem) || null
  );
}

function helper(
  treeItem: TreeDefinition,
  itemId: string
): TreeDefinition | null {
  if (treeItem.id === itemId) return treeItem;
  if (!treeItem.children || treeItem.children.length === 0) return null;
  return (
    treeItem.children
      .map((child) => helper(child, itemId))
      .find((treeItem) => !!treeItem) || null
  );
}
