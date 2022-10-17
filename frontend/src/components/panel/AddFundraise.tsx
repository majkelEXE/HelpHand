import 'maplibre-gl/dist/maplibre-gl.css';

import axios from 'axios';
import maplibreGl from 'maplibre-gl';
import { ChangeEvent, useState } from 'react';
import { Map, Marker, NavigationControl, ViewStateChangeEvent } from 'react-map-gl';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import errorSummaryState from '../../atoms/errorSummary';
import modalComponentState from '../../atoms/modalComponent';
import showModalState from '../../atoms/showModal';
import syncState from '../../atoms/sync';
import tokenState from '../../atoms/token';
import volunteersState from '../../atoms/volunteers';
import Location from '../../models/Location';
import css from './AddFundraise.module.css';

const AddFundraise = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<{
    src: string;
    name: string;
    file: File | null;
  }>({
    src: "/images/background.jpg",
    name: "Wybierz zdjęcie",
    file: null,
  });

  const [date, setDate] = useState("");
  const [location, setLocation] = useState<Location>();
  const [selectedVolunteers, setSelectedVolunteers] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [latitude, setLatitude] = useState(50.049683);
  const [longitude, setLongitude] = useState(19.944544);
  const [zoom, setZoom] = useState(11);

  const volunteers = useRecoilValue(volunteersState);
  const setSync = useSetRecoilState(syncState);
  const token = useRecoilValue(tokenState);
  const setShowModal = useSetRecoilState(showModalState);
  const setModalComponent = useSetRecoilState(modalComponentState);
  const setErrorSummary = useSetRecoilState(errorSummaryState);

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage({
        src: URL.createObjectURL(e.target.files[0]),
        name: e.target.files[0].name,
        file: e.target.files[0],
      });
    }
  };

  const addFundraiseHandler = async () => {
    try {
      await axios.post(
        "/api/fundraiser",
        {
          image: image.file,
          name: name,
          description: description,
          date: date,
          content: content,
          contact_email: email,
          contact_phone: phone,
          location: JSON.stringify(location),
          volunteers: JSON.stringify(selectedVolunteers),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        }
      );

      setSync(true);
      navigate("/managefundraises");
    } catch (e) {
      // if (axios.isAxiosError(e)) {
      //   console.log(e);
      //   // setError(
      //   //   Object.values<string>(e.response?.data).reduce(
      //   //     (acc: string, m: string) => acc + `${m}\n`,
      //   //     ""
      //   //   )
      //   // );
      //   return;
      // }

      setErrorSummary(["Coś poszło nie tak!"]);
      setModalComponent("errorSummary");
      setShowModal(true);
      return;
    }
  };

  const mapClickHandler = async (e: mapboxgl.MapLayerMouseEvent) => {
    let data = (
      await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
      )
    ).data;

    setLocation({
      latitude: e.lngLat.lat,
      longtitude: e.lngLat.lng,
      name: data.features[0].properties.formatted,
    });
  };

  const volunteerSelectHandler = (id: number) => {
    if (selectedVolunteers.includes(id)) {
      setSelectedVolunteers((prevState) => prevState.filter((v) => v != id));
    } else {
      setSelectedVolunteers((prevState) => [...prevState, id]);
    }
  };

  const searchHandler = async () => {
    if (searchQuery) {
      let data = (
        await axios.get(
          `https://api.geoapify.com/v1/geocode/search?text=${searchQuery}&filter=countrycode:pl&limit=1&lang=pl&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
        )
      ).data;

      if (data.features[0]) {
        setLatitude(data.features[0].properties.lat);
        setLongitude(data.features[0].properties.lon);
        setZoom(14);
      }
    }
  };

  const dragHandler = (e: ViewStateChangeEvent) => {
    setLatitude(e.viewState.latitude);
    setLongitude(e.viewState.longitude);
  };

  const zoomHandler = (e: ViewStateChangeEvent) => {
    setZoom(e.viewState.zoom);
  };

  return (
    <div className={css.addFundraiseContainer}>
      <div className={css.formContainer}>
        <div>
          <h1>Nazwa zbiórki</h1>
          <input
            type="text"
            className="textInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h1>Zdjęcie</h1>
          <label className={css.fileContainer}>
            {image.name}
            <input
              type="file"
              onChange={imageHandler}
              style={{ display: "none" }}
            />
          </label>
          <div className={css.image}>
            <img src={image.src} />
          </div>
        </div>

        <div>
          <h1>Opis</h1>
          <input
            type="text"
            className="textInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h1>Zawartość</h1>
          <input
            type="text"
            className="textInput"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <h1>Email</h1>
          <input
            type="email"
            className="textInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h1>Telefon</h1>
          <input
            type="tel"
            className="textInput"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <h1>Data</h1>
          <input
            // type="datetime-local"
            type="date"
            className="textInput"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <h1>Lokacja</h1>
          <div className={css.searchLocation}>
            <input
              className={`textInput`}
              type="text"
              placeholder="Kraków"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="primaryButton" onClick={searchHandler}>
              Szukaj
            </div>
          </div>
          <div className={css.location}>
            <Map
              mapLib={maplibreGl}
              latitude={latitude}
              longitude={longitude}
              zoom={zoom}
              style={{ width: "400px", height: "250px", borderRadius: "7px" }}
              mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_API_KEY}`}
              onClick={mapClickHandler}
              onDrag={dragHandler}
              onZoom={zoomHandler}
            >
              <NavigationControl position="top-left" />
              {location && (
                <Marker
                  longitude={location.longtitude}
                  latitude={location.latitude}
                  anchor="bottom"
                >
                  <div className={css.pin}>
                    {location.name
                      .split(",")
                      .reduce((acc, l) => (acc += l + "\n"), "")}
                  </div>
                </Marker>
              )}
            </Map>
            {/* <div className={css.locationInput}>
              <input
                type="text"
                className="textInput"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
              <div
                onClick={searchLocationHandler}
                className={`primaryButton ${css.searchButton}`}
              >
                Search
              </div>
            </div> */}
            {/* <div className={css.addresses}>
              {addresses.map((a, i) => (
                <div
                  key={i}
                  className={`${css.address} ${
                    a.name == location?.name &&
                    a.lat == location.lat &&
                    a.lon == location.lon
                      ? css.addressSelected
                      : ""
                  }`}
                  onClick={() => locationSelectHandler(a)}
                >
                  {a.name}
                </div>
              ))}
            </div>
          </div> */}

            {/* <h1>Wymagania</h1>
          <input
            type="text"
            className="textInput"
            maxLength={50}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
          />
          <RiAddCircleFill
            onClick={addRequirementHandler}
            style={{ marginBottom: "50px" }}
          />
          <div className={css.requirements}>
            {requirements.map((r, i) => (
          <div className={css.requirement}>
            <p>{r}</p>
            <RiDeleteBin2Fill onClick={() => deleteRequirementHandler(i)} />
          </div>
        ))} */}
          </div>
          <h1>Potrzebni wolontariusze</h1>

          <div className={css.volunteers}>
            {volunteers.map((v, i) => (
              <p
                className={`${css.volunteer} ${
                  selectedVolunteers.includes(v.id) ? css.selectedVolunteer : ""
                }`}
                onClick={() => volunteerSelectHandler(v.id)}
                key={v.id}
              >
                {v.role}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`bigPrimaryButton ${css.add}`}
        onClick={addFundraiseHandler}
      >
        Dodaj
      </div>
    </div>
  );
};

export default AddFundraise;
