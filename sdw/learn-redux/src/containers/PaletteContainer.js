import React, { Component } from 'react';
import { connect } from 'react-redux';
import Palette from '../components/Palette';
import { changeColor } from '../store/modules/counter';

class PaletteContainer extends Component {
  handleSelect = color => {
    const { changeColor } = this.props;
    console.log(`what ${color}`);
    changeColor(color);
  };
  render() {
    const { color } = this.props;
    return <Palette onSelect={this.handleSelect} selecte={color} />;
  }
}

//props로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
  color: state.counter.color,
});

//액션생성함수는 호출하면 액션 객체를 생성함.
//이 액션 객체를 스토어에게 전달해주어야 상태에 변화가 발생
//color를 파라미터로 받아와서 그 값을 가지고 CHANGE_COLOR 액션 객체를 생성한 다음에
//스토어에게 디스패치 하는 함수를 컴퓨넌트의 props로 전당해 준다.
const mapDispatchToProps = dispatch => ({
  changeColor: color => dispatch(changeColor(color)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaletteContainer);
