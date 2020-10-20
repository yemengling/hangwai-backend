import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import {
    onChangePage,
    onChangePageSize
} from '@/utils/myUtils/commonUtils';
import StandardTable from '@/components/StandardTable';
import { useLocation } from "umi";

// 字段名称
export const scoreDetailFieldName = {
    paper: '试卷名',
    part1: '第一部分',
    part2: '第二部分',
    part3: '第三部分',
    part4: '第四部分'
};

// modelsname
const modelsName = 'scoreDetail';

const ScoreDetail = (props) => {
    const {
        scoreDetail: { isSearch, pagination, data },
        loading,
        dispatch
    } = props;

    // 地址栏
    const location = useLocation();

    // columns
    const columns = [
        {
            title: scoreDetailFieldName['paper'],
            dataIndex: 'paper',
            key: 'paper',
        },
        {
            title: scoreDetailFieldName['part1'],
            dataIndex: 'part1',
            key: 'part1',
        },
        {
            title: scoreDetailFieldName['part2'],
            dataIndex: 'part2',
            key: 'part2',
        },
        {
            title: scoreDetailFieldName['part3'],
            dataIndex: 'part3',
            key: 'part3',
        },
        {
            title: scoreDetailFieldName['part4'],
            dataIndex: 'part4',
            key: 'part4',
        }
    ];


    // 分页页码
    const onChang = (pageNumber) => {
        const paginationMethodStr = `${modelsName}/savePagination`;
        onChangePage({
            isSearch,
            pageNumber,
            pagination,
            paginationMethodStr,
            dispatch,
            method: getCurrentList,
        });
    };

    // 分页条数
    const onShowSizeChange = (current, pageSize) => {
        onChangePageSize({
            isSearch,
            current,
            pageSize,
            pagination,
            paginationMethodStr: `${modelsName}/savePagination`,
            dispatch,
            method: getCurrentList,
        });
    };

    // 获取数据, 收到的数据, 写到listData中，就是modal中的fetch函数
    const getCurrentList = (params) => {
        dispatch({
            type: `${modelsName}/getScoreDetail`,
            payload: {
                ...params
            },
        }).then((res) => {
            console.log('res___', res);
        });
    };

    // didMount
    useEffect(() => {
        dispatch({
            type: `${modelsName}/clearAll`
        });

        getCurrentList({
            id: location.query.id,
            pageIndex: 1,
            pageSize: pagination.currentPageSize,
            totalCount: pagination.currentPageSize
        });

        dispatch({
            type: `${modelsName}/savePagination`,
            payload: {
                ...pagination,
                current: 1
            },
        });
    }, []);

    return (
        <React.Fragment>
            <StandardTable
                rowKey="paper"
                loading={loading}
                columns={columns}
                dataSource={data && data.data}
                showSizeChanger={pagination.showSizeChanger}
                defaultCurrent={pagination.currentPageIndex}
                defaultPageSize={pagination.currentPageSize}
                current={pagination.current}
                total={data && data.totalCount}
                onChange={onChang}
                onShowSizeChange={onShowSizeChange}
            />
        </React.Fragment>
    );
};

export default connect(({ scoreDetail, loading }) => ({
    scoreDetail,
    loading: loading.models.scoreDetail
}))(ScoreDetail);