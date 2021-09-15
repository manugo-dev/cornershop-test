import ActionsBar from './components/ActionsBar';
import Search from './components/Search';

import styles from './styles.module.scss';

function Counters() {
  return (
    <>
      <div className={styles.header}>
        <Search />
      </div>
      <div className={styles.content}>Contenido</div>
      <div className={styles.footer}>
        <ActionsBar />
      </div>
    </>
  );
}

export default Counters;
