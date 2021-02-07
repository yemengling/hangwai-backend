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
        showChart: {},
        loading,
        dispatch
    } = props;

    // state
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [timelineData1, setTimelineData1] = useState([]);
    const [timelineData2, setTimelineData2] = useState([]);
    const [timelineData3, setTimelineData3] = useState([]);


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
            setPieData(res.r);
            console.log('res___', res);
        });
    };

    // 获取柱状图
    const getBarData = () => {
        dispatch({
            type: `${modelsName}/getBarData`
        }).then((res) => {
            setBarData(res.r);
            console.log('res___', res);
        });
    };

    // 获取折线图
    const getTimelineData = () => {
        dispatch({
            type: `${modelsName}/getTimelineData1`
        }).then((res) => {
            setTimelineData1(res.r);
            console.log('res___', res);
        });

        dispatch({
            type: `${modelsName}/getTimelineData2`
        }).then((res) => {
            var oData = [
                {
                    name: '第一部分',
                    score: 4,
                    paper: '试卷一'
                },
                {
                    name: '第二部分',
                    score: 12,
                    paper: '试卷一'
                },
                {
                    name: '第三部分',
                    score: 12,
                    paper: '试卷一'
                },
                {
                    name: '第四部分',
                    score: 22,
                    paper: '试卷一'
                },
                {
                    name: '第一部分',
                    score: 13,
                    paper: '试卷二'
                },
                {
                    name: '第二部分',
                    score: 24,
                    paper: '试卷二'
                },
                {
                    name: '第三部分',
                    score: 10,
                    paper: '试卷二'
                },
                {
                    name: '第四部分',
                    score: 34,
                    paper: '试卷二'
                }
            ];

            setTimelineData2(oData);
            console.log('res___', res);
        });

        dispatch({
            type: `${modelsName}/getTimelineData3`
        }).then((res) => {
            var oData = [
                {
                    name: '第一部分',
                    score: 4,
                    paper: '试卷一'
                },
                {
                    name: '第二部分',
                    score: 12,
                    paper: '试卷一'
                },
                {
                    name: '第三部分',
                    score: 12,
                    paper: '试卷一'
                },
                {
                    name: '第四部分',
                    score: 22,
                    paper: '试卷一'
                },
                {
                    name: '第一部分',
                    score: 13,
                    paper: '试卷二'
                },
                {
                    name: '第二部分',
                    score: 24,
                    paper: '试卷二'
                },
                {
                    name: '第三部分',
                    score: 10,
                    paper: '试卷二'
                },
                {
                    name: '第四部分',
                    score: 34,
                    paper: '试卷二'
                }
            ];

            setTimelineData3(oData);
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
                    <ShowTimelineView title="录取人数最高前10所小学" type="1" data={timelineData1} />
                    <ShowTimelineView title="录取学生成绩变化" type="2" data={timelineData2} />
                    <ShowTimelineView title="总生成绩变化" type="2" data={timelineData3} />
                </TabPane>
            </Tabs>
        </React.Fragment>
    )
}

export default connect(({ showChart, loading }) => ({
    showChart,
    loading: loading.models.showChart
}))(ShowChart);