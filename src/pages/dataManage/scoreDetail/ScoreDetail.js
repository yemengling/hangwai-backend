import React, { useEffect, useState } from 'react';
import { PageHeader, Tabs } from 'antd';
import { connect } from 'dva';
import {
    onChangePage,
    onChangePageSize
} from '@/utils/myUtils/commonUtils';
import { useLocation } from "umi";
import StandardTable from '@/components/StandardTable';
import ShowTimelineView from "@/pages/dataManage/scoreDetail/sub/ShowTimelineView";

// 字段名称
export const scoreDetailFieldName = {
    id: 'ID',
    paper: '试卷名',
    part1: '第一部分',
    part2: '第二部分',
    part3: '第三部分',
    part4: '第四部分'
};

// modelsname
const modelsName = 'scoreDetail';

const ScoreDetail = (props) => {
    const { TabPane } = Tabs;
    const {
        scoreDetail: { isSearch, pagination, data },
        loading,
        dispatch
    } = props;

    // 地址栏
    const location = useLocation();

    // state
    const [timelineData, setTimelineData] = useState([]);

    // columns
    const columns = [
        {
            title: scoreDetailFieldName['id'],
            dataIndex: 'id',
            key: 'id',
        },
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


    // tab切换
    const changeTab = (key) => {}

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
            }
        });

        dispatch({
            type: `${modelsName}/getTimelineData`,
            payload: {
                studentId: location.query.id
            }
        }).then((res) => {
            setTimelineData(res.r);
            console.log('res___', res);
        });
    }, []);

    return (
        <React.Fragment>
            <PageHeader
                style={{
                    padding: '0 0 15px 0'
                }}
                onBack={() => window.history.back()}
                title="返回"
            />

            <Tabs defaultActiveKey="1" type="card" onChange={changeTab}>
                <TabPane tab="列表" key="list">
                    <StandardTable
                        rowKey="id"
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
                </TabPane>

                <TabPane tab="折线图" key="timeline">
                    <ShowTimelineView data={timelineData} />
                </TabPane>
            </Tabs>
        </React.Fragment>
    );
};

export default connect(({ scoreDetail, loading }) => ({
    scoreDetail,
    loading: loading.models.scoreDetail
}))(ScoreDetail);