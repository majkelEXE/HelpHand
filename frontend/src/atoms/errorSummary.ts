import { atom } from 'recoil';

const errorSummaryState = atom<string[]>({
  key: "errorSummary",
  default: [],
});

export default errorSummaryState;
