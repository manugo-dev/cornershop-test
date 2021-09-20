import cn from 'classnames';
import { HTMLProps, ReactNode } from 'react';

import styles from '../../styles.module.scss';

interface Props extends HTMLProps<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

function AlertTitle({ children, className = '', ...rest }: Props) {
  const classes = cn(styles.title, className);

  return (
    <h2 className={classes} id="alert-title" {...rest}>
      {children}
    </h2>
  );
}

export default AlertTitle;
