import { MouseEvent } from 'react';
import { RiAddCircleFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import volunteersState from '../../atoms/volunteers';
import css from './ManageVolunteers.module.css';
import VolunteerThumbnail from './VolunteerThumbnail';

const ManageVolunteers = () => {
  const navigate = useNavigate();
  const [volunteers, setVolunteers] = useRecoilState(volunteersState);

  const deleteHandler = (e: MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation();
    setVolunteers((prevState) => prevState.filter((v) => v.id != id));
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
