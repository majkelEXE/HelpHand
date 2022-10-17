import { atom } from 'recoil';

import fundraiseModel from '../models/Fundraise';

const userFundraisesState = atom<fundraiseModel[]>({
  key: "userFundraises",
  default: [],
});

export default userFundraisesState;
