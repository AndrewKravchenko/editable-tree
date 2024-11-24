import { apiClient } from './client'
import type { TreeNode } from '@/types'
import { AxiosError } from 'axios'

const API_PREFIX = 'api.user.tree'

export const handleApiError = (error: unknown) => {
  const defaultMessage = 'Unknown error occurred'
  let message = defaultMessage

  if (error instanceof AxiosError) {
    message = error.response?.data?.data?.message || error.message || defaultMessage
  }

  console.error(`API Error: ${message}`)
  throw new Error(message)
}

export const treeService = {
  getTree: async (treeName: string): Promise<TreeNode | void> => {
    try {
      const response = await apiClient.post(`${API_PREFIX}.get`, null, { params: { treeName } })
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  },
  createNode: async (treeName: string, parentNodeId: number, nodeName: string): Promise<void> => {
    try {
      await apiClient.post(`${API_PREFIX}.node.create`, null, {
        params: { treeName, parentNodeId, nodeName },
      })
    } catch (error) {
      handleApiError(error)
    }
  },
  renameNode: async (treeName: string, nodeId: number, newNodeName: string): Promise<void> => {
    try {
      await apiClient.post(`${API_PREFIX}.node.rename`, null, {
        params: { treeName, nodeId, newNodeName },
      })
    } catch (error) {
      handleApiError(error)
    }
  },
  deleteNode: async (treeName: string, nodeId: number): Promise<void> => {
    try {
      await apiClient.post(`${API_PREFIX}.node.delete`, null, { params: { treeName, nodeId } })
    } catch (error) {
      handleApiError(error)
    }
  },
}
