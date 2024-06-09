'use client'

import { useState, useEffect, useRef } from "react";
import dayjs, { Dayjs } from 'dayjs';
import TimePicker from "@/components/organisms/TimePicker";
import Button, { BUTTON_TYPE} from '@/components/molecules/ButtonBase';
import Modal from '@/components/organisms/Modal';
import { blue } from '@mui/material/colors';

export default function Home() {
  const [time, setTime] = useState<Dayjs | null>(null);
  const [tempTime, setTempTime] = useState<Dayjs | null>(null);
  const [leftSeconds, setLeftSeconds] = useState<number>(0);
  const [timeModalOpen, setTimeModalOpen] = useState<boolean>(false);
  const timer = useRef<number | undefined>(undefined);

  const clear = () => window.clearInterval(timer.current);

  const startCount = () => {
    if (time === null) return; 
    setLeftSeconds(Number(time.format('s')));
    timer.current = window.setInterval(() => {
      setLeftSeconds((time) => time - 1);
    }, 1000);
  };

  const setCount = () => {
    setTime(tempTime);
    setTimeModalOpen(false);
  };

  useEffect(() => {
    if (leftSeconds == 0) {
      clear();
    };
  }, [leftSeconds]);

  useEffect(() => {
    return clear;
  }, []);

  return (
    <main className="flex h-screen items-center justify-between">
      <div className="flex flex-col items-center text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left">   
        <h1 className="font-bold lg:text-2xl mb-5">抽獎時間</h1> 
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
          {`${Math.trunc(leftSeconds / 60) < 10 ? '0' + Math.trunc(leftSeconds / 60) : Math.trunc(leftSeconds / 60)} : ${(leftSeconds % 60) < 10 ? '0' + (leftSeconds % 60) : (leftSeconds % 60)}`}
        </div>
      </div>
      <div className="flex flex-col items-center text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left">  
        <h1 className="font-bold lg:text-2xl">參與抽獎名單</h1>         
      </div>
    </main>
  );
}
