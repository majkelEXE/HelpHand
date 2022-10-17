import axios from 'axios';
import { SetterOrUpdater } from 'recoil';

import fundraiseModel from '../models/Fundraise';

const fetchUserFundraises = async (
  setUserFundraises: SetterOrUpdater<fundraiseModel[]>,
  token: string
) => {
  let fundraises: fundraiseModel[] = (
    await axios.get("/api/fundraiser", {
      headers: { Authorization: `token ${token}` },
    })
  ).data;

  console.log(fundraises);

  setUserFundraises(fundraises);
};

export default fetchUserFundraises;