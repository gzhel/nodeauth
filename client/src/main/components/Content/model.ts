import { useCallback, useContext, useState } from 'react';
import { Context } from '../../../index';
import { IUser } from '../../../shared/interfaces/IUser';
import userService from '../../../shared/services/userService';

export const useModel = () => {
  const { store } = useContext(Context);

  const [users, setUsers] = useState<IUser[]>([]);
  const getUsers = useCallback(async () => {
    try {
      const response = await userService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const isUserAuthorized = store.isAuthorized;

  return { store, users, setUsers, getUsers, isUserAuthorized };
};
