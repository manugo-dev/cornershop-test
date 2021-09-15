import classnames from 'classnames';
import { HTMLProps } from 'react';

import styles from './styles.module.css';

export enum InputSize {
  REGULAR,
  BIG
}

const InputSizeClasses = {
  [InputSize.REGULAR]: '',
  [InputSize.BIG]: styles['cs-input--big']
};

interface Props extends HTMLProps<HTMLInputElement> {
  className?: string;
  size?: InputSize;
}

function Input({ className = '', size = InputSize.REGULAR, ...rest }: Props) {
  const classes = classnames(styles['cs-input'], InputSizeClasses[size], className);

  return <input className={classes} {...rest} />;
}

export default Input;
