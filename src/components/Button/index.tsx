import classnames from 'classnames';
import { HTMLProps } from 'react';

import styles from './styles.module.css';

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
  [ButtonSize.BIG]: styles['cs-button--big']
};
const ButtonKindClasses = {
  [ButtonKind.REGULAR]: '',
  [ButtonKind.FLAT]: styles['cs-button--flat'],
  [ButtonKind.RAISED]: styles['cs-button--raised']
};
const ButtonColorClasses = {
  [ButtonColor.REGULAR]: '',
  [ButtonColor.DANGER]: styles['cs-button--danger'],
  [ButtonColor.WHITE]: styles['cs-button--white']
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
  const classes = classnames(
    styles['cs-button'],
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
