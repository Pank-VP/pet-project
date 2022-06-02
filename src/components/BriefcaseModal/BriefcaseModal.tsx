import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './BriefcaseModal.module.scss';

interface IModalProps {
  active: boolean;
  setActive: (val: boolean) => void;
  children: React.ReactNode;
}
const Modal: FC<IModalProps> = ({active, setActive, children}) => {
  return (
    <div className={clsx(styles.container, active && styles.container_active)} onClick={() => setActive(false)}>
      <div className={clsx(styles.container_content, active && styles.container_content_active)} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        {children}
        <button className={styles.container_close} onClick={() => setActive(false)}>
          X
        </button>
      </div>
    </div>
  )
}

export default Modal;
