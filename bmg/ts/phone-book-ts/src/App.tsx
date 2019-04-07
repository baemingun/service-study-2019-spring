import React, { Component, ChangeEvent } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList, { PhoneData, PhoneInfoData } from './components/PhoneInfoList';

interface State {
  information: Array<PhoneInfoData>,
  keyword: string
}

class App extends Component<{},State> {
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: '김민준',
        phone: '010-0000-0000'
      },
      {
        id: 1,
          name: '홍길동',
          phone: '010-0000-0001'
      }
    ],
    keyword: ''
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      keyword: e.target.value,
    });
  }

  private handleCreate = (data: PhoneData) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({id: this.id++, ...data})
    });
  }

  private handleRemove = (id: number) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  private handleUpdate = (id: number, data: PhoneData) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
          ? { ...info, ...data }
          : info
      )
    })
  }

  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm 
          onCreate = {this.handleCreate}
        />
        <p>
          <input 
            placeholder="검색 할 이름을 입력하세요.." 
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
