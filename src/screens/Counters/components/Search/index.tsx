import cn from 'classnames';
import { SearchIcon } from 'components/Icons';

import Input from 'components/Input';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

interface Props {
  className?: string;
}

function Search({ className = '' }: Props) {
  const { t } = useTranslation('Counters');

  return (
    <div className={cn('row m-auto', styles.bar)}>
      <Input
        label="search"
        icon={<SearchIcon className="column middle" fill="var(--grey)" />}
        placeholder={t('searchCounters')}
        className={cn(styles.input, className)}
        clearable
      />
    </div>
  );
}

export default Search;
