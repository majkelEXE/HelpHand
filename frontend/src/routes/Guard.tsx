import React, { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import tokenState from '../atoms/token';

const Guard: FC<PropsWithChildren> = ({ children }) => {
  const token = useRecoilValue(tokenState);

  return token ? <>{children}</> : <Navigate to={"/"} />;
};

export default Guard;
