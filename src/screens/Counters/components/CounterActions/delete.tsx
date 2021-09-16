import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

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
  const { isVisible: isAlertVisible, hideAlert, showAlert } = useAlert();

  const [, loading, , removeCounter] = useLazyRequest({
    request: deleteCounter,
    withPostSuccess: (counter) => {
      countersActions.deleteCounter(counter);
    }
  });

  const removeAll = (countersToRemove: Counter[]) => {
    countersToRemove.forEach((counter) => {
      setTimeout(() => {
        removeCounter(counter.id);
      }, 200);
    });
    hideAlert();
  };

  return (
    <>
      {loading && <Loading fullScreen />}
      <Button
        color={ButtonColor.DANGER}
        className="m-right-2"
        onClick={() => showAlert()}
        disabled={disabled}
      >
        <TrashBinIcon fill="var(--destructive-red)" />
      </Button>
      <Alert isVisible={isAlertVisible}>
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
          <Button className="m-right-5" kind={ButtonKind.RAISED} onClick={hideAlert}>
            {t('Global:cancel')}
          </Button>
          <Button kind={ButtonKind.RAISED} color={ButtonColor.DANGER} onClick={() => removeAll(counters)}>
            {t('Global:delete')}
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
