import { atom } from 'recoil';

const showModalState = atom({
  key: "showModal",
  default: false,
});

export default showModalState;
