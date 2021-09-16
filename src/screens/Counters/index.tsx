import { useState } from 'react';
import cn from 'classnames';

import Modal from 'components/Modal';
import useModal from 'hooks/useModal';
import Button from 'components/Button';
import { NewIcon } from 'components/Icons';
import Search from './components/Search';

import styles from './styles.module.scss';
import CounterList from './components/CounterList';

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
        <Search onChange={onSearchChange} onFocus={onSearchFocus} onBlur={onSearchBlur} />
      </header>
      <section className={cn('column middle center', styles.content, { [styles.overflow]: searchActive })}>
        <CounterList search={search} />
        <Modal isVisible={isModalVisible}>
          <Modal.Header>
            <Modal.Title>Im a helpless modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button onClick={hideModal}>Hide Modal</Button>
          </Modal.Body>
        </Modal>
      </section>
      <footer className={cn(styles.footer, { [styles.overflow]: searchActive })}>
        <Button disabled={searchActive} onClick={() => showModal()}>
          <NewIcon />
        </Button>
      </footer>
    </>
  );
}

export default Counters;
