import React, { Component } from "react";
import styled, { css } from "styled-components";

const Form = styled.form`
  display: flex;
  border-top: 1px solid #ced4da;

  justify-content: center;
  padding: 1rem;
`;
const Button = styled.button`
  width: 5rem;
  height: 2rem;
  margin-left: 1rem;
  border: 1px solid #0ca678;
  font-weight: 500;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #0ca678;
    color: white;
  }
  &:active {
    background: #099268;
  }
`;
const Input = styled.input`
  flex: 1; //부모 요소에서 add-button을 제외한 나머지 공간을 차지합니다.
  font-size: 1.1rem;
  outline: none;
  border: none;
  background: transparent;
  border-bottom: 1px solid #ced4da;
  &:focus {
    border-bottom: 1px solid #4c6ef5;
  }
`;

class PhoneForm extends Component {
  state = {
    name: "",
    phone: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
      name: "",
      phone: ""
    });
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          placeholder="이름"
          onChange={this.handleChange}
          value={this.state.name}
          name="name"
        />
        <Input
          placeholder="전번"
          onChange={this.handleChange}
          value={this.state.phone}
          name="phone"
        />

        <Button type="submit">등록</Button>
      </Form>
    );
  }
}

export default PhoneForm;
