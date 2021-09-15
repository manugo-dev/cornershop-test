import cn from 'classnames';
import { HTMLProps } from 'react';

import styles from './styles.module.scss';

export enum ButtonSize {
  REGULAR,
  BIG
}
export enum ButtonKind {
  REGULAR = 'regular',
  FLAT = 'flat',
  RAISED = 'raised'
}
export enum ButtonColor {
  REGULAR = 'regular',
  DANGER = 'danger',
  WHITE = 'white'
}

const ButtonSizeClasses = {
  [ButtonSize.REGULAR]: '',
  [ButtonSize.BIG]: styles.big
};
const ButtonKindClasses = {
  [ButtonKind.REGULAR]: '',
  [ButtonKind.FLAT]: styles.flat,
  [ButtonKind.RAISED]: styles.raised
};
const ButtonColorClasses = {
  [ButtonColor.REGULAR]: '',
  [ButtonColor.DANGER]: styles.danger,
  [ButtonColor.WHITE]: styles.white
};

export type ButtonType = JSX.IntrinsicElements['button']['type'];

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: ButtonType;
  color?: ButtonColor;
  kind?: ButtonKind;
  size?: ButtonSize;
}

function Button({
  type,
  children,
  className = '',
  color = ButtonColor.REGULAR,
  kind = ButtonKind.REGULAR,
  size = ButtonSize.REGULAR,
  ...rest
}: Props) {
  const classes = cn(
    styles.button,
    ButtonColorClasses[color],
    ButtonKindClasses[kind],
    ButtonSizeClasses[size],
    className
  );

  return (
    <button type={type === 'submit' ? 'submit' : 'button'} className={classes} {...rest}>
      <span>{children}</span>
    </button>
  );
}

export default Button;
