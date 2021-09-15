import cn from 'classnames';
import { HTMLProps, ReactNode } from 'react';

import styles from '../../styles.module.scss';

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

function ModalBody({ children, className = '', ...rest }: Props) {
  const classes = cn(styles.body, className);

  return (
    <section className={classes} {...rest}>
      {children}
    </section>
  );
}

export default ModalBody;
