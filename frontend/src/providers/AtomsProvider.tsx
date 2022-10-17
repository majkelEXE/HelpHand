import { FC, PropsWithChildren, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import fundraisesState from '../atoms/fundraises';
import syncState from '../atoms/sync';
import tokenState from '../atoms/token';
import volunteersState from '../atoms/volunteers';
import fetchFundraises from '../libs/fetchFundraises';
import fetchVolunteers from '../libs/fetchVolunteers';

const AtomsProvider: FC<PropsWithChildren> = ({ children }) => {
  const token = useRecoilValue(tokenState);
  const [sync, setSync] = useRecoilState(syncState);
  const setVolunteers = useSetRecoilState(volunteersState);
  const setFundraises = useSetRecoilState(fundraisesState);

  const fetchAtoms = async () => {
    await fetchVolunteers(token, setVolunteers);
    await fetchFundraises(token, setFundraises);
    setSync(false);
  };

  useEffect(() => {
    if (sync) {
      fetchAtoms();
    }
  }, [sync]);

  return !sync ? <>{children}</> : <h1>LOADING</h1>;
};

export default AtomsProvider;
