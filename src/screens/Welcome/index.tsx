import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import paths from 'components/App/paths';
import { ReactComponent as Logo } from 'assets/logo.svg';

import styles from './styles.module.scss';

function Welcome() {
  const { t } = useTranslation('Welcome');

  return (
    <div className={cn('column middle center', styles.page)}>
      <Logo className="m-bottom-20" />
      <h1 className="title m-top-0 m-bottom-4">{t('title')}</h1>
      <p className="text center m-top-0 m-bottom-20">{t('description')}</p>
      <Link className="button" to={paths.counters}>
        {t('getStarted')}
      </Link>
    </div>
  );
}

export default Welcome;
