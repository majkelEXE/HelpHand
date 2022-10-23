import axios from 'axios';
import { atom } from 'recoil';

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      axios
        .get("/api/auth", { headers: { Authorization: `token ${savedValue}` } })
        .then(() => {
          setSelf(savedValue);
        })
        .catch(() => {
          localStorage.removeItem(key);
        });
    }

    onSet((newValue: string, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, newValue);
    });
  };

const tokenState = atom({
  key: "token",
  default: "",
  effects: [localStorageEffect("current_user")],
});

export default tokenState;
