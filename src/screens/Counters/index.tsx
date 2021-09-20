import cn from 'classnames';
import { useState } from 'react';

import Search from 'components/Search';
import useModal from 'hooks/useModal';
import CreateCounterModal from 'screens/CreateCounter/components/CreateModal';
import ExamplesModal from 'screens/CreateCounter/components/ExamplesModal';

import CounterActions from './components/CounterActions';
import CounterList from './components/CounterList';
import styles from './styles.module.scss';

function Counters() {
  const [search, setSearch] = useState<string | undefined>();
  const [searchActive, setSearchActive] = useState(false);
  const {
    modalRef: createModalRef,
    isVisible: isCreateModalVisible,
    hideModal: hideCreateModal,
    showModal: showCreateModal
  } = useModal();
  const {
    modalRef: examplesModalRef,
    isVisible: isExamplesModalVisible,
    hideModal: hideExamplesModal,
    showModal: showExamplesModal
  } = useModal();

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

  const openExamplesModal = () => {
    showExamplesModal();
    hideCreateModal();
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
        <CreateCounterModal
          modalRef={createModalRef}
          isModalVisible={isCreateModalVisible}
          hideModal={hideCreateModal}
          showExamples={openExamplesModal}
        />
        <ExamplesModal
          modalRef={examplesModalRef}
          isModalVisible={isExamplesModalVisible}
          hideModal={hideExamplesModal}
        />
      </section>
      <footer className={cn(styles.footer, { [styles.overflow]: searchActive })}>
        <CounterActions
          className={styles.actions}
          disabled={searchActive}
          openCreationModal={showCreateModal}
        />
      </footer>
    </>
  );
}

export default Counters;
