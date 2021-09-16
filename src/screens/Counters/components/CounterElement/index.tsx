import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import Button, { ButtonKind } from 'components/Button';
import Loading from 'components/Loading';
import { DecrementIcon, IncrementIcon } from 'components/Icons';
import { useLazyRequest } from 'hooks/useRequest';
import { actionCreators } from 'redux/ducks/counters';
import { decrementCounter, incrementCounter } from 'services/CounterService';
import { Counter } from 'types/Counter';

import styles from './styles.module.scss';

interface Props extends Counter, ConnectedProps<typeof connector> {}

function CounterElement({ id, title, count, countersActions }: Props) {
  const [, loadingIncrement, , doIncrementCounter] = useLazyRequest({
    request: incrementCounter,
    withPostSuccess: (counter) => {
      countersActions.updateCounter(counter);
    }
  });

  const [, loadingDecrement, , doDecrementCounter] = useLazyRequest({
    request: decrementCounter,
    withPostSuccess: (counter) => {
      countersActions.updateCounter(counter);
    }
  });

  const isLoading = loadingIncrement || loadingDecrement;

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
          onClick={() => doDecrementCounter(id)}
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
          onClick={() => doIncrementCounter(id)}
          disabled={isLoading}
        >
          <IncrementIcon fill={isLoading ? 'var(--grey)' : 'var(--app-tint)'} />
        </Button>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(null, mapDispatchToProps);

export default connector(CounterElement);
