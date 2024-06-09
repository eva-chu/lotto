import * as React from 'react';
import { User } from '@/services/fetchUserData';

interface IProps {
  userInfo: User,
}

export default function UserItem({ userInfo }: IProps) {

  return (
    <div className="flex justify-between items-center w-full my-2 bg-slate-200 p-2">
      <div><img src={userInfo.picture.thumbnail} /></div>
      <div className="flex justify-center items-center" key={userInfo.login.uuid}>
          <div>{`${userInfo.name.title} ${userInfo.name.first} ${userInfo.name.last}`}</div>
      </div>
    </div>
  );
}