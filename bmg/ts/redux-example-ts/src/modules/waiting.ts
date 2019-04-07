import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../lib/utils';
import produce from 'immer';

const CHANGE_INPUT = 'waiting/CHANGE_INPUT';
const CREATE = 'waiting/CREATE';
const ENTER = 'waiting/ENTER';
const LEAVE = 'waiting/LEAVE';

let id = 3;

export const changeInput = createStandardAction(CHANGE_INPUT)<string>();
export const create = createStandardAction(CREATE)
    .map((payload: string) => ({
        payload: {
            text: payload,
            id: id++,
        }
    })
);
export const enter = createStandardAction(ENTER)<number>();
export const leave = createStandardAction(LEAVE)<number>();

type ChangeInput = ReturnType<typeof changeInput>;
type Create = ReturnType<typeof create>;
type Enter = ReturnType<typeof enter>;
type Leave = ReturnType<typeof leave>;

export interface WaitingListItem {
    id: number,
    name: string,
    entered: boolean
}

export interface WaitingState {
    input: string,
    list: Array<WaitingListItem>
};

const initialState: WaitingState = {
    input: '',
    list: [
        {
            id: 0,
            name: '홍길동',
            entered: true,
        },
        {
            id: 1,
            name: '콩쥐',
            entered: false,
        },
        {
            id: 2,
            name: '팥쥐',
            entered: false,
        },
    ],
};

export default createReducer<WaitingState>(
    {
        [CHANGE_INPUT]: (state, action: ChangeInput) => 
            produce(state, draft => {
                draft.input = action.payload;
            }),
        [CREATE]: (state, action: Create) => 
            produce(state, draft => {
                draft.list.push({
                    id: action.payload.id,
                    name: action.payload.text,
                    entered: false,
                });
            }),
        [ENTER]: (state, action: Enter) => 
            produce(state, draft => {
                const item = draft.list.find(item => item.id === action.payload);
                if(item !== undefined) item.entered = !item.entered;
            }),
        [LEAVE]: (state, action: Leave) => 
            produce(state, draft => {
                draft.list.splice(
                    draft.list.findIndex(item => item.id === action.payload),
                    1
                );
            }),
    },
    initialState
);