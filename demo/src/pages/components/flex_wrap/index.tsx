import React from 'react'

import styles from './index.less'

const data = new Array(11).fill(1)

export default () => (
  <div className={styles.flex_wrapp}>
    {data.map((e, i) => (
      <div className={styles.wrapper} key={`${e}_${i}`}>
        <div className={styles.content}>
          <span>哈哈哈</span>
        </div>
      </div>
    ))}
</div>
)