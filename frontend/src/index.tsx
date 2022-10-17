import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Fundraise from './components/fundraises/Fundraise';
import Fundraises from './components/fundraises/Fundraises';
import Layout from './components/layout/Layout';
import FundraisesMap from './components/map/FundraisesMap';
import AddFundraise from './components/panel/AddFundraise';
import AddVolunteer from './components/panel/AddVolunteer';
import ManageFundraises from './components/panel/ManageFundraises';
import ManageVolunteers from './components/panel/ManageVolunteers';
import Panel from './components/panel/Panel';
import Voluntary from './components/voluntary/Voluntary';
import Volunteer from './components/voluntary/Volunteer';
import AtomsProvider from './providers/AtomsProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Fundraises />
      </Layout>
    ),
  },
  {
    path: "/voluntary",
    element: (
      <Layout>
        <Voluntary />
      </Layout>
    ),
  },
  {
    path: "/panel",
    element: (
      <Layout>
        <Panel />
      </Layout>
    ),
  },
  {
    path: "/addvolunteer",
    element: (
      <Layout>
        <AddVolunteer />
      </Layout>
    ),
  },
  {
    path: "/addfundraise",
    element: (
      <Layout>
        <AddFundraise />
      </Layout>
    ),
  },
  {
    path: "/managevolunteers",
    element: (
      <Layout>
        <ManageVolunteers />
      </Layout>
    ),
  },
  {
    path: "/managefundraises",
    element: (
      <Layout>
        <ManageFundraises />
      </Layout>
    ),
  },
  {
    path: "/volunteer/:id",
    element: (
      <Layout>
        <Volunteer />
      </Layout>
    ),
  },
  {
    path: "/fundraise/:id",
    element: (
      <Layout>
        <Fundraise />
      </Layout>
    ),
  },
  {
    path: "/map",
    element: (
      <Layout>
        <FundraisesMap />
      </Layout>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <AtomsProvider>
        <RouterProvider router={router} />
      </AtomsProvider>
    </RecoilRoot>
  </React.StrictMode>
);
