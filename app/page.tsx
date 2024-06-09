'use client'

import { useState, useEffect, useRef } from "react";
import { Dayjs } from 'dayjs';
import TimePicker from "@/components/organisms/TimePicker";
import Button, { BUTTON_TYPE} from '@/components/molecules/ButtonBase';
import Modal from '@/components/organisms/Modal';
import UserList from '@/components/organisms/UserList';
import fetchUserData, { User } from '@/services/fetchUserData';
import { blue } from '@mui/material/colors';

export default function Home() {
  const [time, setTime] = useState<Dayjs | null>(null);
  const [tempTime, setTempTime] = useState<Dayjs | null>(null);
  const [leftSeconds, setLeftSeconds] = useState<number | null>(null);
  const [timeModalOpen, setTimeModalOpen] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const clear = () => window.clearInterval(timer.current);

  const getUserData = async () => {
    const data = await fetchUserData();
    setUserList(data.results);
  };

  const startCount = () => {
    if (time === null) return;
    setLeftSeconds(Number(time.format('s')));
    timer.current = window.setInterval(() => {
      setLeftSeconds((time) => time === null ? 0 : time - 1);
    }, 1000);
  };

  const setCount = () => {
    setTime(tempTime);
    setTimeModalOpen(false);
  };

  const reset = () => {
    setTime(null);
    setTempTime(null);
    setLeftSeconds(null);
    setTargetUser(null);
  };

  useEffect(() => {
    // when count to zero, choose one user to win
    if (leftSeconds == 0) {
      clear();
      const targetId = Math.trunc(Math.random() * userList.length);
      setTargetUser(userList[targetId]);
    };
  }, [leftSeconds]);

  useEffect(() => {
    setTargetUser(null);
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
                onChange={(newValue: any) => setTime(newValue)} />
              <Modal
                text="定時"
                open={timeModalOpen}
                handleOpen={()=>setTimeModalOpen(true)}
              >
                <div className="flex flex-col items-center justify-between">
                  <div className="mb-5">
                    <TimePicker
                      value={tempTime}
                      onChange={(newValue: any) => setTempTime(newValue)} />
                  </div>
                  <div className="flex items-center w-full">
                    <Button className="m-1 flex-1" onClick={setCount}>確認</Button>
                    <Button type={BUTTON_TYPE.CANCEL} className="m-1 flex-1"  onClick={()=>setTimeModalOpen(false)}>取消</Button>
                  </div>
                </div>
              </Modal>
              <Button className="m-1" onClick={startCount} disabled={!time}>開始</Button>
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
