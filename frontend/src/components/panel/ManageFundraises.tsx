import axios from 'axios';
import { MouseEvent } from 'react';
import { RiAddCircleFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import editFundraiseState from '../../atoms/editFundraise';
import syncState from '../../atoms/sync';
import tokenState from '../../atoms/token';
import userFundraisesState from '../../atoms/userFundraises';
import FundraiseThumbnail from './FundraiseThumbnail';
import css from './ManageFundraises.module.css';

const ManageFundraises = () => {
  const navigate = useNavigate();
  const [fundraises, setFundraises] = useRecoilState(userFundraisesState);
  const setEditFundraise = useSetRecoilState(editFundraiseState);
  const token = useRecoilValue(tokenState);
  const setSync = useSetRecoilState(syncState);

  const deleteHandler = async (e: MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation();
    await axios.delete(`/api/fundraiser/${id}`, {
      headers: { Authorization: `token ${token}` },
    });
    setSync(true);
  };

  const editHandler = async (e: MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation();
    setEditFundraise(fundraises.filter((f) => f.id == id)[0]);
    navigate("/addfundraise");
  };

  return (
    <div className={css.manageContainer}>
      {fundraises.length > 0 ? (
        fundraises.map((f) => (
          <FundraiseThumbnail
            key={f.id}
            fundraise={f}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
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
