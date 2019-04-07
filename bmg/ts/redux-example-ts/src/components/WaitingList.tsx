import React, { SFC, ChangeEvent, FormEvent } from 'react';
import './WaitingList.scss';
import { WaitingListItem } from '../modules/waiting';

interface WaitingItemProps {
  key: number,
  text: string,
  entered: boolean,
  id: number,
  onEnter: () => void,
  onLeave: () => void,
}

interface WaitingListProps {
  input: string,
  waitingList: Array<WaitingListItem>,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSubmit: (e: FormEvent<HTMLFormElement>) => void,
  onEnter: (id: number) => void,
  onLeave: (id: number) => void
}

const WaitingItem: SFC<WaitingItemProps> = ({ 
  text, 
  entered, 
  onEnter, 
  onLeave 
}) => {
  return (
    <li>
      <div className={`text ${entered ? 'entered' : ''}`}>{text}</div>
      <div className="buttons">
        <button onClick={onEnter}>입장</button>
        <button onClick={onLeave}>나감</button>
      </div>
    </li>
  );
};

const WaitingList: SFC<WaitingListProps> = ({ 
  input,
  waitingList, 
  onChange,
  onSubmit,
  onEnter, 
  onLeave 
}) => {
  const waitingItems = waitingList.map((w: WaitingListItem) => (
    <WaitingItem
      key={w.id}
      text={w.name}
      entered={w.entered}
      id={w.id}
      onEnter={() => onEnter(w.id)}
      onLeave={() => onLeave(w.id)}
    />
  ));
  return (
    <div className="WaitingList">
      <h2>대기자 명단</h2>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} />
        <button>등록</button>
      </form>
      <ul>{waitingItems}</ul>
    </div>
  );
};

export default WaitingList;