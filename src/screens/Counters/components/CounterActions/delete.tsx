import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { NETWORK_ERROR } from 'apisauce';

import Alert from 'components/Alert';
import Button, { ButtonColor, ButtonKind } from 'components/Button';
import Loading from 'components/Loading';
import { TrashBinIcon } from 'components/Icons';
import useAlert from 'hooks/useAlert';
import { useLazyRequest } from 'hooks/useRequest';
import { actionCreators } from 'redux/ducks/counters';
import { deleteCounter } from 'services/CounterService';
import { Counter } from 'types/Counter';

import styles from './styles.module.scss';

interface Props extends ConnectedProps<typeof connector> {
  counters: Counter[];
  disabled?: boolean;
}

function DeleteCounter({ disabled, counters, countersActions }: Props) {
  const { t } = useTranslation('CounterActions');
  const {
    isVisible: removeAlertVisible,
    hideAlert: removeAlertHide,
    showAlert: removeAlertShow
  } = useAlert();
  const { isVisible: errorAlertVisible, hideAlert: errorAlertHide, showAlert: errorAlertShow } = useAlert();

  const [, loading, , removeCounter] = useLazyRequest({
    request: deleteCounter,
    withPostSuccess: (counter) => {
      countersActions.deleteCounter(counter);
    },
    withPostFailure: (error) => {
      if (error.problem === NETWORK_ERROR) {
        errorAlertShow();
      }
    }
  });

  const removeAll = (countersToRemove: Counter[]) => {
    countersToRemove.forEach((counter) => {
      setTimeout(() => {
        removeCounter(counter.id);
      }, 200);
    });
    removeAlertHide();
  };

  return (
    <>
      {loading && <Loading fullScreen />}
      <Button
        color={ButtonColor.DANGER}
        className="m-right-2"
        onClick={() => removeAlertShow()}
        disabled={disabled}
      >
        <TrashBinIcon fill="var(--destructive-red)" />
      </Button>
      <Alert isVisible={removeAlertVisible}>
        <Alert.Title>{t('deleteCounter', { count: counters.length })}</Alert.Title>
        <Alert.Message>
          <span>{t('cannotUndone')}</span>
          <ul className={styles.counters}>
            {counters.map((counter) => (
              <li key={counter.id}>
                <span className="text">{counter.title}</span>
              </li>
            ))}
          </ul>
        </Alert.Message>
        <Alert.Actions>
          <Button className="m-right-5" kind={ButtonKind.RAISED} onClick={removeAlertHide}>
            {t('Global:cancel')}
          </Button>
          <Button kind={ButtonKind.RAISED} color={ButtonColor.DANGER} onClick={() => removeAll(counters)}>
            {t('Global:delete')}
          </Button>
        </Alert.Actions>
      </Alert>
      <Alert isVisible={errorAlertVisible}>
        <Alert.Title>{t('couldNotRemove', { count: counters.length })}</Alert.Title>
        <Alert.Message>
          <span>{t('Global:noConnection')}</span>
        </Alert.Message>
        <Alert.Actions>
          <Button className="m-right-5" kind={ButtonKind.RAISED} onClick={() => removeAll(counters)}>
            {t('Global:retry')}
          </Button>
          <Button kind={ButtonKind.RAISED} color={ButtonColor.PRIMARY} onClick={errorAlertHide}>
            {t('Global:dismiss')}
          </Button>
        </Alert.Actions>
      </Alert>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(null, mapDispatchToProps);

export default connector(DeleteCounter);
