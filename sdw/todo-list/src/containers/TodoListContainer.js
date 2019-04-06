import React, { Component } from "react";
import TodoList from "../components/TodoList";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as todosActions from "../modules/todos";
import { dispatch } from "rxjs/internal/observable/range";

class TodoListContainer extends Component {
  handleToggle = id => {
    const { TodosActions } = this.props;
    TodosActions.toggle(id);
    console.log(this.props.todos.todos[id].done);
  };
  handleRemove = id => {
    const { TodosActions } = this.props;
    console.log(this.props);
    console.log(id);
    TodosActions.remove(id);
    console.log("ADF");
  };

  render() {
    const { todos } = this.props;
    console.log(todos);
    const { handleToggle, handleRemove } = this;
    return (
      <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
    );
  }
}

export default connect(
  state => ({
    todos: state.todos
  }),
  dispatch => ({
    TodosActions: bindActionCreators(todosActions, dispatch)
  })
)(TodoListContainer);
