import { useState } from 'react';
import { useQuery } from 'react-query';
import { NETWORK_ERROR } from 'apisauce';
import cn from 'classnames';

import Loading from 'components/Loading';
import { getCounters } from 'services/CounterService';

import styles from './styles.module.scss';

interface Props {
  search?: string;
}

function CounterList({ search }: Props) {
  const [updateCount, setUpdateCount] = useState(0);
  const { data, isLoading } = useQuery(['counters', search], () => getCounters(search), {
    onSuccess: () => setUpdateCount((state) => state + 1)
  });
  const isNetworkError = data?.problem && data.problem === NETWORK_ERROR;
  const isNotEmpty = data?.data && data.data.length > 0;

  return (
    <div className={cn('column middle center', styles.wrapper, { top: isNotEmpty })}>
      {isNotEmpty && updateCount && <div>update count {updateCount}</div>}
      {isLoading && <Loading className="m-auto" />}
      {isNetworkError && <div>Error de network</div>}
      {!isLoading && !isNotEmpty && search && <div>Sin resultados pa la busqueda</div>}
      {!isLoading && !isNotEmpty && !search && (
        <>
          <h1 className="title center">No counters yet</h1>
          <p className="text center m-bottom-2">
            “When I started counting my blessings, my whole life turned around.”
          </p>
          <span> —Willie Nelson</span>
        </>
      )}
      {!isLoading && isNotEmpty && data?.data?.map((counter) => <div key={counter.id}>{counter.title}</div>)}
    </div>
  );
}

export default CounterList;
