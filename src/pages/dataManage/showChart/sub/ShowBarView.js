import React from 'react';
import {
    Chart,
    Interval
} from 'bizcharts';

const ShowPieView = (props) => {
    // 数据源
    const { data } = props;

    return (
        <React.Fragment>
            <h2>录取学生占比（按城区）</h2>
            <Chart autoFit padding={[10, 20, 50, 40]} height={300} data={data || []} >
                <Interval position="city*people" />
            </Chart>
        </React.Fragment>
    )
}

export default ShowPieView;