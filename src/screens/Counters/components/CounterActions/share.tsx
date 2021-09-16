import Button, { ButtonColor } from 'components/Button';
import { OpenIcon } from 'components/Icons';
import { Counter } from 'types/Counter';

interface Props {
  counters: Counter[];
  disabled?: boolean;
}

function ShareCounter({ disabled, counters }: Props) {
  console.log(counters);
  return (
    <>
      <Button color={ButtonColor.WHITE} disabled={disabled}>
        <OpenIcon fill="var(--dark-black)" />
      </Button>
    </>
  );
}

export default ShareCounter;
