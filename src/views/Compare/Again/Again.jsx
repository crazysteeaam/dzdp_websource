import './Again.scss'
import {useMatch, useNavigate, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {Table} from "antd";


export const Again = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const match = useMatch('/compare/again');

    // 如果state为空，跳转到/compare路由
    if (!state) {
        navigate('/compare')
    }


    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 复购分析'
        }
    }, [match]);

    const gotocompare = () => {
        navigate('/compare')
    }

    const filters = state.Data?.map((item) => {
        return {
            text: item.name,
            value: item.name,
        }
    })

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const columns = [
        {
            title: '餐厅名称',
            dataIndex: 'name',
            filters: filters,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value),
            // 按照餐厅名称排序
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: '30%',
        },
        {
            title: '获客数',
            dataIndex: '获客数',
            sorter: (a, b) => a.获客数 - b.获客数,
        },
        {
            title: '回头客数量',
            dataIndex: '回头客数量',
            sorter: (a, b) => a.回头客数量 - b.回头客数量,
        },

        {
            title: '回头客比例（%）',
            dataIndex: '回头客比例',
            sorter: (a, b) => a.回头客比例 - b.回头客比例,
        }
    ];
    const data = state.Data?.map((item) => {
        return {
            name: item.name,
            获客数: item.获客数,
            回头客数量: item.回头客数量,
            回头客比例: item.回头客比例,
        }
    }
    )

    return (
        <>
            <div className="back" onClick={gotocompare}> &lt; 返回上一页</div>
            <div className="again">回头客分析</div>
            <div className="table">
                <Table
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                    scroll={{ y: 520 }}
                />
            </div>
        </>
    )
}