import { useState } from 'react';
import cn from 'classnames';

import Button, { ButtonColor } from 'components/Button';
import { NewIcon, OpenIcon, TrashBinIcon } from 'components/Icons';
import useModal from 'hooks/useModal';
import CreateCounter from 'screens/CreateCounter';

import Search from './components/Search';
import CounterList from './components/CounterList';
import styles from './styles.module.scss';

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
        <div className={cn('row middle', styles.actions)}>
          <Button color={ButtonColor.DANGER} className="m-right-2" disabled={searchActive}>
            <TrashBinIcon fill="var(--destructive-red)" />
          </Button>
          <Button color={ButtonColor.WHITE} disabled={searchActive}>
            <OpenIcon fill="var(--dark-black)" />
          </Button>
          <Button className="m-left-auto" disabled={searchActive} onClick={() => showModal()}>
            <NewIcon fill="var(--white)" />
          </Button>
        </div>
      </footer>
    </>
  );
}

export default Counters;
