import React from 'react';
import {
    Chart,
    LineAdvance
} from 'bizcharts';

const ShowTimelineView = (props) => {
    // 数据源
    const { data } = props;

    return (
        <React.Fragment>
            <h2>录取人数最高前10所小学</h2>
            <Chart autoFit padding={[10, 20, 50, 40]} height={300}
                data={data}
                scale={{
                    linear: {
                        min: 1
                    }
                }}
            >
                <LineAdvance
                    shape="smooth"
                    point
                    area
                    position="school*people"
                />
            </Chart>
        </React.Fragment>
    )
}

export default ShowTimelineView;