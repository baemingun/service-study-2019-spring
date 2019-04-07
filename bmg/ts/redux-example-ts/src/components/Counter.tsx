import React, { SFC } from 'react';
import './Counter.scss';

interface CounterProps {
    value: number,
    color: string,
    onIncrement: () => void,
    onDecrement: () => void
}

const Counter: SFC<CounterProps> = ({ 
    value, 
    color, 
    onIncrement, 
    onDecrement 
}) => {
  return (
    <div className="Counter">
      <h1 style={{ color }}>{value}</h1>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  );
};

export default Counter;