import React, { Component } from 'react';
import { connect } from 'react-redux';
import Palette from '../components/Palette';
import { changeColor } from '../modules/counter';
import { StoreState } from '../modules';
import { Dispatch } from 'redux';

interface PaletteContainerProps {
    changeColor: typeof changeColor,
    color: string,
}

class PaletteContainer extends Component<PaletteContainerProps> {
    handleSelect = (color: string) => {
        const { changeColor } = this.props;
        changeColor(color);
    };
    render() {
        const { color } = this.props;
        return <Palette onSelect={this.handleSelect} selected={color} />;
    }
}

const mapStateToProps = (state: StoreState) => ({
    color: state.counter.color,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeColor: (color: string) => dispatch(changeColor(color)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaletteContainer);