import cn from 'classnames';

import Button, { ButtonKind } from 'components/Button';
import { CloseIcon } from 'components/Icons';
import Modal from 'components/Modal';
import useModal from 'hooks/useModal';

import styles from './styles.module.scss';

interface ModalProps {
  isModalVisible: boolean;
  hideModal: () => void;
}

function ExamplesModal({ isModalVisible, hideModal }: ModalProps) {
  return (
    <Modal isVisible={isModalVisible}>
      <Modal.Header className="row middle" withCloseButton>
        <Button className="m-right-2" kind={ButtonKind.CIRCLE} onClick={() => hideModal()}>
          <CloseIcon fill="var(--white)" />
        </Button>
        <Modal.Title>Examples</Modal.Title>
      </Modal.Header>
      <Modal.Body>examples modal</Modal.Body>
    </Modal>
  );
}

function CreateCounterModal({ isModalVisible, hideModal }: ModalProps) {
  const {
    isVisible: isExamplesModalVisible,
    hideModal: hideExamplesModal,
    showModal: showExamplesModal
  } = useModal();

  return (
    <Modal isVisible={isModalVisible}>
      <Modal.Header className="row middle" withCloseButton>
        <Button className="m-right-2" kind={ButtonKind.CIRCLE} onClick={() => hideModal()}>
          <CloseIcon fill="var(--white)" />
        </Button>
        <Modal.Title>Create counter</Modal.Title>
        <Button className="m-left-auto" onClick={() => hideModal()}>
          Save
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={() => showExamplesModal()}>examples</Button>
        <ExamplesModal isModalVisible={isExamplesModalVisible} hideModal={hideExamplesModal} />
      </Modal.Body>
    </Modal>
  );
}

function CreateCounter() {
  return <div className={cn(styles.content)}>counter creator</div>;
}

CreateCounter.Modal = CreateCounterModal;
CreateCounter.ExamplesModal = ExamplesModal;
export default CreateCounter;
