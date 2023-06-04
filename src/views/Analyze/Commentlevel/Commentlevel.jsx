import "./Commentlevel.scss"
import {useLocation, useMatch, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Table} from "antd";

export const Commentlevel = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const match = useMatch('/analyze/commentlevel');

    // 如果state为空，跳转到/compare路由
    if (!state) {
        navigate('/analyze')
    }

     useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 评论分级'
        }
    }, [match]);

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const gotoanalyze = () => {
        navigate('/analyze')
    }

    const data = state?.Datalist?.comment_level_all.map((item) => {
        return {
            name: item.name,
            high: item.好评,
            middle: item.中评,
            low: item.差评,
            high_rate: ((item.好评/(item.好评+item.中评+item.差评))*100).toFixed(2),
            middle_rate: ((item.中评/(item.好评+item.中评+item.差评))*100).toFixed(2),
            low_rate: ((item.差评/(item.好评+item.中评+item.差评))*100).toFixed(2),
        }
    })

    const filters = state?.Merchantlist?.map((item) => {
        return {
            text: item.label,
            value: item.value,
        }
    })

    const columns = [
        {
            title: '餐厅名称',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            filters: filters,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value),
            width: '40%',
        },
        {
            title: '好评数量',
            dataIndex: 'high',
            sorter: (a, b) => a.high - b.high,
        },
        {
            title: '中评数量',
            dataIndex: 'middle',
            sorter: (a, b) => a.middle - b.middle,
        },
        {
            title: '差评数量',
            dataIndex: 'low',
            sorter: (a, b) => a.low - b.low,
        },
        {
            title: '好评率(%)',
            dataIndex: 'high_rate',
            sorter: (a, b) => a.high_rate - b.high_rate,
        },
        {
            title: '中评率(%)',
            dataIndex: 'middle_rate',
            sorter: (a, b) => a.middle_rate - b.middle_rate,
        },
        {
            title: '差评率(%)',
            dataIndex: 'low_rate',
            sorter: (a, b) => a.low_rate - b.low_rate,
        }
        ]


    return (
        <>
            <div className="back" onClick={gotoanalyze}> &lt; 返回上一页</div>
            <div className="commentlevel">评论分级分析</div>
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