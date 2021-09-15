import { HTMLProps, ReactNode } from 'react';
import cn from 'classnames';

import styles from '../../styles.module.scss';

interface Props extends HTMLProps<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

function AlertTitle({ children, className = '', ...rest }: Props) {
  const classes = cn(styles.alertTitle, className);

  return (
    <h2 className={classes} id="alert-title" {...rest}>
      {children}
    </h2>
  );
}

export default AlertTitle;
