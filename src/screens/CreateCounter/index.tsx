import cn from 'classnames';

import Button from 'components/Button';
import Input from 'components/Input';
import useModal from 'hooks/useModal';
import { FormEvent } from 'react';
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
  // const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation('CreateCounter');
  const {
    modalRef: examplesModalRef,
    isVisible: isExamplesModalVisible,
    hideModal: hideExamplesModal,
    showModal: showExamplesModal
  } = useModal();

  const handleSubmit = (formEvent: FormEvent) => {
    formEvent.preventDefault();
    onSubmit();
  };

  return (
    <form className={cn(styles.content)} onSubmit={handleSubmit}>
      <Input
        autoFocus
        label={t('name')}
        placeholder={DEFAULT_PLACEHOLDER}
        className="text bold"
        onChange={({ currentTarget }) => countersActions.setCreationTitle(currentTarget.value)}
      />
      <p>
        {t('exampleHelp')}
        <Button className="clean link m-left-1" onClick={() => showExamplesModal()}>
          {t('exampleLink')}
        </Button>
      </p>
      <ExamplesModal
        modalRef={examplesModalRef}
        isModalVisible={isExamplesModalVisible}
        hideModal={hideExamplesModal}
      />
    </form>
  );
}

CreateCounter.Modal = CreateCounterModal;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  countersActions: bindActionCreators(actionCreators, dispatch)
});
const connector = connect(null, mapDispatchToProps);

export default connector(CreateCounter);
