import { HTMLProps, ReactNode } from 'react';
import cn from 'classnames';

import styles from '../../styles.module.scss';

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

function AlertActions({ children, className = '', ...rest }: Props) {
  const classes = cn(styles.actions, className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

export default AlertActions;
