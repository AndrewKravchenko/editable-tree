import { FC } from 'react'
import { Layout } from 'antd'
import { Header, EditableTree, Footer } from '@/components'
import styles from './App.module.scss'

const { Content } = Layout

const treeName = 'Unique tree'

const App: FC = () => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Content className={styles.content}>
        <EditableTree treeName={treeName} />
      </Content>
      <Footer />
    </Layout>
  )
}

export default App
