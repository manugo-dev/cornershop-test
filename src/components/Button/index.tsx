import cn from 'classnames';
import { HTMLProps } from 'react';

export enum ButtonSize {
  REGULAR,
  BIG
}
export enum ButtonKind {
  REGULAR = 'regular',
  FLAT = 'flat',
  RAISED = 'raised',
  CIRCLE = 'circle',
  CLEAN = 'clean',
  ROUNDED = 'rounded'
}
export enum ButtonColor {
  REGULAR = 'regular',
  DANGER = 'danger',
  WHITE = 'white',
  SILVER = 'silver',
  PRIMARY = 'primary'
}

const ButtonSizeClasses = {
  [ButtonSize.REGULAR]: '',
  [ButtonSize.BIG]: 'big'
};
const ButtonKindClasses = {
  [ButtonKind.REGULAR]: '',
  [ButtonKind.FLAT]: 'flat',
  [ButtonKind.RAISED]: 'raised',
  [ButtonKind.CIRCLE]: 'circle',
  [ButtonKind.CLEAN]: 'clean',
  [ButtonKind.ROUNDED]: 'rounded'
};
const ButtonColorClasses = {
  [ButtonColor.REGULAR]: '',
  [ButtonColor.DANGER]: 'danger',
  [ButtonColor.WHITE]: 'white',
  [ButtonColor.SILVER]: 'silver',
  [ButtonColor.PRIMARY]: 'primary'
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
    'button',
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
