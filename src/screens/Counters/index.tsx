import cn from 'classnames';

import { ReactComponent as Logo } from 'assets/logo.svg';
import Button from 'components/Button';

import styles from './styles.module.scss';

function Counters() {
  return (
    <div className={cn('column middle center m-top-15', styles.page)}>
      <Logo className="m-bottom-5" />
      <h1 className="title">Counters to Counters</h1>
      <p className="text center m-bottom-15">
        Capture cups of lattes, frapuccinos, or anything else that can be counted.
      </p>
      <Button>Get started</Button>
    </div>
  );
}

export default Counters;
