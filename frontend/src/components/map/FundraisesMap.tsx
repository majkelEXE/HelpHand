import mapboxgl from 'mapbox-gl';
import maplibreGl from 'maplibre-gl';
import Map, { Marker } from 'react-map-gl';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import fundraisesState from '../../atoms/fundraises';
import mapLocationState from '../../atoms/mapLocation';
import css from './FundraisesMap.module.css';

const FundraisesMap = () => {
  const navigate = useNavigate();
  const fundraises = useRecoilValue(fundraisesState);
  const [mapLocation, setMapLocation] = useRecoilState(mapLocationState);

  const removeHandler = (e: mapboxgl.MapboxEvent<undefined>) => {
    setMapLocation({
      latitude: e.target.getCenter().lat,
      longitude: e.target.getCenter().lng,
      zoom: e.target.getZoom(),
    });
  };

  return (
    <div className={css.mapContainer}>
      <Map
        mapLib={maplibreGl}
        initialViewState={mapLocation}
        style={{ width: "100%", height: "calc(100vh - 100px)" }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_API_KEY}`}
        onRemove={removeHandler}
      >
        {fundraises.map((f) => (
          <Marker
            key={f.id}
            latitude={f.location.latitude}
            longitude={f.location.longtitude}
            color={"var(--mainColor)"}
            onClick={() => navigate(`/#/fundraise/${f.id}`)}
          />
        ))}
      </Map>
    </div>
  );
};

export default FundraisesMap;
