import { User } from '@/services/fetchUserData';

export interface IState {
  userList: User[],
  targetUser: User | null,
};

const initialState: IState = {
  userList: [],
  targetUser: null,
};

const user = (state = initialState, action: {
  type: string;
  userList: User[];
  targetUserId: number;
}) => {
    switch (action.type) {
      case 'SET_USER_LIST':
        return {
          ...state,
          userList: action.userList,
        }
      case 'SET_TARGET_USER':
        return {
          ...state,
          targetUser: state.userList[action.targetUserId] ?? null,
        }
      case 'RESET_TARGET_USER':
        return {
          ...state,
          targetUser: null
        }
      default:
        return state
    }
  }
  
  export default user;