import { FC } from 'react'
import { Typography, Layout } from 'antd'
import styles from './Footer.module.scss'

const { Footer: AntFooter } = Layout
const { Text } = Typography

export const Footer: FC = () => {
  return (
    <AntFooter className={styles.footer}>
      <Text>© 2024 Editable Tree. All rights reserved.</Text>
    </AntFooter>
  )
}
