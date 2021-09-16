import { HTMLProps, ReactNode } from 'react';
import cn from 'classnames';

import styles from '../../styles.module.scss';

interface Props extends HTMLProps<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

function AlertMessage({ children, className = '', ...rest }: Props) {
  const classes = cn(styles.message, className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

export default AlertMessage;
