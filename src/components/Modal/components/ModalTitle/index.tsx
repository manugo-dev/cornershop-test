import cn from 'classnames';
import { HTMLProps, ReactNode } from 'react';

import styles from '../../styles.module.scss';

interface Props extends HTMLProps<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

function ModalTitle({ children, className = '', ...rest }: Props) {
  const classes = cn(styles.title, className);

  return (
    <h2 className={classes} id="modal-title" {...rest}>
      {children}
    </h2>
  );
}

export default ModalTitle;
