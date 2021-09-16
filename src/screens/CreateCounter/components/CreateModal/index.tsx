import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actionCreators, CountersState, NAME as countersReducerName } from 'redux/ducks/counters';
import Button, { ButtonKind } from 'components/Button';
import { CloseIcon } from 'components/Icons';
import Modal from 'components/Modal';
import CreateCounter from 'screens/CreateCounter';
import { ModalProps } from 'types/Modal';

interface CreateCounterModalProps extends ModalProps, ConnectedProps<typeof connector> {}

function CreateCounterModal({ isModalVisible, hideModal, countersActions, title }: CreateCounterModalProps) {
  const { t } = useTranslation('CreateCounter');

  const createCounter = () => {
    if (title) {
      countersActions.addCounter(title);
      hideModal();
    }
  };

  return (
    <Modal isVisible={isModalVisible}>
      <Modal.Header className="row middle">
        <Button className="m-right-2" kind={ButtonKind.CIRCLE} onClick={() => hideModal()}>
          <CloseIcon fill="var(--white)" />
        </Button>
        <Modal.Title>{t('createTitle')}</Modal.Title>
        <Button className="m-left-auto" onClick={() => createCounter()}>
          Save
        </Button>
      </Modal.Header>
      <Modal.Body>
        <CreateCounter onSubmit={() => createCounter()} />
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state: { [countersReducerName]: CountersState }) => ({
  title: state[countersReducerName].create.creationTitle
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CreateCounterModal);
