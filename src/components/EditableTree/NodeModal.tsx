import { FC, useState, useEffect } from 'react'
import { Modal, Input } from 'antd'

type NodeModalProps = {
  visible: boolean
  title: string
  onClose: () => void
  onSave: (name: string) => void
  currentName?: string
}

export const NodeModal: FC<NodeModalProps> = ({ visible, title, onClose, onSave, currentName = '' }) => {
  const [name, setName] = useState(currentName)

  useEffect(() => {
    if (visible) {
      setName(currentName)
    }
  }, [currentName, visible])

  const handleSave = () => {
    const trimmedName = name.trim()
    if (trimmedName) {
      onSave(trimmedName)
    }
  }

  return (
    <Modal open={visible} title={title} onCancel={onClose} onOk={handleSave} okText="Save" cancelText="Cancel">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter node name" />
    </Modal>
  )
}
