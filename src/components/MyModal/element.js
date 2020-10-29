import { Row, Col, Input, Checkbox, Select } from 'antd';

// Input
export const getInput = ({ placeholder, initialValue }) => {
    return <Input placeholder={placeholder} value={initialValue} />;
}

// Check.Group
export const getCheckboxGroup = ({ dataCheck, initialValue }) => {
    return (
        <Checkbox.Group value={initialValue}>
            <Row>
                {dataCheck && dataCheck[0] && dataCheck.map((item, key) => {
                    return (
                        <Col key={key}>
                            <Checkbox value={item.id}>
                                {item.text}
                            </Checkbox>
                        </Col>
                    )
                })}
            </Row>
        </Checkbox.Group>
    );
}

// Select
export const getSelect = ({ dataSelect, placeholder, initialValue }) => {
    return (
        <Select placeholder={placeholder} value={initialValue}>
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