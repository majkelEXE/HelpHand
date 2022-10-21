import './index.css';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ResetPassword from './components/account/ResetPassword';
import Fundraise from './components/fundraises/Fundraise';
import Fundraises from './components/fundraises/Fundraises';
import Knowledge from './components/knowledge/Knowledge';
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
import Guard from './routes/Guard';

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
        <Guard>
          <Panel />
        </Guard>
      </Layout>
    ),
  },
  {
    path: "/addvolunteer",
    element: (
      <Layout>
        <Guard>
          <AddVolunteer />
        </Guard>
      </Layout>
    ),
  },
  {
    path: "/addfundraise",
    element: (
      <Layout>
        <Guard>
          <AddFundraise />
        </Guard>
      </Layout>
    ),
  },
  {
    path: "/managevolunteers",
    element: (
      <Layout>
        <Guard>
          <ManageVolunteers />
        </Guard>
      </Layout>
    ),
  },
  {
    path: "/managefundraises",
    element: (
      <Layout>
        <Guard>
          <ManageFundraises />
        </Guard>
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
  {
    path: "/knowledge",
    element: (
      <Layout>
        <Knowledge />
      </Layout>
    ),
  },
  {
    path: "/reset",
    element: (
      <Layout>
        <ResetPassword />
      </Layout>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <AtomsProvider>
      <RouterProvider router={router} />
    </AtomsProvider>
  </RecoilRoot>
);
