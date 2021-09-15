import styles from './styles.module.scss';

function Loading() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerBouncer} />
      <div className={styles.spinnerBouncer} />
      <div className={styles.spinnerBouncer} />
    </div>
  );
}

export default Loading;
