import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import showModalState from '../../atoms/showModal';
import syncState from '../../atoms/sync';
import tokenState from '../../atoms/token';
import css from './Register.module.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const setShowModal = useSetRecoilState(showModalState);
  const setToken = useSetRecoilState(tokenState);
  const setSync = useSetRecoilState(syncState);

  const registerHandler = async () => {
    if (
      !email ||
      !password ||
      !repeatedPassword ||
      !phone ||
      !firstName ||
      !LastName ||
      !dateOfBirth
    ) {
      setError("Nie wszystkie pola zastały uzupełnione!");
      return;
    }

    if (password != repeatedPassword) {
      setError("Hasła nie są takie same!");
      return;
    }

    try {
      console.log({
        email,
        first_name: firstName,
        last_name: LastName,
        date_of_birth: dateOfBirth,
        phone_number: phone,
        password,
      });

      let res = await axios.post("/api/users", {
        email,
        first_name: firstName,
        last_name: LastName,
        date_of_birth: dateOfBirth,
        phone_number: phone,
        password,
      });

      let token = res.data.token;

      setToken(token);
      setSync(true);
      navigate("/");
      setShowModal(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(
          Object.values<string[]>(e.response?.data)
            .map((m: string[]) => m[0])
            .reduce((acc: string, m: string) => acc + `${m}\n`, "")
        );
        return;
      }

      setError("Coś poszło nie tak!");
      return;
    }
  };

  return (
    <div className={css.registerContainer}>
      <h1>Register</h1>

      <div>
        <div>
          <div>
            <label>Email</label>
            <input
              type="text"
              className="textInput"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Imie</label>
            <input
              type="text"
              className="textInput"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Nazwisko</label>
            <input
              type="text"
              className="textInput"
              value={LastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Data urodzenia</label>
            <input
              type="date"
              className="textInput"
              value={dateOfBirth}
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Telefon</label>
            <input
              type="tel"
              className="textInput"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <div>
            <label>Hasło</label>
            <input
              type="password"
              className="textInput"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Powtórzone hasło</label>
            <input
              type="password"
              className="textInput"
              value={repeatedPassword}
              onChange={(e) => {
                setRepeatedPassword(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="bigPrimaryButton" onClick={registerHandler}>
        Register
      </div>
      <p className={css.error}>{error}</p>
    </div>
  );
};

export default Register;
