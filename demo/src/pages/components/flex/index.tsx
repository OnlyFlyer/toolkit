import React from 'react'

import styles from './index.less'
const data = new Array(4).fill(1)

export default () => (
  <div className={styles.flex}>
    {data.map((e, i) => (
      <div className={styles.flex_item} key={`${e}_${i}`}>
        <div>
          <div>哈哈哈哈哈</div>
          <span>哈哈</span>
          <p>哈哈</p>
        </div>
      </div>
    ))}
  </div>
)