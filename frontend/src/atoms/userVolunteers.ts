import { atom } from 'recoil';

import volunteerModel from '../models/Volunteer';

const userVolunteersState = atom<volunteerModel[]>({
  key: "userVolunteers",
  default: [],
});

export default userVolunteersState;
