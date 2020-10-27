import { DatePicker, Input } from 'antd';

// DatePicker
export const getDatePicker = ({ picker }) => {
    return <DatePicker picker={picker} style={{display: 'block'}} />;
}

// Input
export const getInput = ({ placeholder }) => {
    return <Input placeholder={placeholder} />;
}