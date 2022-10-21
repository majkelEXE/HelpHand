import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import applyDataState from '../../atoms/applyData';
import showModalState from '../../atoms/showModal';
import tokenState from '../../atoms/token';
import css from './Apply.module.css';

const Apply = () => {
  const [content, setContent] = useState("");
  const [applyData, setApplyData] = useRecoilState(applyDataState);
  const setShowModal = useSetRecoilState(showModalState);
  const token = useRecoilValue(tokenState);

  const sendHandler = async () => {
    await axios.post("/api/report_volunteer", applyData, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    setShowModal(false);
  };

  const textAreaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setApplyData((prevState) => {
      return { ...prevState!, email_content: e.target.value };
    });
  };

  return (
    <div className={css.applyContainer}>
      <h1>Napisz tu swoją wiadomość!</h1>
      <textarea value={content} onChange={(e) => textAreaHandler(e)} />
      <div className="bigPrimaryButton" onClick={sendHandler}>
        Wyślij!
      </div>
    </div>
  );
};

export default Apply;
