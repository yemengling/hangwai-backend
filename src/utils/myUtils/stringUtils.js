// 拼接一个url
export const buildUrl = ({ url, valueArr, value }) => {
    let flag = false;

    valueArr && valueArr.length > 0 && valueArr.map((item, key) => {
        if (getValueByKey(value, item) !== undefined && getValueByKey(value, item) !== '') {
            if (flag) {
                url = url + `&${item}=${getValueByKey(value, item)}`;
            } else {
                url = url + `${item}=${getValueByKey(value, item)}`;
                flag = true;
            }
        }
    })

    return url;
};

// 通过key找value
export function getValueByKey(data, field) {
    for (let key in data) {
        if (key === field) {
            return data[key];
        }
        
        if (typeof (data[key]) === 'object' && data[key].length === undefined) {
            return getValueByKey(data[key], textField);
        }
    }
};