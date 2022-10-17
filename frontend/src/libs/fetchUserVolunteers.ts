import axios from 'axios';
import { SetterOrUpdater } from 'recoil';

import volunteerModel from '../models/Volunteer';

const fetchUserVolunteers = async (
  token: string,
  setUserVolunteers: SetterOrUpdater<volunteerModel[]>
) => {
  let volunteers: volunteerModel[] = (
    await axios.get("/api/user_entities/volunteer/", {
      headers: { Authorization: `token ${token}` },
    })
  ).data;

  setUserVolunteers(volunteers);
};

export default fetchUserVolunteers;
