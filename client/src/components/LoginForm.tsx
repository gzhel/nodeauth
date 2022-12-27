import React, { FC, useContext, useState } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { store } = useContext(Context);

  return (
    <div>
      <input
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button onClick={() => store.login(email, password)}>Sign In</button>
      <button onClick={() => store.registration(email, password)}>Sign Up</button>
    </div>
  );
};

export default observer(LoginForm);
