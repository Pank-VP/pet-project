import React, { FC } from 'react';
import styles from './Tooltip.module.scss';

interface ITooltip {
  children: React.ReactNode;
  content: string;
}
const Tooltip: FC<ITooltip> = ({content, children}) => {
  return (
    <div className={styles.container}>
      {children}
      <span className={styles.container_text}>
        {content}
      </span>
    </div>
  )
}

export default Tooltip;
