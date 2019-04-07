import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement, CounterState } from '../modules/counter';
import { StoreState } from '../modules';

interface CounterContainerProps extends CounterState {
    increment: typeof increment,
    decrement: typeof decrement,
}

class CounterContainer extends Component<CounterContainerProps> {
    handleIncrement = () => {
        this.props.increment();
    };
    handleDecrement = () => {
        this.props.decrement();
    };
    render() {
        const { color, number } = this.props;
        return (
            <Counter
                color={color}
                value={number}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
            />
        );
    }
}

const mapStateToProps = ({ counter }: StoreState) => ({
    color: counter.color,
    number: counter.number,
});
  
const mapDispatchToProps = { increment, decrement };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CounterContainer);