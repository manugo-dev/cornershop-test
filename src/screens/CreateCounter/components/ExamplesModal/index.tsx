import Button, { ButtonKind } from 'components/Button';
import { CloseIcon } from 'components/Icons';
import Modal from 'components/Modal';
import { useTranslation } from 'react-i18next';
import { ModalProps } from 'types/Modal';

function ExamplesModal({ modalRef, isModalVisible, hideModal }: ModalProps) {
  const { t } = useTranslation('CreateCounter');

  return (
    <Modal modalRef={modalRef} isVisible={isModalVisible}>
      <Modal.Header className="row middle">
        <Button className="m-right-2" kind={ButtonKind.CIRCLE} onClick={() => hideModal()}>
          <CloseIcon fill="var(--white)" />
        </Button>
        <Modal.Title>{t('examplesTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>examples modal</Modal.Body>
    </Modal>
  );
}

export default ExamplesModal;
