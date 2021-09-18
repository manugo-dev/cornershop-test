export interface ModalProps {
  modalRef?: React.RefObject<HTMLDivElement>;
  isModalVisible: boolean;
  hideModal: () => void;
}
