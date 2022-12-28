import React, { FC } from 'react';
import s from './index.module.scss';
import { ControlledInput } from './ControlledInput';
import { ControlledButton } from './ControlledButton';
import { observer } from 'mobx-react-lite';
import { useModel } from './model';

export const Header: FC = observer(() => {
  const m = useModel();

  return (
    <div className={s.header}>
      <div className={s.logo}>NodeAuth</div>
      <div className={s.actions}>
        {!m.store.isAuthorized ? (
          <>
            <ControlledInput
              type={'email'}
              value={m.email}
              onChange={(event) => m.setEmail(event.target.value)}
              placeholder={'Email'}
              validationMessage={null}
            />
            <ControlledInput
              type={'password'}
              value={m.password}
              onChange={(event) => m.setPassword(event.target.value)}
              placeholder={'Password'}
              validationMessage={null}
            />
            <div className={s.buttons}>
              <ControlledButton value={'Sign In'} onClick={m.handleLogin} />
              <ControlledButton value={'Sign Up'} onClick={m.handleRegistration} />
            </div>
          </>
        ) : (
          <div className={s.buttons}>
            <ControlledButton value={'Logout'} onClick={m.handleLogout} />
          </div>
        )}
      </div>
    </div>
  );
});
