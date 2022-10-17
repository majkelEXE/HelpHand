import { MouseEvent } from 'react';
import { RiAddCircleFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import fundraisesState from '../../atoms/fundraises';
import FundraiseThumbnail from './FundraiseThumbnail';
import css from './ManageFundraising.module.css';

const ManageFundraising = () => {
  const navigate = useNavigate();
  const [fundraises, setFundraises] = useRecoilState(fundraisesState);

  const deleteHandler = (e: MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation();
    setFundraises((prevState) => prevState.filter((f) => f.id != id));
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

export default ManageFundraising;
