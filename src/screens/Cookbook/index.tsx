import { useEffect } from 'react';
import { ReactComponent as Logo } from 'assets/logo.svg';
import Alert from 'components/Alert';
import Button, { ButtonColor, ButtonKind, ButtonSize } from 'components/Button';
import Input from 'components/Input';
import Loading from 'components/Loading';
import Modal from 'components/Modal';
import {
  CloseIcon,
  DecrementIcon,
  IncrementIcon,
  NewIcon,
  OpenIcon,
  SearchIcon,
  TrashBinIcon
} from 'components/Icons';
import useAlert from 'hooks/useAlert';
import useModal from 'hooks/useModal';

// You don't have to use `fetch` btw, use whatever you want
const getCounters = () => fetch('/api/v1/counter', { method: 'get' }).then((res) => res.json());

function Cookbook() {
  const { isVisible: isAlertVisible, hideAlert, showAlert } = useAlert();
  const { modalRef, isVisible: isModalVisible, hideModal, showModal } = useModal();

  useEffect(() => {
    // eslint-disable-next-line no-console
    getCounters().then(console.log, console.error);
  }, []);

  return (
    <main style={{ padding: '32px' }}>
      <hgroup>
        <h1>Hello, from Cornershop!</h1>
        <h2>Here you have some components to use</h2>
      </hgroup>
      <p>
        You can build other components –like a searchbar, wink wink– using the components weve provided you.
      </p>
      <p>Of course you can create more Components if you need them. Have fun and good luck!</p>

      <section>
        <h3>Logo</h3>
        <Logo />
      </section>

      <section>
        <h3>Loading</h3>
        <Loading />
      </section>

      <section>
        <h3>Input</h3>
        <Input placeholder="This is a placeholder" />
      </section>

      <section>
        <h3>Icons</h3>
        <p>Close Modal</p>
        <CloseIcon />

        <p>Increment Counter</p>
        <IncrementIcon />

        <p>Decrement Counter</p>
        <DecrementIcon />

        <p>Add New Counter</p>
        <NewIcon />

        <p>Open Widget</p>
        <OpenIcon />

        <p>Search</p>
        <SearchIcon />

        <p>Delete Counter</p>
        <TrashBinIcon />
      </section>

      <section>
        <h3>Buttons</h3>
        <p>Color variants</p>
        <Button>Main</Button>
        <Button color={ButtonColor.DANGER}>Danger</Button>
        <Button color={ButtonColor.WHITE}>White</Button>
        <hr />

        <p>Size variants</p>
        <Button>Regular</Button>
        <Button size={ButtonSize.BIG}>Big</Button>
        <hr />

        <p>Kind variants</p>
        <Button kind={ButtonKind.FLAT}>Flat</Button>
        <Button>Regular</Button>
        <Button kind={ButtonKind.RAISED}>Raised</Button>

        <p>With icons</p>
        <div style={{ display: 'flex' }}>
          <Button>
            <NewIcon fill="var(--white)" />
          </Button>
          <Button color={ButtonColor.WHITE}>
            <OpenIcon fill="var(--dark-black)" />
          </Button>
        </div>
      </section>

      <section>
        <h3>Alert</h3>
        <p>Show alert</p>
        <Button onClick={showAlert}>Show!</Button>

        <Alert
          isVisible={isAlertVisible}
          // eslint-disable-next-line no-console
          onClose={() => console.log('Alert was closed')}
          // eslint-disable-next-line no-console
          onOpen={() => console.log('Alert was opened')}
        >
          <Alert.Title>Alert title</Alert.Title>
          <Alert.Message>Alert message</Alert.Message>
          <Alert.Actions>
            <Button className="m-right-5" kind={ButtonKind.RAISED} onClick={hideAlert}>
              Action
            </Button>
            <Button kind={ButtonKind.RAISED} color={ButtonColor.DANGER} onClick={hideAlert}>
              Error
            </Button>
          </Alert.Actions>
        </Alert>
      </section>

      <section>
        <h3>Modal</h3>
        <p>Show modal</p>
        <Button onClick={showModal}>Show!</Button>

        <Modal
          modalRef={modalRef}
          isVisible={isModalVisible}
          // eslint-disable-next-line no-console
          onClose={() => console.log('Modal was closed')}
          // eslint-disable-next-line no-console
          onOpen={() => console.log('Modal was opened')}
        >
          <Modal.Header>
            <Modal.Title>Im a helpless modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button onClick={hideModal}>Hide Modal</Button>
            <Button onClick={showAlert}>Show Alert</Button>
          </Modal.Body>
        </Modal>
      </section>
    </main>
  );
}

export default Cookbook;
