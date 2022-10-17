import maplibreGl from 'maplibre-gl';
import Map, { Marker } from 'react-map-gl';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import fundraisesState from '../../atoms/fundraises';
import css from './Fundraise.module.css';

const Fundraise = () => {
  const { id } = useParams();
  const fundraises = useRecoilValue(fundraisesState);
  const fundraise = fundraises.filter((f) => f.id == parseInt(id ?? ""))[0];

  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });

  return (
    <div
      className={
        isMobile ? css.mobileFundraiseContainer : css.fundraiseContainer
      }
    >
      <div className={css.fundraiseData}>
        <h1>{fundraise.name}</h1>
        <h2>{fundraise.description}</h2>
        <h3>{fundraise.content}</h3>

        <div className={css.neededVolunteers}>
          {fundraise.volunteers.length > 0 && (
            <h2>Jakich woluntariuszy potrzebujemy?</h2>
          )}
          {fundraise.volunteers.map((v) => (
            <a key={v.id} href={`/volunteer/${v.id}`} className="primaryButton">
              {v.role}
            </a>
          ))}
        </div>

        <div className={css.location}>
          <h2>Kiedy i gdzie?</h2>
          <h3>{new Date(fundraise.date).toLocaleString()}</h3>
          <h3>{fundraise.location.name}</h3>
        </div>

        <Map
          mapLib={maplibreGl}
          initialViewState={{
            longitude: fundraise.location.longtitude,
            latitude: fundraise.location.latitude,
            zoom: 14,
          }}
          style={{ maxWidth: "400px", height: "250px", borderRadius: "7px" }}
          mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_API_KEY}`}
        >
          <Marker
            latitude={fundraise.location.latitude}
            longitude={fundraise.location.longtitude}
            color={"var(--mainColor)"}
          />
        </Map>

        <div className={css.contact}>
          <h2>Kontakt</h2>
          <a href={`mailto:${fundraise.contact_email}`}>
            {fundraise.contact_email}
          </a>
          <br />
          <a href={`tel:+48${fundraise.contact_phone}`}>
            {fundraise.contact_phone}
          </a>
        </div>
      </div>
      <div className={css.fundraiseImage}>
        <img src={`/api/${fundraise.image}`} />
      </div>
    </div>
  );
};

export default Fundraise;
