import { connect, ConnectedProps } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NETWORK_ERROR } from 'apisauce';
import cn from 'classnames';

import Button, { ButtonColor } from 'components/Button';
import Loading from 'components/Loading';
import { actionCreators, CountersState } from 'redux/ducks/counters';

import { Counter } from 'types/Counter';
import { bindActionCreators, Dispatch } from 'redux';
import styles from './styles.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props extends ConnectedProps<typeof connector> {
  search?: string;
}

function CounterList({ search, isLoading, list: counters, problem, updateCount, countersActions }: Props) {
  const { t } = useTranslation('CounterList');

  console.log(isLoading, counters, problem, updateCount);

  const isNetworkError = problem && problem === NETWORK_ERROR;
  const isNotEmpty = counters && counters.length > 0;

  // TODO: Get it from API
  const quote = {
    message: 'When I started counting my blessings, my whole life turned around.',
    author: 'Willie Nelson'
  };

  return (
    <div className={cn('column middle center', styles.wrapper, { top: isNotEmpty })}>
      {isNotEmpty && updateCount && <div>update count {updateCount}</div>}
      {isLoading && <Loading className="m-auto" />}
      {isNetworkError && (
        <>
          <h1 className="title center">{t('couldNotLoad')}</h1>
          <p className="text center m-bottom-2">{t('noConnection')}</p>
          <Button
            color={ButtonColor.WHITE}
            onClick={() => countersActions.getCounters(search)}
            disabled={isLoading}
          >
            {t('Global:retry')}
          </Button>
        </>
      )}
      {!isNetworkError && !isLoading && !isNotEmpty && search && <p>{t('noResults')}</p>}
      {!isLoading && !isNotEmpty && !search && (
        <>
          <h1 className="title center">{t('noCounters')}</h1>
          <p className="text center m-bottom-2">“{quote.message}”</p>
          <span> — {quote.author}</span>
        </>
      )}
      {!isLoading &&
        isNotEmpty &&
        counters?.map((counter: Counter) => <div key={counter.id}>{counter.title}</div>)}
    </div>
  );
}

const mapStateToProps = (state: any): CountersState => ({
  ...state.counters.counters
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CounterList);
