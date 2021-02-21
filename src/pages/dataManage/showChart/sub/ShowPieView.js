import React from 'react';
import {
    DonutChart
} from 'bizcharts';

const ShowPieView = (props) => {
    // 数据源
    const { data } = props;

    return (
        <React.Fragment>
            <DonutChart
                height={380}
                data={data || []}
                title={{
                    visible: true,
                    text: "录取 / 未录取",
                }}
                forceFit
                radius={0.8}
                padding="auto"
                angleField="value"
                colorField="type"
                pieStyle={{ stroke: "white", lineWidth: 5 }}
            />
        </React.Fragment>
    )
}

export default ShowPieView;