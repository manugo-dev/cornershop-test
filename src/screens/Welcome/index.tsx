import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ReactComponent as Logo } from 'assets/logo.svg';

import paths from 'components/App/paths';
import styles from './styles.module.scss';

function Welcome() {
  const { t } = useTranslation('Welcome');

  return (
    <div className={cn('column middle center m-top-15', styles.page)}>
      <Logo className="m-bottom-5" />
      <h1 className="title">{t('title')}</h1>
      <p className="text center m-bottom-15">{t('description')}</p>
      <Link className="button" to={paths.counters}>
        {t('getStarted')}
      </Link>
    </div>
  );
}

export default Welcome;
