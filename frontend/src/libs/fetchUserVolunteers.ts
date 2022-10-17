import axios from 'axios';
import { SetterOrUpdater } from 'recoil';

import volunteerModel from '../models/Volunteer';

const fetchUserVolunteers = async (
  setUserVolunteers: SetterOrUpdater<volunteerModel[]>,
  token: string
) => {
  let volunteers: volunteerModel[] = (
    await axios.get("/api/user_entities/volunteer/", {
      headers: { Authorization: `token ${token}` },
    })
  ).data;

  setUserVolunteers(volunteers);
};

export default fetchUserVolunteers;
