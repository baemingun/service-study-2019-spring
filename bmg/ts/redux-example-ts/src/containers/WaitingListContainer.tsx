import React, { Component, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as waitingActions from '../modules/waiting';
import WaitingList from '../components/WaitingList';
import { StoreState } from '../modules';

interface WaitingListContainerProps extends waitingActions.WaitingState {
    WaitingActions: typeof waitingActions,
}

class WaitingListContainer extends Component<WaitingListContainerProps> {
    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { WaitingActions } = this.props;
        WaitingActions.changeInput(e.target.value);
    };
    handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { WaitingActions, input } = this.props;
        WaitingActions.create(input);
        WaitingActions.changeInput('');
    };
    handleEnter = (id: number) => {
        const { WaitingActions } = this.props;
        WaitingActions.enter(id);
    };
    handleLeave = (id: number)=> {
        const { WaitingActions } = this.props;
        WaitingActions.leave(id);
    };
    render() {
        const { input, list } = this.props;
        return (
            <WaitingList
                input={input}
                waitingList={list}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                onEnter={this.handleEnter}
                onLeave={this.handleLeave}
            />
        );
    }
}

const mapStateToProps = ({ waiting }: StoreState) => ({
    input: waiting.input,
    list: waiting.list,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    WaitingActions: bindActionCreators(waitingActions, dispatch),
    // AnotherActions: bindActionCreators(anotherActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WaitingListContainer);