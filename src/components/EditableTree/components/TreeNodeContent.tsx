import { FC, memo } from 'react'
import { TreeActions, TreeActionsProps } from './TreeActions.tsx'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'

import styles from './TreeNodeContent.module.scss'

type TreeNodeContentProps = {
  id: number
  name: string
  isActive: boolean
  isRoot: boolean
  onAddNode: (parentId: number) => void
  onEditNode: (nodeId: number, nodeName: string) => void
  onDeleteNode: (nodeId: number) => void
}

const { confirm } = Modal

export const TreeNodeContent: FC<TreeNodeContentProps> = memo(
  ({ id, name, isActive, isRoot, onAddNode, onEditNode, onDeleteNode }) => {
    const treeActionsProps: TreeActionsProps = {
      onAdd: () => onAddNode(id),
    }

    if (!isRoot) {
      treeActionsProps.onEdit = () => onEditNode(id, name)
      treeActionsProps.onDelete = () =>
        confirm({
          title: 'Confirm Deletion',
          icon: <ExclamationCircleOutlined />,
          content: `Are you sure you want to delete ${name}?`,
          okText: 'Delete',
          okButtonProps: { danger: true },
          cancelText: 'Cancel',
          onOk: () => {
            onDeleteNode(id)
          },
        })
    }

    return (
      <div className={styles.node}>
        <span>{name}</span>
        {isActive && <TreeActions {...treeActionsProps} />}
      </div>
    )
  },
)
