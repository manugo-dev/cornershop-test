import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import cn from 'classnames';

import Button, { ButtonColor } from 'components/Button';
import { NewIcon, OpenIcon, TrashBinIcon } from 'components/Icons';
import { actionCreators, CountersState, NAME as countersReducerName } from 'redux/ducks/counters';
// import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

interface Props extends ConnectedProps<typeof connector> {
  className?: string;
  disabled?: boolean;
  openCreationModal: () => void;
}

function CounterActions({ className = '', disabled, selected, openCreationModal }: Props) {
  //   const { t } = useTranslation('CounterList');

  return (
    <div className={cn('row middle', styles.actions, className)}>
      {!!selected && (
        <>
          <Button color={ButtonColor.DANGER} className="m-right-2" disabled={disabled}>
            <TrashBinIcon fill="var(--destructive-red)" />
          </Button>
          <Button color={ButtonColor.WHITE} disabled={disabled}>
            <OpenIcon fill="var(--dark-black)" />
          </Button>
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
