import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store]);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuthorized) {
    return (
      <>
        <LoginForm />
        <button onClick={() => getUsers()}>Get users</button>
        {users.map((user, index) => (
          <div key={`${user.email}-${index}`}>{user.email}</div>
        ))}
      </>
    );
  }

  return (
    <div>
      <h1>User is authorized {store.user.email}</h1>
      <h1>{store.user.isActivated ? 'Account is activated' : 'Account is not activated'}</h1>
      <button onClick={() => store.logout()}>Logout</button>
      <button onClick={() => getUsers()}>Get users</button>
      {users.map((user, index) => (
        <div key={`${user.email}-${index}`}>{user.email}</div>
      ))}
    </div>
  );
};

export default observer(App);
