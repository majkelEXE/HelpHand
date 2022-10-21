import axios from 'axios';
import { MouseEvent } from 'react';
import { RiAddCircleFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import editVolunteerState from '../../atoms/editVolunteer';
import syncState from '../../atoms/sync';
import tokenState from '../../atoms/token';
import userVolunteersState from '../../atoms/userVolunteers';
import css from './ManageVolunteers.module.css';
import VolunteerThumbnail from './VolunteerThumbnail';

const ManageVolunteers = () => {
  const navigate = useNavigate();
  const [volunteers, setVolunteers] = useRecoilState(userVolunteersState);
  const setEditVolunteer = useSetRecoilState(editVolunteerState);
  const token = useRecoilValue(tokenState);
  const setSync = useSetRecoilState(syncState);

  const deleteHandler = async (e: MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation();
    await axios.delete(`/api/volunteer/${id}`, {
      headers: { Authorization: `token ${token}` },
    });
    setSync(true);
  };

  const editHandler = async (e: MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation();
    setEditVolunteer(volunteers.filter((v) => v.id == id)[0]);
    navigate("/addvolunteer");
  };

  return (
    <div className={css.manageContainer}>
      {volunteers.length > 0 ? (
        volunteers.map((v) => (
          <VolunteerThumbnail
            key={v.id}
            volunteer={v}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
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
