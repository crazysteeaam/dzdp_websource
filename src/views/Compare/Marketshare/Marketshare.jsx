import "./Marketshare.scss"
import {useMatch, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Table} from "antd";
import {compareApi} from "../../../api";

export const Marketshare = () => {

    const navigate = useNavigate();
    const match = useMatch('/compare/again');

    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 复购分析'
        }
    }, [match]);

    useEffect(() => {
        compareApi.getmarketshare().then(res => {
            console.log(res)
            setData(res.message)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const filters = Data?.merchants?.map((item) => {
        return {
            text: item.label,
            value: item.value,
        }
    })


    const data = Data?.heat_data?.map((item, index) => {
        return {
            key: index,
            name: item.name,
            value: item.value,
            percent: ((item.value / Data.total_heat)*100).toFixed(2)
        }
    })

    const columns = [
        {
            title: '商家名称',
            dataIndex: 'name',
            key: 'name',
            filters: filters,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value),
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: "30%"
        },
        {
            title: "市场份额",
            dataIndex: "value",
            sorter: (a, b) => a.value - b.value,
        },
        {
            title: "市场份额占比(%)",
            dataIndex: "percent",
            sorter: (a, b) => a.percent - b.percent,
        }
    ]

    const gotocompare = () => {
        navigate('/compare')
    }

    return (
        <>
            <div className="back" onClick={gotocompare}> &lt; 返回上一页</div>
            <div className="marketshare">市场份额分析</div>
            <div className="table">
                <Table
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                    scroll={{ y: 520 }}
                    loading={Loading}
                />
            </div>
        </>
    )
}