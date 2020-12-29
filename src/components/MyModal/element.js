import { Row, Col, Input, Checkbox, Select, TreeSelect } from 'antd';
const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

// Input
export const getInput = ({ type, placeholder, initialValue }) => {
    return <Input type={type ? type : 'text'} placeholder={placeholder} value={initialValue} />;
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

// TreeSelect 
export const getTreeSelect = ({ dataTree, placeholder, initialValue }) => {
    // state = {
    //     value: initialValue,
    // };

    // const onChange = value => {
    //     this.setState({ value });
    // }

    return (
        <TreeSelect
            treeData={dataTree}
            value={initialValue}
            treeCheckable={true}
            showCheckedStrategy={SHOW_PARENT}
            placeholder={placeholder}
        />
    )
}