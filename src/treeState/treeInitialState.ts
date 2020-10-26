import { TreeDefinition } from "../components/tree";

// Defining TreeState interface to be array of TreeDfinitions
export interface TreeState {
  treeItems: TreeDefinition[];
  numOfNodes: number;
  lastUpdated: string;
}

// Initial state, empty array of treeItems
export const treeInitialState: TreeState = {
  treeItems: [],
  numOfNodes: 0,
  lastUpdated: "",
};
