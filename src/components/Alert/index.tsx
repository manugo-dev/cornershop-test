import cn from 'classnames';
import { HTMLProps, ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';
import Transition from 'react-transition-group/Transition';

import AlertActions from './components/AlertActions';
import AlertMessage from './components/AlertMessage';
import AlertTitle from './components/AlertTitle';
import styles from './styles.module.scss';

const TRANSITION_TIMEOUT = 195; // ms

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  isVisible?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

function Alert({ children, className = '', isVisible, onClose, onOpen, ...rest }: Props) {
  const alertContentRef = useRef<HTMLDivElement>(null);

  const handleEntered = () => {
    alertContentRef.current?.focus();
    if (onOpen && typeof onOpen === 'function') {
      onOpen();
    }
  };

  const handleExited = () => {
    if (onClose && typeof onOpen === 'function') {
      onClose();
    }
  };

  return (
    document.getElementById('alert-outlet') &&
    ReactDOM.createPortal(
      <Transition
        in={isVisible}
        timeout={TRANSITION_TIMEOUT}
        mountOnEnter
        unmountOnExit
        onEntered={handleEntered}
        onExited={handleExited}
      >
        {(status) => (
          <div
            className={cn(styles.alert, className)}
            role="dialog"
            aria-labelledby="alert-title"
            aria-modal="true"
            tabIndex={-1}
            {...rest}
          >
            <div className={cn(styles.backdrop, 'cs-fade-transition', `cs-fade-${status}`)} />
            <div
              ref={alertContentRef}
              className={cn(styles.content, styles['slide-transiition'], styles[`slide-${status}`])}
              tabIndex={-1}
              role="document"
            >
              {children}
            </div>
          </div>
        )}
      </Transition>,
      document.getElementById('alert-outlet')!
    )
  );
}

Alert.Actions = AlertActions;
Alert.Message = AlertMessage;
Alert.Title = AlertTitle;

export default Alert;
