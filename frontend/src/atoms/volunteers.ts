import { atom } from 'recoil';

import volunteerModel from '../models/Volunteer';

const volunteersState = atom<volunteerModel[]>({
  key: "volunteers",
  default: [],
});

export default volunteersState;
