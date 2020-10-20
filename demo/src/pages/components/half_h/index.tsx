import React from 'react'

import styles from './index.less'

const arr = new Array(100).fill(1)

export default () => {
  return (
    <div>
      <div style={{ background: '#faa' }} className={styles.nwhhalfByAfter}>
        <div>
          {arr.map((e, i: number) => (
            <div key={i}>宽度60%, 高度是宽度的一半 通过伪类after</div>
          ))}
        </div>
      </div>
      <div style={{ background: '#cccc' }} className={styles.nwhhalfByPadding}>
        <div>
          {arr.map((e, i: number) => (
            <div key={i}>宽度60%, 高度是宽度的一半 通过 padding-bottom</div>
          ))}
        </div>
      </div>
      <div style={{ background: '#faa' }} className={styles.nwhhalfByBefore}>
        <div>
          {arr.map((e, i: number) => (
            <div key={i}>宽度60%, 高度是宽度的一半 通过伪类before</div>
          ))}
        </div>
      </div>
    </div>
  )
}