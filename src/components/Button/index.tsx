import classnames from 'classnames';
import { HTMLProps } from 'react';

import styles from './styles.module.css';

const ButtonSizeVariant = {
  regular: 'regular',
  big: 'big'
};
const ButtonKindVariant = {
  regular: 'regular',
  flat: 'flat',
  raised: 'raised'
};
const ButtonColorVariant = {
  regular: 'regular',
  danger: 'danger',
  white: 'white'
};

const ButtonSizeClasses = {
  [ButtonSizeVariant.regular]: '',
  [ButtonSizeVariant.big]: styles['cs-button--big']
};
const ButtonKindClasses = {
  [ButtonKindVariant.regular]: '',
  [ButtonKindVariant.flat]: styles['cs-button--flat'],
  [ButtonKindVariant.raised]: styles['cs-button--raised']
};
const ButtonColorClasses = {
  [ButtonColorVariant.regular]: '',
  [ButtonColorVariant.danger]: styles['cs-button--danger'],
  [ButtonColorVariant.white]: styles['cs-button--white']
};

type ButtonType = JSX.IntrinsicElements['button']['type'];

interface Props extends HTMLProps<HTMLButtonElement> {
  type: ButtonType;
}

function Button({
  type,
  children,
  className = '',
  color = ButtonColorVariant.regular,
  kind = ButtonKindVariant.regular,
  size = ButtonSizeVariant.regular,
  ...rest
}: Props) {
  const classes = classnames(
    'cs-button',
    ButtonColorClasses[color],
    ButtonKindClasses[kind],
    ButtonSizeClasses[size],
    className
  );

  return (
    <button type={type} className={classes} {...rest}>
      <span>{children}</span>
    </button>
  );
}

export default Button;
