import { atom } from 'recoil';

const applyDataState = atom<{
  addresser_email: string;
  volunteer_role: string;
  email_content: string;
} | null>({
  key: "applyData",
  default: null,
});

export default applyDataState;
