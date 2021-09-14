import cn from 'classnames';

import { ReactComponent as Logo } from 'assets/logo.svg';

import styles from './styles.module.scss';

function Welcome() {
  return (
    <div className="column middle center m-top-15">
      <Logo className="m-bottom-5" />
      <h1 className="title">Welcome to Counters</h1>
      <p className="text">Capture cups of lattes, frapuccinos, or anything else that can be counted.</p>
    </div>
  );
}

export default Welcome;
