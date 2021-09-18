import cn from 'classnames';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  fullScreen?: boolean;
  responsive?: boolean;
}

function Loading({ className = '', fullScreen = false, responsive = false }: Props) {
  return (
    <div
      className={cn(
        styles.spinner,
        { [styles.fullscreen]: fullScreen, [styles.responsive]: responsive },
        className
      )}
    >
      <div className={styles.bouncer} />
      <div className={styles.bouncer} />
      <div className={styles.bouncer} />
    </div>
  );
}

export default Loading;
