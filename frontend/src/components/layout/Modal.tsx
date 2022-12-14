import { FC, PropsWithChildren } from 'react';
import { useSetRecoilState } from 'recoil';

import showModalState from '../../atoms/showModal';
import css from './Modal.module.css';

const Modal: FC<PropsWithChildren> = ({ children }) => {
  const setShowModal = useSetRecoilState(showModalState);

  return (
    <div className={css.background}>
      <div className={css.scrollContainer}>
        {children}
        <div
          className={`bigSecondaryButton ${css.cancel}`}
          onClick={() => setShowModal(false)}
        >
          Zamknij
        </div>
      </div>
    </div>
  );
};

export default Modal;
