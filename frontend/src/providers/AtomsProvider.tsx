import { FC, PropsWithChildren, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import fundraisesState from '../atoms/fundraises';
import syncState from '../atoms/sync';
import tokenState from '../atoms/token';
import userFundraisesState from '../atoms/userFundraises';
import userVolunteersState from '../atoms/userVolunteers';
import volunteersState from '../atoms/volunteers';
import fetchFundraises from '../libs/fetchFundraises';
import fetchUserFundraises from '../libs/fetchUserFundraises';
import fetchUserVolunteers from '../libs/fetchUserVolunteers';
import fetchVolunteers from '../libs/fetchVolunteers';

const AtomsProvider: FC<PropsWithChildren> = ({ children }) => {
  const token = useRecoilValue(tokenState);
  const [sync, setSync] = useRecoilState(syncState);
  const setVolunteers = useSetRecoilState(volunteersState);
  const setFundraises = useSetRecoilState(fundraisesState);
  const setUserVolunteers = useSetRecoilState(userVolunteersState);
  const setUserFundraises = useSetRecoilState(userFundraisesState);

  const fetchAtoms = async () => {
    await fetchVolunteers(setVolunteers);
    await fetchFundraises(setFundraises);
    if (token) {
      await fetchUserVolunteers(setUserVolunteers, token);
      await fetchUserFundraises(setUserFundraises, token);
    }

    setSync(false);
  };

  useEffect(() => {
    if (sync) {
      fetchAtoms();
    }
  }, [sync, token]);

  return !sync ? <>{children}</> : <h1>LOADING</h1>;
};

export default AtomsProvider;
