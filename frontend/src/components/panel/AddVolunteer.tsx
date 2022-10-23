import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { RiAddCircleFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import editVolunteerState from '../../atoms/editVolunteer';
import errorSummaryState from '../../atoms/errorSummary';
import modalComponentState from '../../atoms/modalComponent';
import showModalState from '../../atoms/showModal';
import syncState from '../../atoms/sync';
import textareaState from '../../atoms/textarea';
import tokenState from '../../atoms/token';
import css from './AddVolunteer.module.css';

const AddVolunteer = () => {
  const navigate = useNavigate();
  const setSync = useSetRecoilState(syncState);

  const [editVolunteer, setEditVolunteer] = useRecoilState(editVolunteerState);
  const [textarea, setTextarea] = useRecoilState(textareaState);

  useEffect(() => {
    if (textarea) {
      if (textarea.field == "desc") {
        setDescription(textarea.text);
      } else if (textarea.field == "content") {
        setContent(textarea.text);
      }
    }
  }, [textarea]);

  const token = useRecoilValue(tokenState);
  const setShowModal = useSetRecoilState(showModalState);
  const setModalComponent = useSetRecoilState(modalComponentState);
  const setErrorSummary = useSetRecoilState(errorSummaryState);

  const [name, setName] = useState(editVolunteer ? editVolunteer.role : "");
  const [description, setDescription] = useState(
    editVolunteer ? editVolunteer.description : ""
  );
  const [content, setContent] = useState(
    editVolunteer ? editVolunteer.content : ""
  );
  const [email, setEmail] = useState(
    editVolunteer ? editVolunteer.contact_email : ""
  );
  const [phone, setPhone] = useState(
    editVolunteer ? editVolunteer.contact_phone : ""
  );
  const [image, setImage] = useState<{
    src: string;
    name: string;
    file: File | null;
  }>({
    src: editVolunteer ? editVolunteer.image : "/images/background.jpg",
    name: "Wybierz zdjęcie",
    file: null,
  });
  const [requirement, setRequirement] = useState("");
  const [requirements, setRequirements] = useState<string[]>(
    editVolunteer ? editVolunteer.skills.map((s) => s.name) : []
  );

  useEffect(() => {
    return () => {
      setEditVolunteer(null);
    };
  }, []);

  const addRequirementHandler = () => {
    if (requirement) {
      setRequirements((prevState) => [...prevState, requirement]);
      setRequirement("");
    }
  };

  const deleteRequirementHandler = (i: number) => {
    setRequirements((prevState) => prevState.filter((r, j) => j != i));
  };

  const addVolunteerHandler = async () => {
    if (
      !name ||
      !email ||
      !phone ||
      !content ||
      !description ||
      (!editVolunteer && !image.file)
    ) {
      setErrorSummary(["Uzupełnij wszystkie pola!"]);
      setModalComponent("errorSummary");
      setShowModal(true);
      return;
    }

    try {
      if (editVolunteer) {
        let res = await axios.put(
          `/api/volunteer/${editVolunteer.id}`,
          {
            contact_email: email,
            contact_phone: phone,
            content: content,
            description: description,
            image: image.file,
            role: name,
            skills: JSON.stringify(requirements),
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `token ${token}`,
            },
          }
        );
        console.log(res);
      } else {
        await axios.post(
          "/api/volunteer",
          {
            contact_email: email,
            contact_phone: phone,
            content: content,
            description: description,
            image: image.file,
            role: name,
            skills: JSON.stringify(requirements),
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `token ${token}`,
            },
          }
        );
      }

      setSync(true);
      navigate("/#/managevolunteers");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e);
        let keys = Object.keys(e.response?.data);
        let values = Object.values(e.response?.data);
        setErrorSummary(keys.map((k, i) => k + " - " + values[i]));
      } else {
        setErrorSummary(["Coś poszło nie tak!"]);
      }

      setModalComponent("errorSummary");
      setShowModal(true);
      return;
    }
  };

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage({
        src: URL.createObjectURL(e.target.files[0]),
        name: e.target.files[0].name,
        file: e.target.files[0],
      });
    }
  };

  const textareaHandler = (field: string, text: string) => {
    setTextarea({ field, text });
    setModalComponent("textarea");
    setShowModal(true);
  };

  return (
    <div className={css.addVolunteerContainer}>
      <div className={css.formContainer}>
        <div>
          <h1>Nazwa wolontariatu</h1>
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
            onClick={() => textareaHandler("desc", description)}
          />
          <h1>Zawartość</h1>
          <input
            type="text"
            className="textInput"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onClick={() => textareaHandler("content", content)}
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
            placeholder="+48 111 222 333"
            type="tel"
            className="textInput"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <h1>Wymagania</h1>
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
              <div className={css.requirement} key={i}>
                <p>{r}</p>
                <RiDeleteBin2Fill onClick={() => deleteRequirementHandler(i)} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`bigPrimaryButton ${css.add}`}
        onClick={addVolunteerHandler}
      >
        {editVolunteer ? "Edytuj" : "Dodaj"}
      </div>
    </div>
  );
};

export default AddVolunteer;
