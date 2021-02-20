import React from 'react';
import { Chart, LineAdvance } from 'bizcharts';

const ShowTimelineView = (props) => {
  // 数据源
  const { data } = props;

  return (
    <div style={{ background: '#fff', padding: '20px' }}>
      <h2>学生成绩变化</h2>
      <Chart
        autoFit
        padding={[10, 20, 60, 40]}
        height={300}
        data={data}
        scale={{
          score: {
            min: 0,
          },
        }}
      >
        <LineAdvance shape="smooth" point area position="name*score" color="paper" />
      </Chart>
    </div>
  );
};

export default ShowTimelineView;
