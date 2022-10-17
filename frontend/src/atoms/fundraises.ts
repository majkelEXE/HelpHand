import { atom } from 'recoil';

import fundraiseModel from '../models/Fundraise';

const fundraisesState = atom<fundraiseModel[]>({
  key: "fundraises",
  default: [],
});

export default fundraisesState;
