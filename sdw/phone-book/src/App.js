import React, { Component } from "react";
import PhoneInfoList from "./components/PhoneInfoList";
import PhoneForm from "./components/PhoneForm";
import "./App.css";
import styled, { css } from "styled-components";

const Main = styled.div`
  margin-top: 5rem;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding-top: 2rem;
  padding-bottom: 2rem;
  @media (max-width: 768px) {
    margin-top: 1rem;
    width: calc(100% - 2rem);
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 4rem;
  font-weight: 300;
  margin: 0;
  padding: 0 0 30px 0;
`;

const Search = styled.div`
  padding: 1rem;
  display: flex;
`;

const Input = styled.input`
  text-align: center;
  flex: 1; //부모 요소에서 add-button을 제외한 나머지 공간을 차지합니다.
  font-size: 1.1rem;
  outline: none;
  border: none;
  background: transparent;

  &:focus {
    border-bottom: 1px solid #4c6ef5;
  }
`;

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: "송동욱",
        phone: "01084897220"
      },
      {
        id: 1,
        name: "몽털",
        phone: "01012347220"
      }
    ],
    keyword: ""
  };
  handleChange = e => {
    this.setState({
      keyword: e.target.value
    });
  };
  handleCreate = data => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    });
  };
  handleRemove = id => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  };
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(info =>
        info.id === id ? { ...info, ...data } : info
      )
    });
  };
  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <Main className="App">
        <Title>전화번호부</Title>
        <PhoneForm onCreate={this.handleCreate} />
        <Search>
          <Input
            placeholder="검색할 이름을 입력하세요."
            onChange={this.handleChange}
            value={keyword}
          />
        </Search>
        <hr />
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </Main>
    );
  }
}

export default App;
