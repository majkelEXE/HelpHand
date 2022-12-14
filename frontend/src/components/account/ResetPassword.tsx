import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import css from './ResetPassword.module.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [error, setError] = useState("");

  const resetHandler = async () => {
    if (newPassword == repeatedNewPassword) {
      try {
        await axios.post("/api/password_reset/confirm/", {
          token: searchParams.get("token"),
          password: newPassword,
        });

        navigate("/");
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(
            Object.values<string>(e.response?.data).reduce(
              (acc: string, m: string) => acc + `${m}\n`,
              ""
            )
          );
          return;
        } else {
          setError("Coś poszło nie tak");
        }
        return;
      }

      return;
    }

    setError("Hasła nie są identyczne");
  };

  return searchParams.get("token") ? (
    <div className={css.resetContainer}>
      <h1>Ustaw nowe hasło</h1>
      <div>
        <label>Hasło</label>
        <input
          type="password"
          className="textInput"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Powtórzone hasło</label>
        <input
          type="password"
          className="textInput"
          value={repeatedNewPassword}
          onChange={(e) => {
            setRepeatedNewPassword(e.target.value);
          }}
        />
      </div>
      <div className="bigPrimaryButton" onClick={resetHandler}>
        Resetuj
      </div>
      <p className={css.error}>{error}</p>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default ResetPassword;
