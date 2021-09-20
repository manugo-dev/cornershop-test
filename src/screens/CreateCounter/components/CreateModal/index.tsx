import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Button, { ButtonKind } from 'components/Button';
import { CloseIcon } from 'components/Icons';
import Loading from 'components/Loading';
import Modal from 'components/Modal';
import { useLazyRequest } from 'hooks/useRequest';
import { actionCreators, CountersState, NAME as countersReducerName } from 'redux/ducks/counters';
import CreateCounter from 'screens/CreateCounter';
import { addCounter } from 'services/CounterService';
import { ModalProps } from 'types/Modal';

interface CreateCounterModalProps extends ModalProps, ConnectedProps<typeof connector> {
  showExamples: () => void;
}

function CreateCounterModal({
  modalRef,
  isModalVisible,
  hideModal,
  countersActions,
  title,
  showExamples
}: CreateCounterModalProps) {
  const { t } = useTranslation('CreateCounter');

  const [, loading, , createCounter] = useLazyRequest({
    request: addCounter,
    withPostSuccess: (data) => {
      countersActions.addCounter(data);
      hideModal();
    }
  });

  return (
    <Modal modalRef={modalRef} isVisible={isModalVisible}>
      <Modal.Header className="row middle">
        <Button aria-label="close" className="m-right-2" kind={ButtonKind.CIRCLE} onClick={() => hideModal()}>
          <CloseIcon fill="var(--white)" />
        </Button>
        <Modal.Title>{t('createTitle')}</Modal.Title>
        <Button className="m-left-auto" onClick={() => createCounter(title)} disabled={!title}>
          {t('Global:save')}
        </Button>
      </Modal.Header>
      <Modal.Body>
        {loading && <Loading fullScreen />}
        <CreateCounter onSubmit={() => createCounter(title)} showExamples={showExamples} />
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state: { [countersReducerName]: CountersState }) => ({
  title: state[countersReducerName].creationTitle
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CreateCounterModal);
