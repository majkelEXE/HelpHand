import { useState } from 'react';
import { RiRefreshLine } from 'react-icons/ri';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import applyDataState from '../../atoms/applyData';
import errorSummaryState from '../../atoms/errorSummary';
import modalComponentState from '../../atoms/modalComponent';
import showModalState from '../../atoms/showModal';
import tokenState from '../../atoms/token';
import volunteersState from '../../atoms/volunteers';
import css from './Volunteer.module.css';

const Volunteer = () => {
  const { id } = useParams();
  const volunteers = useRecoilValue(volunteersState);
  const volunteer = volunteers.filter((v) => v.id == parseInt(id ?? ""))[0];
  const [hasApplied, setHasApplies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setShowModal = useSetRecoilState(showModalState);
  const setModalComponent = useSetRecoilState(modalComponentState);
  const setApplyData = useSetRecoilState(applyDataState);
  const setErrorSummary = useSetRecoilState(errorSummaryState);
  const token = useRecoilValue(tokenState);

  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });

  const applyHandler = () => {
    if (token) {
      setApplyData({
        volunteer_role: volunteer.role,
        addresser_email: volunteer.contact_email,
        email_content: "",
      });
      setModalComponent("apply");
      setShowModal(true);
    } else {
      setErrorSummary(["Aby aplikować musisz być zalogowany!"]);
      setModalComponent("errorSummary");
      setShowModal(true);
    }

    // if (!hasApplied) {
    //   setIsLoading(true);
    //   loadingTimeout = setTimeout(() => {
    //     setIsLoading(false);
    //     setHasApplies(true);
    //   }, 3000);
    // }
  };

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
        <div className={css.aplication}>
          <div
            className={`bigPrimaryButton ${hasApplied ? css.slideOut : ""}`}
            onClick={applyHandler}
          >
            {hasApplied
              ? "Gratulacje! Twoja aplikacja została wysłana!"
              : "Aplikuj"}
          </div>
          {isLoading && <RiRefreshLine className={css.spin} />}
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
