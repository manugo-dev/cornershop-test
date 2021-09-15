import cn from 'classnames';
import { HTMLProps } from 'react';

import styles from './styles.module.scss';

export enum InputSize {
  REGULAR,
  BIG
}

const InputSizeClasses = {
  [InputSize.REGULAR]: '',
  [InputSize.BIG]: styles.big
};

interface Props extends HTMLProps<HTMLInputElement> {
  className?: string;
  size?: InputSize;
}

function Input({ className = '', size = InputSize.REGULAR, ...rest }: Props) {
  const classes = cn(styles.input, InputSizeClasses[size], className);

  return <input className={classes} {...rest} />;
}

export default Input;
