import { DatePicker, Input, Select } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

// DatePicker
export const getDatePicker = ({ picker }) => {
    return <DatePicker picker={picker} style={{width: '100%'}} />;
}

// RangePicker
export const getRangePicker = ({ picker }) => {
    return <RangePicker picker={picker} style={{width: '100%'}} />;
}

// Input
export const getInput = ({ placeholder }) => {
    return <Input placeholder={placeholder} />;
}

// Select
export const getSelect = ({ dataSelect, placeholder }) => {
    return (
        <Select placeholder={placeholder}>
            {dataSelect && dataSelect[0] && dataSelect.map((item, key) => {
                return (
                    <Option key={key} value={item.id}>
                        {item.text}
                    </Option>
                )
            })}
        </Select>
    )
}