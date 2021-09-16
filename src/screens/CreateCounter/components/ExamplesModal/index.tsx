import Button, { ButtonKind } from 'components/Button';
import { CloseIcon } from 'components/Icons';
import Modal from 'components/Modal';
import { ModalProps } from 'types/Modal';

function ExamplesModal({ isModalVisible, hideModal }: ModalProps) {
  return (
    <Modal isVisible={isModalVisible}>
      <Modal.Header className="row middle">
        <Button className="m-right-2" kind={ButtonKind.CIRCLE} onClick={() => hideModal()}>
          <CloseIcon fill="var(--white)" />
        </Button>
        <Modal.Title>Examples</Modal.Title>
      </Modal.Header>
      <Modal.Body>examples modal</Modal.Body>
    </Modal>
  );
}

export default ExamplesModal;
