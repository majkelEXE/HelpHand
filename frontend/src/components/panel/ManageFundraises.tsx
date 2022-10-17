import axios from 'axios';
import { MouseEvent } from 'react';
import { RiAddCircleFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import syncState from '../../atoms/sync';
import tokenState from '../../atoms/token';
import userFundraisesState from '../../atoms/userFundraises';
import FundraiseThumbnail from './FundraiseThumbnail';
import css from './ManageFundraises.module.css';

const ManageFundraises = () => {
  const navigate = useNavigate();
  const [fundraises, setFundraises] = useRecoilState(userFundraisesState);
  const token = useRecoilValue(tokenState);
  const setSync = useSetRecoilState(syncState);

  const deleteHandler = async (e: MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation();
    await axios.delete(`/api/fundraiser/${id}`, {
      headers: { Authorization: `token ${token}` },
    });
    setSync(true);
  };

  return (
    <div className={css.manageContainer}>
      {fundraises.length > 0 ? (
        fundraises.map((f) => (
          <FundraiseThumbnail
            key={f.id}
            fundraise={f}
            deleteHandler={deleteHandler}
          />
        ))
      ) : (
        <h1>Nie ma tu jeszcze nic! 😥</h1>
      )}
      <RiAddCircleFill
        onClick={() => {
          navigate("/addfundraise");
        }}
      />
    </div>
  );
};

export default ManageFundraises;
