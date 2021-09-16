import { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import useModal from 'hooks/useModal';
import Button, { ButtonColor } from 'components/Button';
import { NewIcon, OpenIcon, TrashBinIcon } from 'components/Icons';
import CreateCounter from 'screens/CreateCounter';
import { actionCreators } from 'redux/ducks/counters';

import Search from './components/Search';
import CounterList from './components/CounterList';
import styles from './styles.module.scss';

interface Props extends ConnectedProps<typeof connector> {}

function Counters({ countersActions }: Props) {
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

  useEffect(() => {
    countersActions.getCounters(search);
  }, [search]);

  return (
    <>
      <header className={styles.header}>
        <Search onChange={onSearchChange} onFocus={onSearchFocus} onBlur={onSearchBlur} />
      </header>
      <section className={cn('column middle center', styles.content, { [styles.overflow]: searchActive })}>
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});
const connector = connect(null, mapDispatchToProps);

export default connector(Counters);
