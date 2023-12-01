import css from './Modal.module.css'
import { useEffect } from 'react';
const Modal = ({ largeImageURL, onClose, tags }) => {
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

    return (
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }

  
  export default Modal;