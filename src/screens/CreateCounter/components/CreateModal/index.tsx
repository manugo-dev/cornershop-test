import Button, { ButtonKind } from 'components/Button';
import { CloseIcon } from 'components/Icons';
import Modal from 'components/Modal';
import CreateCounter from 'screens/CreateCounter';
import { ModalProps } from 'types/Modal';

function CreateCounterModal({ isModalVisible, hideModal }: ModalProps) {
  return (
    <Modal isVisible={isModalVisible}>
      <Modal.Header className="row middle">
        <Button className="m-right-2" kind={ButtonKind.CIRCLE} onClick={() => hideModal()}>
          <CloseIcon fill="var(--white)" />
        </Button>
        <Modal.Title>Create counter</Modal.Title>
        <Button className="m-left-auto" onClick={() => hideModal()}>
          Save
        </Button>
      </Modal.Header>
      <Modal.Body>
        <CreateCounter onSubmit={(title) => console.log(title)} />
      </Modal.Body>
    </Modal>
  );
}

export default CreateCounterModal;
