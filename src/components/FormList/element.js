import { Form, Input, DatePicker, Select, Radio } from 'antd';
const { Option } = Select;

// Input
export const getInput = ({ placeholder }) => {
    return <Input placeholder={placeholder} />
}

// DatePicker
export const getDatePicker = ({ picker, placeholder }) => {
    return <DatePicker style={{ display: 'block' }} picker={picker} placeholder={placeholder} />;
}

// Select
export const getSelect = ({ styles, dataSelect, placeholder, ..._props }) => {
    return (
        <Select key={_props.key} placeholder={placeholder} style={{ ...styles }}>
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

// Radio
export const getRadio = ({ dataRadio, name }) => {
    return (
        <Radio.Group name={name}>
            {dataRadio && dataRadio[0] && dataRadio.map((item, key) => {
                return (
                    <Radio key={key} value={item.id}>{item.text}</Radio>
                )
            })}
        </Radio.Group>
    )
}

// 多类型
export const getMultitype = ({ formData }) => {
    let formDom = [];

    if (formData.length > 0) {
        formData.map((item, key) => {
            if (item.eleName === 'Select') {
                formDom.push(
                    <Form.Item key={key} name={item.name} rules={item.rules}>
                        {getSelect({
                            key,
                            ...item
                        })}
                    </Form.Item>
                );
            }
        })
    }

    return formDom;
}