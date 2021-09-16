import { connect, ConnectedProps } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NETWORK_ERROR } from 'apisauce';
import cn from 'classnames';

import Button, { ButtonColor } from 'components/Button';
import Loading from 'components/Loading';
import { actionCreators, CountersState, NAME as countersReducerName } from 'redux/ducks/counters';

import { Counter } from 'types/Counter';
import { bindActionCreators, Dispatch } from 'redux';
import RefreshIcon from 'components/Icons/RefreshIcon';
import styles from './styles.module.scss';

interface Props extends ConnectedProps<typeof connector> {
  search?: string;
}

function CounterList({ search, list, countersActions }: Props) {
  const { t } = useTranslation('CounterList');
  const { isLoading, data: counters, problem, updateCount } = list;

  const isNetworkError = problem && problem === NETWORK_ERROR;
  const isNotEmpty = counters && counters.length > 0;
  const noSearchResults = !isNetworkError && !isLoading && !isNotEmpty && search;
  const noCountersCreated = !isLoading && !isNotEmpty && !search;

  // TODO: Get it from API
  const quote = {
    message: 'When I started counting my blessings, my whole life turned around.',
    author: 'Willie Nelson'
  };

  return (
    <div className={cn('column middle center', styles.wrapper, { top: isNotEmpty })}>
      {isNotEmpty && updateCount && (
        <>
          <span className="text bold">{t('itemCount', counters.length.toString())}</span>{' '}
          <span className="text">{t('refreshCount', updateCount.toString())}</span>
          <RefreshIcon />
        </>
      )}
      {isLoading && <Loading className="m-auto" />}
      {isNetworkError && (
        <>
          <h1 className="title center m-bottom-1">{t('couldNotLoad')}</h1>
          <p className="text center m-bottom-5">{t('noConnection')}</p>
          <Button
            color={ButtonColor.WHITE}
            onClick={() => countersActions.getCounters(search)}
            disabled={isLoading}
          >
            {t('Global:retry')}
          </Button>
        </>
      )}
      {noSearchResults && <p>{t('noResults')}</p>}
      {noCountersCreated && (
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

const mapStateToProps = (state: { [countersReducerName]: CountersState }): CountersState =>
  state[countersReducerName];

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CounterList);
