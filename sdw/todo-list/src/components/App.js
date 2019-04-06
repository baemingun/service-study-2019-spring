import React, { Component } from "react";
import PageTemplate from "./PageTemplate";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { toUnicode } from "punycode";

class App extends Component {
  state = {
    input: "",
    todos: [
      { id: 0, text: "리액트 공부하기", done: true },
      { id: 1, text: "컴포넌트 스타일링 해보기", done: false }
    ]
  };
  id = 1;
  getId = () => {
    return ++this.id;
  };

  handleRemove = id => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    this.setState({
      todos: [...todos.slice(0, index), ...todos.slice(index + 1, todos.length)]
    });
  };

  handleToggle = id => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    const toggled = {
      ...todos[index],
      done: !todos[index].done
    };

    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1, todos.length)
      ]
    });
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      input: value
    });
  };

  handleInsert = () => {
    const { todos, input } = this.state;
    const newTodo = {
      id: this.getId(),
      text: input,
      done: false
    };
    this.setState({
      todos: [...todos, newTodo],
      input: ""
    });
  };

  render() {
    const { handleChange, handleInsert, handleToggle, handleRemove } = this;
    const { input, todos } = this.state;
    return (
      <PageTemplate>
        <TodoInput
          onChange={handleChange}
          value={input}
          onInsert={handleInsert}
        />
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </PageTemplate>
    );
  }
}

export default App;
