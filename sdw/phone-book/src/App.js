import React, { Component } from "react";
import PhoneInfoList from "./components/PhoneInfoList";
import PhoneForm from "./components/PhoneForm";
import "./App.css";

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
      <div className="App">
        <PhoneForm onCreate={this.handleCreate} />
        <p>
          <input
            placeholder="검색할이름을입력하세요"
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <hr />
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
