import cn from 'classnames';

import styles from './styles.module.scss';

interface Props {
  className?: string;
}

function Loading({ className = '' }: Props) {
  return (
    <div className={cn(styles.spinner, className)}>
      <div className={styles.bouncer} />
      <div className={styles.bouncer} />
      <div className={styles.bouncer} />
    </div>
  );
}

export default Loading;
