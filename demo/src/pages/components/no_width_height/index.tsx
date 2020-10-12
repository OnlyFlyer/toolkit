import React from 'react'

import styles from './index.less'

export default () => {
  return (
    <div className={styles.nwh}>
      <div className={styles.nwh11}>
        <div>
          <div>1:1</div>
          <div>1:1</div>
          <div>1:1</div>
          <div>1:1</div>
          <div>1:1</div>
          <div>1:1</div>
          <span>1:1</span>
          <p>1:1</p>
        </div>
      </div>
      <div className={styles.nwh21}>
        <div>
          <div>2:1</div>
          <span>2:1</span>
          <p>2:1</p>
        </div>
      </div>
      <div className={styles.nwh43}>
        <div>
          <div>4:3</div>
          <span>4:3</span>
          <p>4:3</p>
        </div>
      </div>
      <div className={styles.nwh169}>
        <div>
          <div>16:9</div>
          <span>16:9</span>
          <p>16:9</p>
        </div>
      </div>
    </div>
  )
}