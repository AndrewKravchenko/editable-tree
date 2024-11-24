import { FC, useState } from 'react'
import RcTree from 'rc-tree'
import type { DataNode, Key } from 'rc-tree/lib/interface'
import { TreeNodeContent } from './TreeNodeContent.tsx'
import type { TreeNode } from '@/types'
import 'rc-tree/assets/index.css'

type EditableTreeProps = {
  treeData: TreeNode
  onAddNode: (parentId: number) => void
  onEditNode: (nodeId: number, nodeName: string) => void
  onDeleteNode: (nodeId: number) => void
}

export const InteractiveTree: FC<EditableTreeProps> = ({ treeData, onAddNode, onEditNode, onDeleteNode }) => {
  const [activeNodeKey, setActiveNodeKey] = useState<Key | null>(null)

  const transformTreeNode = (node: TreeNode): DataNode => {
    const isRoot = node.id === treeData.id
    const isActive = activeNodeKey === node.id

    return {
      key: node.id,
      title: (
        <TreeNodeContent
          id={node.id}
          name={node.name}
          isActive={isActive}
          isRoot={isRoot}
          onAddNode={onAddNode}
          onEditNode={onEditNode}
          onDeleteNode={onDeleteNode}
        />
      ),
      children: node.children.map(transformTreeNode),
    }
  }

  const handleExpand = (_keys: Key[], { node }: { node: DataNode }): void => {
    setActiveNodeKey(node.key)
  }

  return (
    <>
      <RcTree
        treeData={[transformTreeNode(treeData)]}
        expandAction="click"
        onExpand={handleExpand}
        selectable={false}
        showIcon={false}
      />
    </>
  )
}
