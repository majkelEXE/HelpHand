import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import volunteersState from '../../atoms/volunteers';
import css from './Volunteer.module.css';

const Volunteer = () => {
  const { id } = useParams();
  const volunteers = useRecoilValue(volunteersState);
  const volunteer = volunteers.filter((v) => v.id == parseInt(id ?? ""))[0];

  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });

  return (
    <div
      className={
        isMobile ? css.mobileVolunteerContainer : css.volunteerContainer
      }
    >
      <div className={css.volunteerData}>
        <h1>{volunteer.role}</h1>
        <h2>{volunteer.description}</h2>
        <h3>{volunteer.content}</h3>
        <div className={css.requirements}>
          <h2>Wymagania</h2>
          {volunteer.skills.map((r) => (
            <p key={r.name}>- {r.name}</p>
          ))}
        </div>
        <h2>Kontakt</h2>
        <a href={`mailto:${volunteer.contact_email}`}>
          {volunteer.contact_email}
        </a>
        <br />
        <a href={`tel:+48${volunteer.contact_phone}`}>
          {volunteer.contact_phone}
        </a>
      </div>
      <div className={css.volunteerImage}>
        <img src={`/api${volunteer.image}`} />
      </div>
    </div>
  );
};

export default Volunteer;
