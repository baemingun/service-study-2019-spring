import React, { Component } from "react";

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
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="이름"
          onChange={this.handleChange}
          value={this.state.name}
          name="name"
        />
        <input
          placeholder="전번"
          onChange={this.handleChange}
          value={this.state.phone}
          name="phone"
        />
        <div>
          {this.state.name} {this.state.phone}
        </div>
        <button type="submit">등록</button>
      </form>
    );
  }
}

export default PhoneForm;
