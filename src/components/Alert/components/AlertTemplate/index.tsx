import { ReactNode } from 'react';

import Alert from 'components/Alert';
import Button, { ButtonColor, ButtonKind } from 'components/Button';

interface Props {
  children: ReactNode;
  closeToast: () => void;
}

function AlertTemplate({ children, closeToast }: Props) {
  return (
    <Alert
      isVisible
      onClose={() => console.log('Alert was closed')}
      onOpen={() => console.log('Alert was opened')}
    >
      <Alert.Title>Alert title</Alert.Title>
      <Alert.Message>{children}</Alert.Message>
      <Alert.Actions>
        <Button className="m-right-5" kind={ButtonKind.RAISED} onClick={closeToast}>
          Action
        </Button>
        <Button kind={ButtonKind.RAISED} color={ButtonColor.DANGER} onClick={closeToast}>
          Error
        </Button>
      </Alert.Actions>
    </Alert>
  );
}

export default AlertTemplate;
