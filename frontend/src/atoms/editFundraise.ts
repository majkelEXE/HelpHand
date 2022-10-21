import { atom } from 'recoil';

import fundraiseModel from '../models/Fundraise';

const editFundraiseState = atom<fundraiseModel | null>({
  key: "editFundraise",
  default: null,
});

export default editFundraiseState;
