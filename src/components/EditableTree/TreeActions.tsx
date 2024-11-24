import { FC, MouseEvent } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export type TreeActionsProps = {
  onAdd: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export const TreeActions: FC<TreeActionsProps> = ({ onEdit, onAdd, onDelete }) => {
  const handleClickCreator = (action?: () => void) => {
    return (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      action?.()
    }
  }

  return (
    <>
      <Button variant="text" color="primary" size="small" icon={<PlusOutlined />} onClick={handleClickCreator(onAdd)} />
      {onEdit && (
        <Button
          variant="text"
          color="default"
          size="small"
          icon={<EditOutlined />}
          onClick={handleClickCreator(onEdit)}
        />
      )}
      {onDelete && (
        <Button
          variant="text"
          color="danger"
          size="small"
          icon={<DeleteOutlined />}
          onClick={handleClickCreator(onDelete)}
        />
      )}
    </>
  )
}
