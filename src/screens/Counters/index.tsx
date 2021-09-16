import { useState } from 'react';
import cn from 'classnames';

import useModal from 'hooks/useModal';
import CreateCounter from 'screens/CreateCounter';

import Search from './components/Search';
import CounterList from './components/CounterList';
import styles from './styles.module.scss';
import CounterActions from './components/CounterActions';

function Counters() {
  const { isVisible: isModalVisible, hideModal, showModal } = useModal();
  const [search, setSearch] = useState<string | undefined>();
  const [searchActive, setSearchActive] = useState(false);

  const onSearchChange = (value?: string) => {
    setSearch(value);
    if (searchActive) {
      setSearchActive(false);
    }
  };

  const onSearchFocus = () => {
    if (!search || search.length === 0) setSearchActive(true);
  };

  const onSearchBlur = () => {
    setSearchActive(false);
  };

  return (
    <>
      <header className={styles.header}>
        <Search
          className={styles.search}
          onChange={onSearchChange}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
        />
      </header>
      <section className={cn('column', styles.content, { [styles.overflow]: searchActive })}>
        <CounterList search={search} />
        <CreateCounter.Modal isModalVisible={isModalVisible} hideModal={hideModal} />
      </section>
      <footer className={cn(styles.footer, { [styles.overflow]: searchActive })}>
        <CounterActions className={styles.actions} disabled={searchActive} openCreationModal={showModal} />
      </footer>
    </>
  );
}

export default Counters;
