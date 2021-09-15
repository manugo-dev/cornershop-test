import cn from 'classnames';
import Button from 'components/Button';
import { HTMLProps, ReactNode } from 'react';

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
  inputClassName?: string;
  iconClassName?: string;
  size?: InputSize;
  icon?: ReactNode;
  clearable?: boolean;
}

function Input({
  id,
  icon,
  className = '',
  clearable = false,
  inputClassName = '',
  iconClassName = '',
  label,
  size = InputSize.REGULAR,
  ...rest
}: Props) {
  return (
    <div className={cn('row middle center', styles.wrapper, className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className={cn(styles.input, { [styles['with-icon']]: icon }, InputSizeClasses[size], inputClassName)}
        {...rest}
      />
      {icon && <span className={cn(styles.icon, iconClassName)}>{icon}</span>}
      {clearable && <Button>Clear</Button>}
    </div>
  );
}

export default Input;
