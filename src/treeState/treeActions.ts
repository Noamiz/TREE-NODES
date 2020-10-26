import { TreeDefinition } from "../components/tree";
import actionTypes from "./treeActionTypes";

export const addItem = (item: TreeDefinition, parentId: string) => ({
  type: actionTypes.ADD_ITEM,
  item,
  parentId,
});

export const removeItem = (itemId: string, parentId: string) => ({
  type: actionTypes.REMOVE_ITEM,
  itemId,
  parentId,
});

export const renameItem = (itemId: string, name: string) => ({
  type: actionTypes.RENAME_ITEM,
  itemId,
  name,
});

export const setTrees = (treeItems: TreeDefinition[]) => ({
  type: actionTypes.SET_TREES,
  treeItems,
});

export const setNumOfNodes = (numOfNodes: number) => ({
  type: actionTypes.SET_NUM_OF_NODES,
  numOfNodes,
});
