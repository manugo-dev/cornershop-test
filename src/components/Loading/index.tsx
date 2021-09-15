import styles from './styles.module.scss';

function Loading() {
  return (
    <div className={styles.spinner}>
      <div className={styles.bouncer} />
      <div className={styles.bouncer} />
      <div className={styles.bouncer} />
    </div>
  );
}

export default Loading;
