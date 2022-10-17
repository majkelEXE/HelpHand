import axios from 'axios';
import { SetterOrUpdater } from 'recoil';

import volunteerModel from '../models/Volunteer';

const fetchVolunteers = async (
  setVolunteers: SetterOrUpdater<volunteerModel[]>
) => {
  let volunteers: volunteerModel[] = (await axios.get("/api/volunteer", {}))
    .data;

  setVolunteers(volunteers);
};

export default fetchVolunteers;
