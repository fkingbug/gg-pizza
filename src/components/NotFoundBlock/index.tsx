import React, { FC } from 'react'

import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock: FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        к сожалению данная страница отсутсвует на нашем интернет-магазине
      </p>
    </div>
  )
}
