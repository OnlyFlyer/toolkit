import React from 'react';
import styles from './index.less';

export default () => {
  console.log('process:', process)
  console.log('env:', process.env)
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
