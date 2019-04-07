import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../lib/utils';
import produce from 'immer';

const CHANGE_COLOR = 'counter/CHANGE_COLOR';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

export const changeColor = createStandardAction(CHANGE_COLOR)<string>();
export const increment = createStandardAction(INCREMENT)();
export const decrement = createStandardAction(DECREMENT)();

type ChangeColor = ReturnType<typeof changeColor>;
type Increment = ReturnType<typeof increment>;
type Decrement = ReturnType<typeof decrement>;

export interface CounterState {
    color: string,
    number: number
};

const initialState: CounterState = {
    color: 'red',
    number: 0,
};

export default createReducer<CounterState>(
    {
        [CHANGE_COLOR]: (state, action: ChangeColor) => 
            produce(state, draft => {
                draft.color = action.payload
            }),
        [INCREMENT]: (state, action: Increment) => 
            produce(state, draft => {
                draft.number++;
            }),
        [DECREMENT]: (state, action: Decrement) => 
            produce(state, draft => {
                draft.number--;
            }),
    },
    initialState
);