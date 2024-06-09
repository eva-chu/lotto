
import { Dayjs } from 'dayjs';

export interface IState {
  time: Dayjs | null,
  tempTime: Dayjs | null,
  leftSeconds: number | null,
  timeModalOpen: boolean,
};

const initialState: IState = {
  time: null,
  tempTime: null,
  leftSeconds: 0,
  timeModalOpen: false,
};

const timer = (state = initialState, action: {
  type: string;
  time: Dayjs | null;
  tempTime: Dayjs | null;
  leftSeconds: number | null;
  timeModalOpen: boolean;
}) => {
  switch (action.type) {
    case 'SET_TIME':
      return {
        ...state,
        time: action.time,
      }
    case 'SET_TEMP_TIME':
      return {
        ...state,
        tempTime: action.tempTime,
      }
    case 'SET_LEFT_SECONDS':
      return {
        ...state,
        leftSeconds: action.leftSeconds,
      }

    case 'SUBSTRACT_LEFT_SECONDS':
      if (state.leftSeconds) {
        return {
          ...state,
          leftSeconds: state.leftSeconds - 1,
        }
      }
      return state
    case 'SET_TIME_MODAL_OPEN':
      return {
        ...state,
        timeModalOpen: action.timeModalOpen,
      }
    default:
      return state
  }
}

export default timer;