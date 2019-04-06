import produce from "immer";
import { handleActions, createAction } from "redux-actions";

//필요한 액션 타입 정의하기
const SET_INPUT = "input/SET_INPUT"; //문자열 앞부분에 리듀서 이름 적기

//createAction 이용하여 액션 생성 함수 만들기
export const setInput = createAction(SET_INPUT);

//리듀서의 초기 상태 선언하기
const initialState = {
  value: ""
};
//리듀서를 만들기 handleActions를 사용하여 만듦
export default handleActions(
  {
    [SET_INPUT]: (state, action) =>
      produce(state, draft => {
        draft.value = action.payload;
      })
  },
  initialState
);
