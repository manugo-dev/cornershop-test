import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ReactComponent as Logo } from 'assets/logo.svg';

import paths from 'components/App/paths';
import styles from './styles.module.scss';

function Welcome() {
  return (
    <div className={cn('column middle center m-top-15', styles.page)}>
      <Logo className="m-bottom-5" />
      <h1 className="title">Welcome to Counters</h1>
      <p className="text center m-bottom-15">
        Capture cups of lattes, frapuccinos, or anything else that can be counted.
      </p>
      <Link className="button" to={paths.counters}>
        Get started
      </Link>
    </div>
  );
}

export default Welcome;
