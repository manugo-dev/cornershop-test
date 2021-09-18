import { HTMLProps, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import Transition from 'react-transition-group/Transition';

import ModalBody from './components/ModalBody';
import ModalHeader from './components/ModalHeader';
import ModalTitle from './components/ModalTitle';

import styles from './styles.module.scss';

const TRANSITION_TIMEOUT = 295; // ms

interface Props extends HTMLProps<HTMLDivElement> {
  modalRef: React.RefObject<HTMLDivElement>;
  children: ReactNode;
  className?: string;
  isVisible?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

function Modal({ modalRef, children, className = '', isVisible, onClose, onOpen, ...rest }: Props) {
  const handleEntered = () => {
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
    document.getElementById('modal-outlet') &&
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
            className={cn(styles.modal, className)}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
            tabIndex={-1}
            {...rest}
          >
            <div className={cn(styles.backdrop, 'cs-fade-transition', `cs-fade-${status}`)} />
            <div
              ref={modalRef}
              className={cn(styles.content, styles['slide-transition'], styles[`slide-${status}`])}
              tabIndex={-1}
              role="document"
            >
              {children}
            </div>
          </div>
        )}
      </Transition>,
      document.getElementById('modal-outlet')!
    )
  );
}

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;

export default Modal;
