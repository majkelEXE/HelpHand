import axios from 'axios';
import { MouseEvent } from 'react';
import { RiAddCircleFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import syncState from '../../atoms/sync';
import tokenState from '../../atoms/token';
import userVolunteersState from '../../atoms/userVolunteers';
import css from './ManageVolunteers.module.css';
import VolunteerThumbnail from './VolunteerThumbnail';

const ManageVolunteers = () => {
  const navigate = useNavigate();
  const [volunteers, setVolunteers] = useRecoilState(userVolunteersState);
  const token = useRecoilValue(tokenState);
  const setSync = useSetRecoilState(syncState);

  const deleteHandler = async (e: MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation();
    await axios.delete(`/api/volunteer/${id}`, {
      headers: { Authorization: `token ${token}` },
    });
    setSync(true);
  };

  return (
    <div className={css.manageContainer}>
      {volunteers.length > 0 ? (
        volunteers.map((v) => (
          <VolunteerThumbnail
            key={v.id}
            volunteer={v}
            deleteHandler={deleteHandler}
          />
        ))
      ) : (
        <h1>Nie ma tu jeszcze nic! 😥</h1>
      )}
      <RiAddCircleFill
        onClick={() => {
          navigate("/addvolunteer");
        }}
      />
    </div>
  );
};

export default ManageVolunteers;
