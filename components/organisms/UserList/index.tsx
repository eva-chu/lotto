import * as React from 'react';
import { User } from '@/services/fetchUserData';
import UserItem from '@/components/molecules/UserItem';
import CircularProgress from '@mui/material/CircularProgress';

interface IProps {
  userList: User[],
}

export default function ModalUnstyled({ userList }: IProps) {

  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto h-96 lg:w-80">
      {userList.length ?
        userList.map(user => (
          user.login.uuid ? <UserItem userInfo={user} key={user.login.uuid} /> : null
        )) : <div className="flex justify-center items-center h-96 lg:w-80"><CircularProgress /></div>}
    </div>
  );
}