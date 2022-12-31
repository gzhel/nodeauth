import { observer } from 'mobx-react-lite';
import React from 'react';
import s from './index.module.scss';
import { ControlledButton } from '../Header/ControlledButton';
import classNames from 'classnames';
import { useModel } from './model';

export const Content = observer(() => {
  const m = useModel();

  if (!m.isUserAuthorized) {
    return (
      <div className={s.content}>
        <div className={s.authorizedUser}>
          To use the site's features, please log in to your account.
        </div>
        <div className={classNames(s.authorizedUser, s.validationMessage)}>
          {m.validationMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={s.content}>
      <div className={s.authorizedUser}>You currently authorized as {m.store.user.email}.</div>
      {m.store.user.isActivated ? null : (
        <div className={s.authorizedUser}>Please, activate your account via mail we sent you.</div>
      )}
      {!m.store.user.isActivated ? null : (
        <div className={s.users}>
          <ControlledButton value={'Get users'} onClick={m.getUsers} />
          <div className={s.usersTable}>
            <div className={classNames(s.usersTableHeader, s.usersTableRow)}>
              <p>Email</p>
              <p>Status</p>
            </div>
            {m.users.map((user, index) => (
              <div key={`${user.email}-${index}`} className={s.usersTableRow}>
                <p>{user.email}</p>
                <p>{user.isActivated ? 'ACTIVATED' : 'NOT ACTIVATED'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
