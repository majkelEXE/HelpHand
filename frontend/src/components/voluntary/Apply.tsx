import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import applyDataState from '../../atoms/applyData';
import showModalState from '../../atoms/showModal';
import css from './Apply.module.css';

const Apply = () => {
  const [content, setContent] = useState("");
  const [applyData, setApplyData] = useRecoilState(applyDataState);
  const setShowModal = useSetRecoilState(showModalState);

  const sendHandler = () => {
    setApplyData((prevState) => {
      return { ...prevState!, email_content: content };
    });

    setShowModal(false);
  };

  return (
    <div className={css.applyContainer}>
      <h1>Napisz tu swoją wiadomość!</h1>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="bigPrimaryButton" onClick={sendHandler}>
        Wyślij!
      </div>
    </div>
  );
};

export default Apply;
