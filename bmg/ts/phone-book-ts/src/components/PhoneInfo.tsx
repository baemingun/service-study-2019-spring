import React, { Component, ChangeEvent } from 'react';
import { PhoneData, PhoneInfoData } from './PhoneInfoList';

interface PhoneInfoProps {
    info: PhoneInfoData,
    onRemove: (id: number) => any,
    onUpdate: (id: number, data: PhoneData) => any
}

interface PhoneInfoState {
    editing: boolean,
    name: string,
    phone: string
}

class PhoneInfo extends Component<PhoneInfoProps,PhoneInfoState> {
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0
        }
    }

    state = {
        editing: false,
        name: '',
        phone: '',
    }

    private handleRemove = () => {
        const { info, onRemove, onUpdate } = this.props;
        onRemove(info.id);
    }

    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing });
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    shouldComponentUpdate(nextProps: PhoneInfoProps, nextState: PhoneInfoState) {
        if (!this.state.editing  
            && !nextState.editing
            && nextProps.info === this.props.info) {
            return false;
        }
        return true;
    }

    componentDidUpdate(prevProps: PhoneInfoProps, prevState: PhoneInfoState) {
        const { info, onUpdate } = this.props;
        if(!prevState.editing && this.state.editing) {
          this.setState({
            name: info.name,
            phone: info.phone
          })
        }
    
        if (prevState.editing && !this.state.editing) {
          onUpdate(info.id, {
            name: this.state.name,
            phone: this.state.phone
          });
        }
    }

    render() {
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        };
        
        const { editing } = this.state;

        
        if (editing) {
            return (
                <div style={style}>
                <div>
                    <input
                    value={this.state.name}
                    name="name"
                    placeholder="이름"
                    onChange={this.handleChange}
                    />
                </div>
                <div>
                    <input
                    value={this.state.phone}
                    name="phone"
                    placeholder="전화번호"
                    onChange={this.handleChange}
                    />
                </div>
                <button onClick={this.handleToggleEdit}>적용</button>
                <button onClick={this.handleRemove}>삭제</button>
                </div>
            );
        } else {
            const {
                name, phone
            } = this.props.info;
            return (
                <div style={style}>
                    <div><b>{name}</b></div>
                    <div>{phone}</div>
                    <button onClick={this.handleToggleEdit}>수정</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            );
        }
    }
}

export default PhoneInfo;