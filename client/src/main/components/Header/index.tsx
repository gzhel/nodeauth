import React, { FC } from 'react';
import s from './index.module.scss';
import { ControlledInput } from './ControlledInput';
import { ControlledButton } from './ControlledButton';
import { observer } from 'mobx-react-lite';
import { useModel } from './model';
import { ReactComponent as Logo } from '../../../styles/logo.svg';

export const Header: FC = observer(() => {
  const m = useModel();

  return (
    <div className={s.header}>
      <div className={s.logo} onClick={m.handleLogoClicked}>
        <span className={s.logoText}>NodeAuth</span>
        <Logo width={32} height={32} />
      </div>
      <div className={s.actions}>
        {!m.store.isAuthorized ? (
          <>
            <ControlledInput
              type={'email'}
              value={m.email}
              onChange={(event) => m.setEmail(event.target.value)}
              placeholder={'Email'}
              validationMessage={m.emailValidation || null}
            />
            <ControlledInput
              type={'password'}
              value={m.password}
              onChange={(event) => m.setPassword(event.target.value)}
              placeholder={'Password'}
              validationMessage={m.passwordValidation || null}
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
