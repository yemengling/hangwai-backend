import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import ShowPieView from "@/pages/dataManage/showChart/sub/ShowPieView";
import ShowBarView from "@/pages/dataManage/showChart/sub/ShowBarView";
import ShowTimelineView from "@/pages/dataManage/showChart/sub/ShowTimelineView";

// modelsname
const modelsName = 'showChart';

const ShowChart = (props) => {
    const { TabPane } = Tabs;
    const {
        showChart: { },
        loading,
        dispatch
    } = props;

    // state
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [timelineData, setTimelineData] = useState([]);


    const changeTab = (key) => {
        if (key === 'pie') {
            getPieData();
        } else if (key === 'bar') {
            getBarData();
        } else if (key === 'timeline') {
            getTimelineData();
        }
    }

    // 获取饼状图
    const getPieData = () => {
        dispatch({
            type: `${modelsName}/getPieData`
        }).then((res) => {
            setPieData(res.data);
            console.log('res___', res);
        });
    };

    // 获取柱状图
    const getBarData = () => {
        dispatch({
            type: `${modelsName}/getBarData`
        }).then((res) => {
            setBarData(res.data);
            console.log('res___', res);
        });
    };

    // 获取折线图
    const getTimelineData = () => {
        dispatch({
            type: `${modelsName}/getTimelineData`
        }).then((res) => {
            setTimelineData(res.data);
            console.log('res___', res);
        });
    };

    // didMount
    useEffect(() => {
        getPieData();
    }, []);

    return (
        <React.Fragment>
            <Tabs defaultActiveKey="1" style={{ "background": "#fff", "padding": "0 20px" }} onChange={changeTab}>
                <TabPane tab="饼状图" key="pie">
                    <ShowPieView data={pieData} />
                </TabPane>

                <TabPane tab="柱状图" key="bar">
                    <ShowBarView data={barData} />
                </TabPane>

                <TabPane tab="折线图" key="timeline">
                    <ShowTimelineView data={timelineData} />
                </TabPane>
            </Tabs>
        </React.Fragment>
    )
}

export default connect(({ showChart, loading }) => ({
    showChart,
    loading: loading.models.showChart
}))(ShowChart);