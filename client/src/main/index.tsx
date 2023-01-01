import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useModel } from './model';
import s from './index.module.scss';
import { Header } from './components/Header';
import { Content } from './components/Content';
import { createPortal } from 'react-dom';

const App: FC = observer(() => {
  const m = useModel();

  return (
    <div className={s.app}>
      <Header />
      {m.isLoading &&
        m.preloaderElement &&
        createPortal(
          <div className={s.preloaderContent}>
            <span
              ref={m.preloaderTextElement}
              style={{ color: m.preloaderColor }}
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              Loading...
            </span>
          </div>,
          m.preloaderElement
        )}
      <Content />
    </div>
  );
});

export default App;
