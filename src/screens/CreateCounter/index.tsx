import cn from 'classnames';
import { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Button from 'components/Button';
import Input from 'components/Input';
import { actionCreators } from 'redux/ducks/counters';

import styles from './styles.module.scss';

interface Props extends ConnectedProps<typeof connector> {
  onSubmit: () => void;
  showExamples: () => void;
}

const DEFAULT_PLACEHOLDER = 'Cups of coffee';

function CreateCounter({ onSubmit, showExamples, countersActions }: Props) {
  const { t } = useTranslation('CreateCounter');

  const handleSubmit = (formEvent: FormEvent) => {
    formEvent.preventDefault();
    onSubmit();
  };

  return (
    <form className={cn(styles.content)} onSubmit={handleSubmit}>
      <Input
        required
        id="createCounterInput"
        autoFocus
        label={t('name')}
        placeholder={DEFAULT_PLACEHOLDER}
        className="text bold"
        onChange={({ currentTarget }) => countersActions.setCreationTitle(currentTarget.value)}
      />
      <p>
        {t('exampleHelp')}
        <Button className="clean link m-left-1" onClick={() => showExamples()}>
          {t('exampleLink')}
        </Button>
      </p>
    </form>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});
const connector = connect(null, mapDispatchToProps);

export default connector(CreateCounter);
