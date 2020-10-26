import { TreeState, treeInitialState } from "./treeInitialState";
import actionTypes from "./treeActionTypes";
import findItemInTree from "../utils/findItemInTree";
import getTimestamp from "../utils/getTimestamp";

// Reducer gets the state and the action object from the treeActions
// which indludes the type plus other properties, and returns the current
// state after changing it
export default function treeReducer(
  treeState: TreeState = treeInitialState,
  action: any
) {
  switch (action.type) {
    case actionTypes.SET_TREES:
      return {
        ...treeState,
        treeItems: action.treeItems || [],
        lastUpdated: getTimestamp(),
      };
    case actionTypes.RENAME_ITEM:
      const item = findItemInTree(treeState.treeItems, action.itemId);
      if (item) item.displayName = action.name;
      return { ...treeState, lastUpdated: getTimestamp() };

    case actionTypes.REMOVE_ITEM:
      let parent = findItemInTree(treeState.treeItems, action.parentId);
      if (parent) {
        parent.children = parent.children.filter(
          (child) => child.id !== action.itemId
        );
      } else {
        treeState.treeItems = treeState.treeItems.filter(
          (treeItem) => treeItem.id !== action.itemId
        );
      }
      return {
        ...treeState,
        numOfNodes: treeState.numOfNodes - 1,
        lastUpdated: getTimestamp(),
      };

    case actionTypes.SET_NUM_OF_NODES:
      return {
        ...treeState,
        numOfNodes: action.numOfNodes,
        lastUpdated: getTimestamp(),
      };
    case actionTypes.ADD_ITEM:
      const parentItem = findItemInTree(treeState.treeItems, action.parentId);
      if (parentItem) {
        if (!parentItem.children) parentItem.children = [];
        parentItem.children.push(action.item);
      } else {
        treeState.treeItems.push(action.item);
      }
      return {
        ...treeState,
        numOfNodes: treeState.numOfNodes + 1,
        lastUpdated: getTimestamp(),
      };
    default:
      return treeState;
  }
}
