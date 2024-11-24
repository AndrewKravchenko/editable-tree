import { FC } from 'react'
import { Typography, Layout } from 'antd'
import styles from './Header.module.scss'

const { Header: AntHeader } = Layout
const { Title } = Typography

export const Header: FC = () => {
  return (
    <AntHeader className={styles.header}>
      <Title className={styles.title} level={2}>
        Editable Tree
      </Title>
    </AntHeader>
  )
}
