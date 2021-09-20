import cn from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce/lib';

import Button from 'components/Button';
import { SearchIcon } from 'components/Icons';
import Input from 'components/Input';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (value?: string) => void;
}

function Search({ className = '', onFocus, onChange, onBlur }: Props) {
  const { t } = useTranslation('Counters');
  const [value, setValue] = useState<string | undefined>();
  const debouncedChange = useDebouncedCallback((search?: string) => {
    onChange?.(search);
  }, 300);

  const clearSearch = () => {
    setValue(undefined);
    onChange?.(undefined);
  };

  return (
    <div className={cn('row middle m-auto', styles.bar, className)}>
      <Input
        value={value || ''}
        onChange={({ currentTarget }) => {
          setValue(currentTarget.value);
          debouncedChange(currentTarget.value);
        }}
        icon={<SearchIcon className="column middle" fill="var(--grey)" />}
        placeholder={t('searchCounters')}
        className={cn({ 'm-right-2': value }, styles.input, className)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {value && (
        <Button className="button white" onClick={clearSearch}>
          {t('cancel')}
        </Button>
      )}
    </div>
  );
}

export default Search;
