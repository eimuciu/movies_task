import css from './Modal.module.css';
import { CloseIcon } from '@chakra-ui/icons';

function Modal({ children, showModal, closeModal }) {
  const modalStyles = showModal ? 'flex' : 'none';
  return (
    <div style={{ display: modalStyles }} className={css.main}>
      <div role="button" className={css.icon} onClick={closeModal}>
        <CloseIcon />
      </div>
      <div className={css.content}>{children}</div>
    </div>
  );
}

export default Modal;
