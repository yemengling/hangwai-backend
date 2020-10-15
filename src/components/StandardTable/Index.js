import React, { Component } from 'react';
import { Table, Pagination } from 'antd';
import styles from './index.less';

class StandardTable extends Component {
    constructor(props) {
        super(props);
        // const { columns } = props;
        // const needTotalList = initTotalList(columns);

        // this.state = {
        //     selectedRowKeys: [],
        //     needTotalList,
        // };
    }

    onShowSizeChang = (current, pageSize) => {
        const { onShowSizeChange } = this.props;
        
        onShowSizeChange(current, pageSize);
        console.log(current, pageSize);
    }

    onChang = (pageNumber) => {
        const { onChange } = this.props;

        onChange(pageNumber);
        console.log('Page: ', pageNumber);
    }

    render() {
        const { scroll, rowKey, data, ...rest } = this.props;
        const { showSizeChanger, defaultCurrent, defaultPageSize, current, total } = this.props;

        return (
            <div className={styles.standardTable}>
                <Table
                    scroll={scroll && scroll}
                    rowKey={rowKey || 'key'}
                    dataSource={data}
                    pagination={false}
                    {...rest}
                />
                <div className={styles.pagination}>
                    <Pagination 
                        showQuickJumper
                        hideOnSinglePage={true}
                        showSizeChanger={showSizeChanger}
                        defaultCurrent={defaultCurrent ? defaultCurrent : 1}
                        defaultPageSize={defaultPageSize ? defaultPageSize : 10}
                        current={current ? current : 1}
                        total={total}
                        showTotal={total => `总共 ${total} 条记录`}
                        onChange={this.onChang}
                        onShowSizeChange={this.onShowSizeChang}
                    />
                </div>
            </div>
        );
    }
}

export default StandardTable;
