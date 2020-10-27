import { Input } from 'antd';

// Input
export const getInput = ({ placeholder, initialValue }) => {
    return <Input placeholder={placeholder} value={initialValue} />;
}