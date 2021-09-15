import { HTMLProps, ReactNode } from 'react';
import cn from 'classnames';

import styles from '../../styles.module.scss';

interface Props extends HTMLProps<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

function AlertMessage({ children, className = '', ...rest }: Props) {
  const classes = cn(styles.alertMessage, className);

  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  );
}

export default AlertMessage;
