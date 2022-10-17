import { atom } from 'recoil';

const syncState = atom({
  key: "sync",
  default: true,
});

export default syncState;
