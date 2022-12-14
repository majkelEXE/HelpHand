import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import showModalState from '../../atoms/showModal';
import syncState from '../../atoms/sync';
import tokenState from '../../atoms/token';
import css from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const setToken = useSetRecoilState(tokenState);

  const navigate = useNavigate();

  const setShowModal = useSetRecoilState(showModalState);

  const setSync = useSetRecoilState(syncState);

  const loginHandler = async () => {
    if (!email || !password) {
      setError("Nie wszystkie pola zastały uzupełnione!");
      return;
    }

    try {
      let res = await axios.post("/api/auth", {
        email,
        password,
      });

      let token = res.data.token;

      setToken(token);
      setSync(true);
      navigate("/");
      setShowModal(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e);
        setError(
          Object.values<string>(e.response?.data).reduce(
            (acc: string, m: string) => acc + `${m}\n`,
            ""
          )
        );
        return;
      }

      setError("Coś poszło nie tak!");
      return;
    }
  };

  const resetHandler = async () => {
    if (email) {
      try {
        await axios.post("api/password_reset/", { email: email });

        setError("Sprawdź maila!");
      } catch (e) {
        if (axios.isAxiosError(e)) {
          let values = Object.values(e.response?.data);
          setError(values.join("\n"));
        } else {
          setError("Coś poszło nie tak!");
        }
      }
    } else {
      setError("Podaj maila!");
    }
  };

  return (
    <div className={css.loginContainer}>
      <h1>Zaloguj się</h1>
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
      <div className="bigPrimaryButton" onClick={loginHandler}>
        Zaloguj
      </div>
      <p className={css.reset} onClick={resetHandler}>
        Zapomniałem hasła
      </p>
      <p className={css.error}>{error}</p>
    </div>
  );
};

export default Login;
