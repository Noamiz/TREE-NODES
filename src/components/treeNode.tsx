import * as React from "react";
import greenPlus from "../assets/greenPlus.png";
import redMinus from "../assets/redMinus.png";
import blackCircle from "../assets/blackCircle.png";
import addButton from "../assets/addButton.png";
import removeButton from "../assets/removeButton.png";
import type { TreeDefinition } from "./tree";

export interface TreeNodeProps extends TreeDefinition {
  addItem: (id?: string) => void;
  renameItem: (id: string, name: string) => void;
  removeItem: (id: string, parentId: string) => void;
  parentId: string;
}

export interface TreeNodeState {
  isCollapsed: boolean;
  isRenaming: boolean;
  currentName: string;
}

class TreeNode extends React.Component<TreeNodeProps, TreeNodeState> {
  state = {
    isCollapsed: true,
    isRenaming: false,
    currentName: this.props.displayName,
  };


  toggleCollapse = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  handleRename = () => {
    this.setState({ isRenaming: true });
  };

  handleOnBlur = () => {
    this.props.renameItem(this.props.id, this.state.currentName);
    this.setState({ isRenaming: false });
  };

  render() {
    return (
      <li className="tree-item clt" key={this.props.id}>
        <div className="tree-header">
          {this.props?.children?.length > 0 ? (
            <span className="tree-collapse" onClick={this.toggleCollapse}>
              <img
                title={this.state.isCollapsed ? "Expand" : "Collapse"}
                alt=""
                className="tree-collapse-image"
                src={this.state.isCollapsed ? greenPlus : redMinus}
              ></img>
            </span>
          ) : (
            <span
              className="empty-children-wrapper"
              onClick={this.toggleCollapse}
            >
              <img
                title={"Leaf"}
                alt=""
                className="empty-children-wrapper-image"
                src={blackCircle}
              ></img>
            </span>
          )}
          {this.state.isRenaming ? (
            <input
              className="display-name-input"
              type="text"
              value={this.state.currentName}
              onChange={(e) => this.setState({ currentName: e.target.value })}
              onBlur={this.handleOnBlur}
              autoFocus={true}
            ></input>
          ) : (
            <span className="tree-name" onClick={this.handleRename}>
              {this.props.displayName}
            </span>
          )}
        </div>

        {this.props?.children?.length > 0 && !this.state.isCollapsed && (
          <ul className="tree clt">
            {this.props.children.map((treeNode: TreeDefinition) => (
              <TreeNode
                {...treeNode}
                parentId={this.props.id}
                key={treeNode.id}
                addItem={this.props.addItem}
                renameItem={this.props.renameItem}
                removeItem={this.props.removeItem}
              />
            ))}
          </ul>
        )}
        <div className="actions-wrapper">
          <div
            className="tree-add-clickable"
            title="Add child"
            onClick={() => {
              this.setState({ isCollapsed: false });
              this.props.addItem(this.props.id);
            }}
          >
            <img alt="" className="tree-add-clickable-image" src={addButton} />
          </div>
          <div
            className="tree-add-clickable"
            title="Remove node"
            onClick={() => {
              this.props.removeItem(this.props.id, this.props.parentId);
            }}
          >
            <img
              alt=""
              className="tree-add-clickable-image"
              src={removeButton}
            />
          </div>
        </div>
      </li>
    );
  }
}

export default TreeNode;
