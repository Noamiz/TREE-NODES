import * as React from "react";
import "./App.scss";
import API from "./API";
import Tree, { TreeDefinition } from "./components/tree";
import { connect } from "react-redux";
import { setTrees } from "./treeState/treeActions";
import generateId from "./utils/idGenerator";
import saveButton from "./assets/saveButton.png";
import reloadButton from "./assets/reloadButton.png";
import { TreeState } from "./treeState/treeInitialState";

import {
  addItem,
  setNumOfNodes,
  renameItem,
  removeItem,
} from "./treeState/treeActions";
import calculateRecusriveNumOfNodes from "./utils/calculateNodes";

export interface Props {
  addItem: (parentId?: string) => void;
  renameItem: (id: string, name: string) => void;
  removeItem: (id: string, parentId: string) => void;
  loadTree: () => void;
  treeItems: TreeDefinition[];
  numOfNodes: number;
  lastUpdated?: string;
}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.loadTree();
  }

  onSaveClick = () => {
    API.setTree(this.props.treeItems);
  };

  onReloadClick = () => {
    this.props.loadTree();
  };

  render() {
    return (
      <div className="App">
        <Tree
          // @ts-ignore
          treeNodes={[]}
          addItem={this.props.addItem}
          renameItem={this.props.renameItem}
          removeItem={this.props.removeItem}
        />
        <div className="options-wrapper">
          <div
            className="option-wrapper"
            onClick={this.onSaveClick}
            title="Save Tree"
          >
            <img alt="" className="option-image" src={saveButton} />
          </div>
          <div
            className="option-wrapper"
            onClick={this.onReloadClick}
            title="Reload Tree"
          >
            <img alt="" className="option-image" src={reloadButton} />
          </div>
          <div className="nodes-counter">
            Total nodes: {this.props.numOfNodes}
          </div>
          {this.props.lastUpdated && (
            <div className="nodes-counter">
              Last updated: {this.props.lastUpdated}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: TreeState) => {
  return {
    treeItems: state.treeItems,
    numOfNodes: state.numOfNodes,
    lastUpdated: state.lastUpdated,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadTree: () => {
      API.fetchTree().then((data) => {
        dispatch(setTrees(data));
        const numOfNodes = calculateRecusriveNumOfNodes(data);
        dispatch(setNumOfNodes(numOfNodes));
      });
    },
    addItem: (parentId: string) => {
      const generatedId = generateId();
      dispatch(
        addItem(
          {
            id: generatedId,
            displayName: "New node (click to edit)",
            children: [],
          },
          parentId
        )
      );
    },
    removeItem: (id: string, parentId: string) => {
      dispatch(removeItem(id, parentId));
    },
    renameItem: (id: string, name: string) => {
      dispatch(renameItem(id, name));
    },
  };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(App);
