import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import Button, { ButtonColor, ButtonKind } from 'components/Button';
import { CloseIcon } from 'components/Icons';
import Modal from 'components/Modal';
import Loading from 'components/Loading';
import { useLazyRequest } from 'hooks/useRequest';
import { actionCreators } from 'redux/ducks/counters';
import { addCounter } from 'services/CounterService';
import { ModalProps } from 'types/Modal';

import MOCKS from './mock';
import styles from '../../styles.module.scss';

interface ExamplesModalProps extends ModalProps, ConnectedProps<typeof connector> {}

function ExamplesModal({ modalRef, isModalVisible, hideModal, countersActions }: ExamplesModalProps) {
  const { t } = useTranslation('CreateCounter');

  const [, loading, , createCounter] = useLazyRequest({
    request: addCounter,
    withPostSuccess: (data) => {
      countersActions.addCounter(data);
      hideModal();
    }
  });

  const setThisTitle = (title: string) => {
    createCounter(title);
    hideModal();
  };

  return (
    <Modal modalRef={modalRef} isVisible={isModalVisible}>
      <Modal.Header className="row middle">
        <Button className="m-right-2" kind={ButtonKind.CIRCLE} onClick={() => hideModal()}>
          <CloseIcon fill="var(--white)" />
        </Button>
        <Modal.Title>{t('examplesTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <Loading fullScreen />}
        <p className="text grey m-bottom-5">{t('examplesDescription')}</p>
        {MOCKS.map((category) => (
          <>
            <h3 className="m-bottom-1 m-top-5">{category.title}</h3>
            <div className={cn('full-width overflow-x', styles.options)}>
              {category.items.map((item) => (
                <Button
                  key={item}
                  className="m-right-2"
                  color={ButtonColor.SILVER}
                  kind={ButtonKind.ROUNDED}
                  onClick={() => setThisTitle(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </>
        ))}
      </Modal.Body>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});
const connector = connect(null, mapDispatchToProps);

export default connector(ExamplesModal);
