import axios from 'axios';
import { SetterOrUpdater } from 'recoil';

import volunteerModel from '../models/Volunteer';

const fetchVolunteers = async (
  token: string,
  setVolunteers: SetterOrUpdater<volunteerModel[]>
) => {
  let volunteers: volunteerModel[] = (
    await axios.get("/api/volunteer", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
  ).data;

  setVolunteers(volunteers);
};

export default fetchVolunteers;
