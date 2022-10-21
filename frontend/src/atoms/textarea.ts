import { atom } from 'recoil';

const textareaState = atom<{ field: string; text: string } | null>({
  key: "textarea",
  default: null,
});

export default textareaState;
