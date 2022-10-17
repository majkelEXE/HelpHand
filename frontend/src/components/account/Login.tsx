import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import showModalState from '../../atoms/showModal';
import tokenState from '../../atoms/token';
import css from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const setToken = useSetRecoilState(tokenState);

  const navigate = useNavigate();

  const setShowModal = useSetRecoilState(showModalState);

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

  return (
    <div className={css.loginContainer}>
      <h1>Login</h1>
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
        <label>Password</label>
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
        Login
      </div>
      <p className={css.error}>{error}</p>
    </div>
  );
};

export default Login;
