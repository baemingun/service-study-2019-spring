import { createAction, handleActions } from 'redux-actions';

const CHANGE_INPUT = 'waiting/CHANGE_INPUT';
const CREATE = 'waiting/CREATE';
const ENTER = 'waiting/ENTER';
const LEAVE = 'waiting/LEAVE';

//각 액션들마다 필요로 하는 파라미터 값들이 다름.
//문자열 or id

let id = 3;
//액션 생성함수만들기
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ }));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);

const initialState = {
  input: '',
  list: [
    { id: 0, name: '홍길동', entered: true },
    { id: 1, name: 'KONG', entered: false },
    { id: 2, name: 'POT', entered: false },
  ],
};

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload,
    }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.text,
        entered: false,
      }),
    }),
    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map(item =>
        item.id === action.payload ? { ...item, entered: !item.entered } : item
      ),
    }),
    [LEAVE]: (state, action) => ({
      ...state,
      list: state.list.filter(item => item.id !== action.payload),
    }),
  },
  initialState
);
