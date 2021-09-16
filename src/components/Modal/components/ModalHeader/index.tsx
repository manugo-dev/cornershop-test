import cn from 'classnames';
import { HTMLProps, ReactNode } from 'react';

import styles from '../../styles.module.scss';

interface Props extends HTMLProps<HTMLHeadElement> {
  children: ReactNode;
  className?: string;
}

function ModalHeader({ children, className = '', ...rest }: Props) {
  const classes = cn(styles.header, className);

  return (
    <header className={classes} {...rest}>
      {children}
    </header>
  );
}

export default ModalHeader;
