import axios from 'axios';
import { SetterOrUpdater } from 'recoil';

import fundraiseModel from '../models/Fundraise';

const fetchFundraises = async (
  token: string,
  setFundraises: SetterOrUpdater<fundraiseModel[]>
) => {
  let fundraises: fundraiseModel[] = (
    await axios.get("/api/fundraiser", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
  ).data;

  setFundraises(fundraises);
};

export default fetchFundraises;
