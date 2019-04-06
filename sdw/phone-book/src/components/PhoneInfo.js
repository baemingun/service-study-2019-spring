import React, { Component } from "react";
import styled, { css } from "styled-components";

const InfoBox = styled.div`
  display: flex;
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
  ${props =>
    props.delete &&
    css`
      border: 1px solid #fa5252;
      &:hover {
        background: #fa5252;
        color: white;
      }
      &:active {
        background: #f03e3e;
      }
    `}
`;
const Input = styled.input`
  text-align: center;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
`;
const Text = styled.div`
  flex: 1; //부모 요소에서 add-button을 제외한 나머지 공간을 차지합니다.
  font-size: 1.1rem;
  outline: none;
  border: none;
  background: transparent;
  border-bottom: 1px solid #000000;
  display: flex;
  jutify-content: center;
  align-items: center;
  ${props =>
    props.phone &&
    css`
      border-bottom: 1px solid #868e96;
    `}
`;

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: "이름",
      phone: "010-0000-0000",
      id: 0
    }
  };

  state = {
    editing: false,
    name: "",
    phone: ""
  };

  handleToggleEdit = () => {
    const { editing } = this.state;
    console.log("AASS");
    this.setState({ editing: !editing });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !this.state.editing &&
      !nextState.editing &&
      nextProps.info === this.props.info
    ) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("CCCC");
    const { info, onUpdate } = this.props;
    if (!prevState.editing && this.state.editing) {
      console.log("BBBB");
      this.setState({
        name: info.name,
        phone: info.phone
      });
    }

    if (prevState.editing && !this.state.editing) {
      console.log("AAAA");
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }

  render() {
    const { editing } = this.state;

    if (editing) {
      return (
        <InfoBox>
          <Text>
            <Input
              value={this.state.name}
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </Text>
          <Text phone>
            <Input
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </Text>
          <Button onClick={this.handleToggleEdit}>적용</Button>
          <Button delete onClick={this.handleRemove}>
            삭제
          </Button>
        </InfoBox>
      );
    }
    const { name, phone } = this.props.info;
    return (
      <InfoBox>
        <Text>{name}</Text>
        <Text phone>{phone}</Text>
        <Button onClick={this.handleToggleEdit}>수정</Button>
        <Button delete onClick={this.handleRemove}>
          삭제
        </Button>
      </InfoBox>
    );
  }
}

export default PhoneInfo;
