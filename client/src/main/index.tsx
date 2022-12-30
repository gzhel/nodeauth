import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useModel } from './model';
import s from './index.module.scss';
import { Header } from './components/Header';
import { Content } from './components/Content';

const App: FC = observer(() => {
  const m = useModel();

  // TODO:
  //  1) Preloader
  //  2) Bugfixes
  //  3) Deploy
  //  4) Portfolio

  if (m.isAuthorizationLoading) {
    // Add component of preloader using react portals
    return <div>Loading...</div>;
  }

  return (
    <div className={s.app}>
      <Header />
      <Content />
    </div>
  );
});

export default App;
