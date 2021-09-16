import { useForm } from 'react-hook-form';
import cn from 'classnames';

import Button from 'components/Button';
import Input from 'components/Input';
import useModal from 'hooks/useModal';
import { useTranslation } from 'react-i18next';
import CreateCounterModal from './components/CreateModal';

import ExamplesModal from './components/ExamplesModal';
import styles from './styles.module.scss';

interface FormValues {
  title: string;
}

interface Props {
  onSubmit: ({ title }: FormValues) => void;
}

function CreateCounter({ onSubmit }: Props) {
  const { t } = useTranslation('CreateCounter');
  const { handleSubmit } = useForm();
  const {
    isVisible: isExamplesModalVisible,
    hideModal: hideExamplesModal,
    showModal: showExamplesModal
  } = useModal();

  return (
    <form className={cn(styles.content)} onSubmit={handleSubmit(onSubmit)}>
      <Input label={t('name')} placeholder="Cups of coffee" className="text bold" />
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
export default CreateCounter;
