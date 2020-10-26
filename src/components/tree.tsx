import * as React from "react";
import "./style/tree.scss";
import { TreeState } from "../treeState/treeInitialState";
import { connect } from "react-redux";
import TreeNode from "./treeNode";
import addButton from "../assets/addButton.png";

export interface TreeDefinition {
  id: string;
  displayName: string;
  children: TreeDefinition[];
}

export interface TreeProps {
  addItem: (parentId?: string) => void;
  renameItem: (id: string, name: string) => void;
  removeItem: (id: string, parentId: string) => void;
  treeNodes: TreeDefinition[];
}

class Tree extends React.Component<TreeProps> {
  render() {
    return (
      <>
        <ul className="tree clt">
          {this.props.treeNodes &&
            this.props.treeNodes.map((treeNode: TreeDefinition) => (
              <TreeNode
                {...treeNode}
                addItem={this.props.addItem}
                renameItem={this.props.renameItem}
                removeItem={this.props.removeItem}
                key={treeNode.id}
                parentId={"Root"}
              />
            ))}
        </ul>
        <span
          className="add-node-wrapper"
          title="Add new node"
          onClick={() => {
            this.props.addItem();
          }}
        >
          <img className="add-node-image" alt="" src={addButton} />
        </span>
      </>
    );
  }
}

const mapStateToProps = (state: TreeState) => {
  return { treeNodes: state.treeItems };
};

export default connect(mapStateToProps)(Tree);
