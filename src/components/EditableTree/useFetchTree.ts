import { useCallback, useEffect, useState } from 'react'
import { TreeNode } from '@/types'
import { treeService } from '@/api/treeService'

export const useFetchTree = (treeName: string) => {
  const [treeData, setTreeData] = useState<TreeNode | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTree = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = (await treeService.getTree(treeName)) || null
      setTreeData(data)
    } catch (error) {
      const errorMessage = (error as Error).message

      setTreeData(null)
      setError(errorMessage)
      console.error('Failed to fetch tree:', errorMessage)
    } finally {
      setLoading(false)
    }
  }, [treeName])

  useEffect(() => {
    fetchTree()
  }, [fetchTree])

  return { treeData, loading, error, fetchTree }
}
