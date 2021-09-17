import { useState } from 'react';
import { NETWORK_ERROR } from 'apisauce';
import { useTranslation } from 'react-i18next';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import Alert from 'components/Alert';
import Button, { ButtonColor, ButtonKind } from 'components/Button';
import Loading from 'components/Loading';
import { DecrementIcon, IncrementIcon } from 'components/Icons';
import useAlert from 'hooks/useAlert';
import { ErrorType, useLazyRequest } from 'hooks/useRequest';
import { actionCreators } from 'redux/ducks/counters';
import { decrementCounter, incrementCounter } from 'services/CounterService';
import { Counter } from 'types/Counter';

import styles from './styles.module.scss';

interface Props extends Counter, ConnectedProps<typeof connector> {}

enum UpdateAction {
  INCREMENT,
  DECREMENT
}

function CounterElement({ id, title, count, countersActions }: Props) {
  const { t } = useTranslation('CounterList');
  const { isVisible: isAlertVisible, hideAlert, showAlert } = useAlert();
  const [action, setAction] = useState<UpdateAction>();

  const showUpdateError = (error: ErrorType<Counter>) => {
    if (error.problem === NETWORK_ERROR) {
      showAlert();
    }
  };

  const [, loadingIncrement, , doIncrementCounter] = useLazyRequest({
    request: incrementCounter,
    withPostSuccess: (counter) => {
      countersActions.updateCounter(counter);
      if (isAlertVisible) {
        hideAlert();
      }
    },
    withPostFailure: (error) => showUpdateError(error)
  });

  const [, loadingDecrement, , doDecrementCounter] = useLazyRequest({
    request: decrementCounter,
    withPostSuccess: (counter) => {
      countersActions.updateCounter(counter);
      if (isAlertVisible) {
        hideAlert();
      }
    },
    withPostFailure: (error) => showUpdateError(error)
  });

  const isLoading = loadingIncrement || loadingDecrement;
  const tryValue = action === UpdateAction.INCREMENT ? count + 1 : count - 1;
  const handleRetry = () => {
    if (action === UpdateAction.INCREMENT) {
      doIncrementCounter(id);
    } else {
      doDecrementCounter(id);
    }
  };

  return (
    <>
      <Button
        kind={ButtonKind.CLEAN}
        className={cn('m-right-5', styles.title)}
        onClick={() => countersActions.selectCounter(id)}
      >
        {title}
      </Button>
      <div className={cn('row middle m-left-auto', styles.actions)}>
        <Button
          kind={ButtonKind.CLEAN}
          className={cn('m-right-2', styles.button)}
          onClick={() => {
            setAction(UpdateAction.DECREMENT);
            doDecrementCounter(id);
          }}
          disabled={count <= 0 || isLoading}
        >
          <DecrementIcon fill={count <= 0 || isLoading ? 'var(--grey)' : 'var(--app-tint)'} />
        </Button>
        <span className={cn('text m-right-2', { grey: count <= 0 }, styles.counter)}>
          {isLoading ? <Loading className={cn('m-auto', styles.loading)} /> : count}
        </span>
        <Button
          kind={ButtonKind.CLEAN}
          className={cn('m-right-2', styles.button)}
          onClick={() => {
            setAction(UpdateAction.INCREMENT);
            doIncrementCounter(id);
          }}
          disabled={isLoading}
        >
          <IncrementIcon fill={isLoading ? 'var(--grey)' : 'var(--app-tint)'} />
        </Button>
      </div>

      <Alert isVisible={isAlertVisible}>
        <Alert.Title>{t('couldNotUpdate', { title, tryValue })}</Alert.Title>
        <Alert.Message>{t('Global:noConnection')}</Alert.Message>
        <Alert.Actions>
          <Button className="m-right-5" kind={ButtonKind.RAISED} onClick={handleRetry}>
            {t('Global:retry')}
          </Button>
          <Button kind={ButtonKind.RAISED} color={ButtonColor.PRIMARY} onClick={hideAlert}>
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

export default connector(CounterElement);
