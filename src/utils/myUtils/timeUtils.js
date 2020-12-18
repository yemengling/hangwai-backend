import moment from 'moment';

// 开始结束日期
export const formatRangeDate = (fieldsValue) => {
    let beginDate = 0,
        endDate = 0
    ;

    if (fieldsValue.year && fieldsValue.year[0]) {
        beginDate = moment(fieldsValue.year[0]).valueOf();
        endDate = moment(fieldsValue.year[1]).valueOf();

        fieldsValue.beginDate = moment(beginDate).format("YYYY");
        fieldsValue.endDate = moment(endDate).format("YYYY");
    }
};