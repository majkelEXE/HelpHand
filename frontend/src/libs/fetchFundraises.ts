import axios from 'axios';
import { SetterOrUpdater } from 'recoil';

import fundraiseModel from '../models/Fundraise';

const fetchFundraises = async (
  setFundraises: SetterOrUpdater<fundraiseModel[]>
) => {
  let fundraises: fundraiseModel[] = (await axios.get("/api/fundraiser", {}))
    .data;

  console.log(fundraises);

  setFundraises(fundraises);
};

export default fetchFundraises;
