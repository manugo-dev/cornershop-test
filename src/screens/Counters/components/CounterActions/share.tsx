import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import Button, { ButtonColor, ButtonKind } from 'components/Button';
import { OpenIcon } from 'components/Icons';
import useOutsideClick from 'hooks/useOutsideClick';
import { Counter } from 'types/Counter';

import styles from './styles.module.scss';

interface Props {
  counters: Counter[];
  disabled?: boolean;
}

interface PopupProps {
  counters: Counter[];
  popupRef: React.RefObject<HTMLDivElement>;
}

function SharePopup({ popupRef, counters }: PopupProps) {
  const { t } = useTranslation('CounterActions');
  const [buttonText, setButtonText] = useState(t('copy'));

  const copyToClipboard = () => {
    setButtonText(t('copied'));
    navigator.clipboard.writeText(
      counters.map((counter) => `${counter.count} x ${counter.title}`).join('\n')
    );
    setTimeout(() => setButtonText(t('copy')), 500);
  };

  return (
    <div ref={popupRef} className={cn('row', styles.popup)}>
      <div className="column m-right-2">
        <h3 className="m-top-1 m-bottom-2">{t('share', { count: counters.length })}</h3>
        <Button
          kind={ButtonKind.FLAT}
          color={ButtonColor.WHITE}
          className={styles.copy}
          onClick={() => copyToClipboard()}
        >
          {buttonText}
        </Button>
      </div>
      <div className={cn('m-left-auto', styles.paper)}>
        {counters.map((counter) => (
          <div key={counter.id}>
            {counter.count} x {counter.title}
          </div>
        ))}
      </div>
    </div>
  );
}

function ShareCounter({ disabled, counters }: Props) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  useOutsideClick(popupRef, () => setOpen(false));

  return (
    <div className={styles.share}>
      <Button color={ButtonColor.WHITE} disabled={disabled} onClick={() => setOpen((state) => !state)}>
        <OpenIcon fill="var(--dark-black)" />
      </Button>
      {open && <SharePopup popupRef={popupRef} counters={counters} />}
    </div>
  );
}

export default ShareCounter;
