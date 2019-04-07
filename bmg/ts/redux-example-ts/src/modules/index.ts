import { combineReducers } from 'redux';
import counter, { CounterState } from './counter';
import waiting, { WaitingState } from './waiting';

export interface StoreState {
  counter: CounterState,
  waiting: WaitingState,
}

export default combineReducers({
  counter,
  waiting,
});