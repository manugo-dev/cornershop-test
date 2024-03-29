import cn from 'classnames';
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
  inputRef?: React.RefObject<HTMLInputElement>;
}

function Input({
  id,
  icon,
  className = '',
  inputClassName = '',
  iconClassName = '',
  label,
  size = InputSize.REGULAR,
  inputRef,
  ...rest
}: Props) {
  return (
    <div className={cn('row middle wrap', styles.wrapper, className)}>
      {label && (
        <label htmlFor={id} className="full-width m-bottom-2">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        id={id}
        className={cn(styles.input, { [styles['with-icon']]: icon }, InputSizeClasses[size], inputClassName)}
        {...rest}
      />
      {icon && <span className={cn(styles.icon, iconClassName)}>{icon}</span>}
    </div>
  );
}

export default Input;
