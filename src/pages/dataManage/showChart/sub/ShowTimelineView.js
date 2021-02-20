import React from 'react';
import { Chart, LineAdvance } from 'bizcharts';

const ShowTimelineView = (props) => {
  // 数据源
  const { title, type, data } = props;

  return (
    <React.Fragment>
      <div style={{ paddingBottom: '50px' }}>
        <h2>{title}</h2>
        <Chart
          autoFit
          padding={[10, 20, 60, 40]}
          height={300}
          data={data}
          scale={{
            people: {
              min: 0,
            },
            score: {
              min: 0,
            },
          }}
        >
          {type === '1' ? (
            <LineAdvance shape="smooth" point area position="school*people" />
          ) : (
            <LineAdvance shape="smooth" point area position="name*score" color="paper" />
          )}
        </Chart>
      </div>
    </React.Fragment>
  );
};

export default ShowTimelineView;
