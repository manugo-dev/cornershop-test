import { useEffect } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NETWORK_ERROR } from 'apisauce';
import cn from 'classnames';

import Button, { ButtonColor, ButtonKind } from 'components/Button';
import Loading from 'components/Loading';
import RefreshIcon from 'components/Icons/RefreshIcon';
import { actionCreators, CountersState, NAME as countersReducerName } from 'redux/ducks/counters';
import { getCounters } from 'services/CounterService';
import { useRequest } from 'hooks/useRequest';
import { Counter } from 'types/Counter';

import CounterElement from '../CounterElement';
import styles from './styles.module.scss';

interface Props extends ConnectedProps<typeof connector> {
  search?: string;
}

function CounterList({ search, selected, counters, fetchCount, countersActions }: Props) {
  const { t } = useTranslation('CounterList');

  useEffect(() => {
    countersActions.resetFetchCounter();
  }, [search]);

  const [, loading, error, doGetCounters] = useRequest(
    {
      request: getCounters,
      payload: search,
      withPostFetch: () => {
        countersActions.incrementFetchCounter();
      },
      withPostSuccess: (data) => {
        if (data) {
          countersActions.setCounters(data);
        }
      },
      withPostFailure: () => {
        countersActions.setCounters([]);
      }
    },
    [search]
  );

  const isNetworkError = error?.problem && error.problem === NETWORK_ERROR;
  const isNotEmpty = counters && counters.length > 0;
  const noSearchResults = !error && !loading && !isNotEmpty && search;
  const noCountersCreated = !loading && !error && !isNotEmpty && !search;

  // TODO: Get it from API
  const quote = {
    message: 'When I started counting my blessings, my whole life turned around.',
    author: 'Willie Nelson'
  };

  return (
    <>
      {isNotEmpty && fetchCount > 0 && (
        <div className={cn('row m-bottom-4', styles.counters)}>
          {selected ? (
            <span className="text bold primary m-right-2">{t('itemSelected', { count: selected })}</span>
          ) : (
            <>
              <span className="text bold m-right-1">{t('itemCount', { count: counters.length })}</span>
              <span className="text m-right-1">{t('refreshCount', { count: fetchCount })}</span>
            </>
          )}
          {loading ? (
            <div className="row middle">
              <RefreshIcon fill="var(--app-tint)" className="m-right-1 m-bottom-1" />
              <span className="text primary">{t('refreshing')}</span>
            </div>
          ) : (
            <Button
              aria-label="refresh"
              kind={ButtonKind.CLEAN}
              onClick={() => doGetCounters(search)}
              disabled={loading}
            >
              <RefreshIcon className="m-bottom-1" />
            </Button>
          )}
        </div>
      )}
      {loading && <Loading fullScreen />}
      {!isNotEmpty && error && (
        <div className="m-auto">
          <h1 className="title center m-bottom-1">{t('couldNotLoad')}</h1>
          <p className="text center m-bottom-5">
            {t(isNetworkError ? 'Global:noConnection' : 'Global:serverError')}
          </p>
          <Button
            aria-label="retry"
            kind={ButtonKind.FLAT}
            color={ButtonColor.PRIMARY}
            onClick={() => doGetCounters(search)}
            disabled={loading}
          >
            {t('Global:retry')}
          </Button>
        </div>
      )}
      {noSearchResults && <p className="m-auto text center">{t('noResults')}</p>}
      {noCountersCreated && (
        <div className="m-auto">
          <h1 className="title center">{t('noCounters')}</h1>
          <p className="text center m-bottom-2">“{quote.message}”</p>
          <span className="text center"> — {quote.author}</span>
        </div>
      )}
      {isNotEmpty && (
        <ul className={styles.list}>
          {counters?.map((counter: Counter) => (
            <li
              key={counter.id}
              className={cn('row middle full-width m-bottom-3', styles.element, {
                [styles.selected]: counter.selected
              })}
            >
              <CounterElement {...counter} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

const mapStateToProps = (state: { [countersReducerName]: CountersState }): CountersState =>
  state[countersReducerName];

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CounterList);
