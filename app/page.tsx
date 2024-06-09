'use client'

import { useState, useEffect, useRef } from "react";
import { Dayjs } from 'dayjs';
import TimePicker from "@/components/organisms/TimePicker";
import Button, { BUTTON_TYPE} from '@/components/molecules/ButtonBase';
import Modal from '@/components/organisms/Modal';
import UserList from '@/components/organisms/UserList';
import fetchUserData, { User } from '@/services/fetchUserData';
import { useSelector, useDispatch } from 'react-redux';
import { blue } from '@mui/material/colors';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '@/reducers';
import { IState as IUserState } from '@/reducers/user';
import { IState as ITimerState } from '@/reducers/timer';

const store = createStore(rootReducer);

export default function Home() {
  return <Provider store={store}><Lotto/></Provider>
}

function Lotto() {
  const dispatch = useDispatch();
  const {
    time,
    tempTime,
    leftSeconds,
    timeModalOpen,
  } = useSelector((state: { timer: ITimerState }) => state.timer);
  const {
    userList,
    targetUser,
  } = useSelector((state: { user: IUserState }) => state.user);
  const timer = useRef<number | undefined>(undefined);

  const clear = () => window.clearInterval(timer.current);

  const getUserData = async () => {
    const data = await fetchUserData();
    dispatch({type: 'SET_USER_LIST', userList: data.results});
  };

  const startCount = () => {
    if (time === null) return;
    dispatch({type: 'SET_LEFT_SECONDS', leftSeconds: Number(time.format('s'))});
    timer.current = window.setInterval(() => {
      dispatch({type: 'SUBSTRACT_LEFT_SECONDS' });
    }, 1000);
  };

  const setCount = () => {
    dispatch({type: 'SET_TIME', time: tempTime});
    dispatch({type: 'SET_TIME_MODAL_OPEN', timeModalOpen: false});
  };

  const reset = () => {
    dispatch({type: 'SET_TIME', time: null});
    dispatch({type: 'SET_TEMP_TIME', tempTime: null});
    dispatch({type: 'SET_LEFT_SECONDS', leftSeconds: null});
    dispatch({type: 'RESET_TARGET_USER'});
  };

  useEffect(() => {
    // when count to zero, choose one user to win
    if (leftSeconds == 0) {
      clear();
      const targetId = Math.trunc(Math.random() * userList.length);
      dispatch({type: 'SET_TARGET_USER', targetUserId: targetId});
    };
  }, [leftSeconds]);

  useEffect(() => {
    getUserData();
    return clear;
  }, []);

  return (
    targetUser === null ?
      <main className="flex h-screen items-center justify-between">
        <div className="flex flex-col items-center text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left lg:max-h-full">
          <h1 className="font-bold lg:text-2xl mb-5">抽獎時間</h1>
          <div className="flex flex-col justify-center lg:h-96">
            <div className="flex items-center justify-between">
              <TimePicker
                value={time}
                disabled
                onChange={(newValue: any) => dispatch({type: 'SET_TIME', time: newValue})} />
              <Modal
                text="定時"
                open={timeModalOpen}
                handleOpen={()=>dispatch({type: 'SET_TIME_MODAL_OPEN', timeModalOpen: true})}
              >
                <div className="flex flex-col items-center justify-between">
                  <div className="mb-5">
                    <TimePicker
                      value={tempTime}
                      onChange={(newValue: any) => dispatch({type: 'SET_TEMP_TIME', tempTime: newValue})} />
                  </div>
                  <div className="flex items-center w-full">
                    <Button className="m-1 flex-1" onClick={setCount}>確認</Button>
                    <Button 
                      type={BUTTON_TYPE.CANCEL} 
                      className="m-1 flex-1"  
                      onClick={()=>dispatch({type: 'SET_TIME_MODAL_OPEN', timeModalOpen: false})}
                    >
                      取消
                    </Button>
                  </div>
                </div>
              </Modal>
              <Button className="m-1" onClick={startCount} disabled={!time || (leftSeconds !== null && leftSeconds > 0)}>開始</Button>
            </div>
            <div className="text-8xl m-5" style={{color: blue[500]}}>
              {leftSeconds === null ?
                "00 : 00" :
                `${Math.trunc(leftSeconds / 60) < 10 ? '0' + Math.trunc(leftSeconds / 60) : Math.trunc(leftSeconds / 60)} : ${(leftSeconds % 60) < 10 ? '0' + (leftSeconds % 60) : (leftSeconds % 60)}`
              }
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left lg:max-h-full">
          <h1 className="font-bold lg:text-2xl mb-5">參與抽獎名單</h1>
          <UserList userList={userList} />
        </div>
      </main>
      :
      <main className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left">
          <h1 className="font-bold lg:text-2xl mb-5">抽獎結果</h1>
          <h1 className="font-bold lg:text-xl mb-2">{`${targetUser?.name.title} ${targetUser?.name.first} ${targetUser?.name.last}`}</h1>
          <div className="flex items-center justify-center lg:mb-2 lg:w-64 lg:h-64 lg:max-w-lg relative">
            <img className="absolute lg:h-full" src={targetUser?.picture.large} />
          </div>
          <Button className="m-1 lg:w-52" onClick={reset}>重新抽獎</Button>
        </div>
    </main>
  );
}
