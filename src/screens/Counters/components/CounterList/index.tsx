import { useState } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { NETWORK_ERROR } from 'apisauce';
import cn from 'classnames';

import Button, { ButtonColor } from 'components/Button';
import Loading from 'components/Loading';
import { getCounters } from 'services/CounterService';

import styles from './styles.module.scss';

interface Props {
  search?: string;
}

function CounterList({ search }: Props) {
  const { t } = useTranslation('CounterList');
  const [updateCount, setUpdateCount] = useState(0);
  const { data, isLoading, refetch } = useQuery(['counters', search], () => getCounters(search), {
    onSuccess: () => setUpdateCount((state) => state + 1)
  });
  const isNetworkError = data?.problem && data.problem === NETWORK_ERROR;
  const isNotEmpty = data?.data && data.data.length > 0;

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
          <Button color={ButtonColor.WHITE} onClick={() => refetch()} disabled={isLoading}>
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
      {!isLoading && isNotEmpty && data?.data?.map((counter) => <div key={counter.id}>{counter.title}</div>)}
    </div>
  );
}

export default CounterList;
