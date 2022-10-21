import { atom } from 'recoil';

import volunteerModel from '../models/Volunteer';

const editVolunteerState = atom<volunteerModel | null>({
  key: "editVolunteer",
  default: null,
});

export default editVolunteerState;
