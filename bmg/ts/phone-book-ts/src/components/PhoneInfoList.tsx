import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

export interface PhoneData {
    name: string,
    phone: string
}

export interface PhoneInfoData extends PhoneData {
    id: number
}

interface PhoneInfoListProps {
    data: Array<PhoneInfoData>,
    onRemove: (id: number) => any,
    onUpdate: (id: number, data: PhoneData) => any
}

class PhoneInfoList extends Component<PhoneInfoListProps,{}> {
    static defaultProps = {
        data: []
    }

    shouldComponentUpdate(nextProps: PhoneInfoListProps, nextState: any) {
        return nextProps.data !== this.props.data;
    }

    render() {
        const { data, onRemove, onUpdate } = this.props;
        const list = data.map(
            info => (
                <PhoneInfo 
                    key={info.id} 
                    info={info}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                />
            )
        );
        return (
            <div>
                {list}
            </div>
        );
    }
}

export default PhoneInfoList;