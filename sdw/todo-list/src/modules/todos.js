import produce from "immer";
import { handleActions, createAction } from "redux-actions";

//액션 타입 정의
const INSERT = "todos/INSERT";
const TOGGLE = "todos/TOGGLE";
const REMOVE = "todos/REMOVE";

//액션 생성 함수 만들기
export const insert = createAction(INSERT);
export const toggle = createAction(TOGGLE);
export const remove = createAction(REMOVE);

const initialState = {
  todos: [
    { id: 0, text: "study react", done: true },
    { id: 1, text: "do component styling", done: false }
  ]
};

export default handleActions(
  {
    [INSERT]: (state, action) =>
      produce(state, draft => {
        console.log("HI");
        draft.todos.push({
          id: action.payload.id,
          text: action.payload.text,
          done: action.payload.done
        });
      }),
    [TOGGLE]: (state, action) =>
      produce(state, draft => {
        const item = draft.todos.find(item => item.id === action.payload);
        console.log(item.done);
        item.done = !item.done;
        console.log(item.done);
      }),

    [REMOVE]: (state, action) =>
      produce(state, draft => {
        draft.todos.splice(
          draft.todos.findIndex(todo => todo.id === action.payload),
          1
        );
        console.log("ZZZ");
      })
  },
  initialState
);
