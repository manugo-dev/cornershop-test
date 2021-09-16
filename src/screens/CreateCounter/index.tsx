import cn from 'classnames';

import Button from 'components/Button';
import Input from 'components/Input';
import useModal from 'hooks/useModal';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { actionCreators } from 'redux/ducks/counters';
import CreateCounterModal from './components/CreateModal';

import ExamplesModal from './components/ExamplesModal';
import styles from './styles.module.scss';

interface Props extends ConnectedProps<typeof connector> {
  onSubmit: () => void;
}

const DEFAULT_PLACEHOLDER = 'Cups of coffee';

function CreateCounter({ onSubmit, countersActions }: Props) {
  const { t } = useTranslation('CreateCounter');
  const {
    isVisible: isExamplesModalVisible,
    hideModal: hideExamplesModal,
    showModal: showExamplesModal
  } = useModal();

  return (
    <form className={cn(styles.content)} onSubmit={onSubmit}>
      <Input
        label={t('name')}
        placeholder={DEFAULT_PLACEHOLDER}
        className="text bold"
        onChange={({ currentTarget }) => countersActions.setCreationTitle(currentTarget.value)}
      />
      <p>
        {t('exampleHelp')}
        <Button className="link" onClick={() => showExamplesModal()}>
          {t('exampleLink')}
        </Button>
      </p>
      <ExamplesModal isModalVisible={isExamplesModalVisible} hideModal={hideExamplesModal} />
    </form>
  );
}

CreateCounter.Modal = CreateCounterModal;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});
const connector = connect(null, mapDispatchToProps);

export default connector(CreateCounter);
