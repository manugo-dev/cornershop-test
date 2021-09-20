import cn from 'classnames';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Button from 'components/Button';
import { NewIcon } from 'components/Icons';
import { actionCreators, CountersState, NAME as countersReducerName } from 'redux/ducks/counters';

import DeleteCounter from './delete';
import ShareCounter from './share';
import styles from './styles.module.scss';

interface Props extends ConnectedProps<typeof connector> {
  className?: string;
  disabled?: boolean;
  openCreationModal: () => void;
}

function CounterActions({ className = '', disabled, counters, selected, openCreationModal }: Props) {
  const selectedCounters = counters.filter((counter) => counter.selected);

  return (
    <div className={cn('row middle', styles.actions, className)}>
      {!!selected && (
        <>
          <DeleteCounter counters={selectedCounters} disabled={disabled} />
          <ShareCounter counters={selectedCounters} disabled={disabled} />
        </>
      )}
      <Button className="m-left-auto" disabled={disabled} onClick={() => openCreationModal()}>
        <NewIcon fill="var(--white)" />
      </Button>
    </div>
  );
}

const mapStateToProps = (state: { [countersReducerName]: CountersState }): CountersState =>
  state[countersReducerName];

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CounterActions);
