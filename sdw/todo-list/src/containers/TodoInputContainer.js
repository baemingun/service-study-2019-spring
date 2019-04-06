import React, { Component } from "react";
import TodoInput from "../components/TodoInput";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as inputActions from "../modules/input";
import * as todosActions from "../modules/todos";

//먼저 store의 상태와 액션 생성 함수들을 연결시킴
class TodoInputContainer extends Component {
  id = 1;
  getId = () => {
    return ++this.id;
  };

  handleChange = e => {
    const { value } = e.target;
    const { InputActions } = this.props;

    InputActions.setInput(value);
    console.log(this.props);
    // this.setState({
    //   input: value
    // });
  };

  handleInsert = () => {
    const { InputActions, TodosActions, value } = this.props;
    const todo = {
      id: this.getId(),
      text: value,
      done: false
    };
    console.log("clicked!", todo);
    // console.log(this.props.TodoActions.insert);
    // console.log(this.props.InputActions.setInput);
    TodosActions.insert(todo);
    InputActions.setInput("");
  };
  render() {
    const { value } = this.props;
    const { handleChange, handleInsert } = this;
    return (
      <TodoInput
        onChange={handleChange}
        onInsert={handleInsert}
        value={value}
      />
    );
  }
}

export default connect(
  state => ({
    value: state.input.value
  }),
  dispatch => ({
    InputActions: bindActionCreators(inputActions, dispatch),
    TodosActions: bindActionCreators(todosActions, dispatch)
  })
)(TodoInputContainer);
