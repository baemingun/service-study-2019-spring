import React, { Component, ChangeEvent, FormEvent } from 'react';
import { PhoneData } from './PhoneInfoList';

interface PhoneFormProps {
    onCreate: (data: PhoneData) => any
}

class PhoneForm extends Component<PhoneFormProps,PhoneData> {
    state = {
        name: '',
        phone: ''
    }
    private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    private handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onCreate(this.state);
        this.setState({
            name: '',
            phone: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="이름"
                        value={this.state.name}
                        onChange={this.handleChange}
                        name="name"
                    />
                    <input
                        placeholder="전화번호"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        name="phone"
                    />
                    <button type="submit">등록</button>
                </form>
            </div>
        );
    }
}

export default PhoneForm;