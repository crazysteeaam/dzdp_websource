import "./Topdishes.scss"
import {useLocation, useMatch, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Table} from "antd";

export const Topdishes = () => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const match = useMatch('/analyze/topdishes');

    console.log(state?.Datalist?.data_dish_all)

    // 如果state为空，跳转到/compare路由
    if (!state.Datalist) {
        navigate('/analyze')
    }

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 热门菜品'
        }
    }, [match]);

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const gotoanalyze = () => {
        navigate('/analyze')
    }

    const data = state?.Datalist?.data_dish_all.map((item) => {
        return {
            name: item.name,
            count: item.value
        }
    })

    const columns = [
        {
            title: '菜品名称',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: '70%',
        },
        {
            title: '数量',
            dataIndex: 'count',
            sorter: (a, b) => a.count - b.count,
        },
    ]

    return (
        <>
            <div className="back" onClick={gotoanalyze}> &lt; 返回上一页</div>
            <div className="topdishes">热门菜品</div>
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