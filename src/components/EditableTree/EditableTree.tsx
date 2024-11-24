import { FC, useCallback, useState } from 'react'
import { InteractiveTree } from './components/InteractiveTree.tsx'
import { NodeModal } from './components/NodeModal.tsx'
import { treeService } from '@/api/treeService'
import { useFetchTree } from './useFetchTree.ts'
import { Button, notification } from 'antd'

import styles from './EditableTree.module.scss'

const enum TreePopupMode {
  ADD = 'add',
  EDIT = 'edit',
}

type PopupData = {
  id: number
  name: string
  mode: TreePopupMode
}

export const EditableTree: FC<{ treeName: string }> = ({ treeName }) => {
  const [modalData, setModalData] = useState<PopupData | null>(null)

  const { treeData, loading, error, fetchTree } = useFetchTree(treeName)

  const showErrorNotification = useCallback((message: string) => {
    notification.error({
      placement: 'top',
      message: 'Error',
      description: message,
      duration: 4,
    })
  }, [])

  const handleAddNode = useCallback((parentId: number) => {
    setModalData({ id: parentId, name: '', mode: TreePopupMode.ADD })
  }, [])
  const handleEditNode = useCallback((nodeId: number, nodeName: string) => {
    setModalData({ id: nodeId, name: nodeName, mode: TreePopupMode.EDIT })
  }, [])
  const handleDeleteNode = useCallback(
    async (nodeId: number) => {
      try {
        await treeService.deleteNode(treeName, nodeId)
        await fetchTree()
      } catch (error) {
        showErrorNotification((error as Error).message)
      }
    },
    [fetchTree, showErrorNotification, treeName],
  )

  const closeModal = () => setModalData(null)

  const handlePopupSave = async (name: string) => {
    if (!modalData) {
      return
    }

    try {
      if (modalData.mode === TreePopupMode.ADD) {
        await treeService.createNode(treeName, modalData.id, name)
      } else {
        await treeService.renameNode(treeName, modalData.id, name)
      }
      await fetchTree()
    } catch (error) {
      showErrorNotification((error as Error).message)
    } finally {
      closeModal()
    }
  }

  const popupTitle = modalData?.mode === TreePopupMode.ADD ? 'Add Node' : 'Edit Node'

  return (
    <div className={styles.treeContainer}>
      {loading && <div className={styles.centerMessage}>Loading...</div>}
      {error && (
        <div className={`${styles.centerMessage} ${styles.errorMessage}`}>
          <p>Something went wrong. Please try again.</p>
          <Button onClick={fetchTree}>Retry</Button>
        </div>
      )}
      {treeData && (
        <InteractiveTree
          treeData={treeData}
          onAddNode={handleAddNode}
          onEditNode={handleEditNode}
          onDeleteNode={handleDeleteNode}
        />
      )}
      <NodeModal
        title={popupTitle}
        visible={!!modalData}
        onClose={closeModal}
        onSave={handlePopupSave}
        currentName={modalData?.name}
      />
    </div>
  )
}
