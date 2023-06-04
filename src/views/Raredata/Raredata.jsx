import "./Raredata.scss"
import {Table} from "antd";
import {useMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {raredataApi} from "../../api";

export const Raredata = () => {

    const match = useMatch('/raredata');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 原始数据'
        }
    }, [match]);

    useEffect(() => {
        setLoading(true)
        raredataApi.getraredata().then(res => {
            console.log(res)
            setData(res.message.raredata)
            setLoading(false)
        }).catch(
            err => {
                console.log(err)
            }
        )

    }, [])

    const columns = [
        {
            title: '评论ID',
            dataIndex: 'Review_ID',
            // filters: filters,
            // filterMode: 'tree',
            // filterSearch: true,
            // onFilter: (value, record) => record.name.startsWith(value),
            // // 按照餐厅名称排序
            // sorter: (a, b) => a.name.localeCompare(b.name),
            width: '5%',
        },
        {
            title: '餐厅名称',
            dataIndex: 'Merchant',
            // sorter: (a, b) => a.获客数 - b.获客数,
            width: '10%',
        },
        {
            title: '评分',
            dataIndex: 'Rating',
            sorter: (a, b) => a.Rating - b.Rating,
            width: '5%',
        },
        {
            title: '口味评分',
            dataIndex: 'Score_taste',
            sorter: (a, b) => a.Score_taste - b.Score_taste,
            width: '5%',
        },
        {
            title: '环境评分',
            dataIndex: 'Score_environment',
            sorter: (a, b) => a.Score_environment - b.Score_environment,
            width: '5%',
        },
        {
            title: '服务评分',
            dataIndex: 'Score_service',
            sorter: (a, b) => a.Score_service - b.Score_service,
            width: '5%',
        },
        {
            title: '人均消费',
            dataIndex: 'Price_per_person',
            sorter: (a, b) => a.Price_per_person - b.Price_per_person,
            width: '5%',
        },
        {
            title: '评论时间',
            dataIndex: 'Time',
            sorter: (a, b) => a.Time - b.Time,
            width: '10%',
        },
        {
            title: '点赞数',
            dataIndex: 'Num_thumbs_up',
            sorter: (a, b) => a.Num_thumbs_up - b.Num_thumbs_up,
            width: '5%',
        },
        {
            title: '回复数',
            dataIndex: 'Num_ response',
            // sorter: (a, b) => a.'Num_ response' - b.'Num_ response',
            width: '5%',
        },
        {
            title: '评论内容',
            dataIndex: 'Content_review',
            sorter: (a, b) => a.Content_review - b.Content_review,
            width: '10%',
            ellipsis: true,
        },
        {
            title: '评论者',
            dataIndex: 'Reviewer',
            sorter: (a, b) => a.Reviewer.localeCompare(b.Reviewer),
            // sorter: (a, b) => a.Reviewer - b.Reviewer,
            width: '5%',
        },
        {
            title: '评论者价值',
            dataIndex: 'Reviewer_value',
            sorter: (a, b) => a.Reviewer_value - b.Reviewer_value,
            width: '5%',
        },
        {
            title: '评论者等级',
            dataIndex: 'Reviewer_rank',
            sorter: (a, b) => a.Reviewer_rank - b.Reviewer_rank,
            width: '5%',
        },
        {
            title: '喜欢的食物',
            dataIndex: 'Favorite_foods',
            // sorter: (a, b) => a.Favorite_foods - b.Favorite_foods,
            width: '10%',
        }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    return (
        <>
            <div className="bigbox">
                <div className="raredata">原始数据</div>
                <div className="table">
                    <Table
                        columns={columns}
                        dataSource={data}
                        onChange={onChange}
                        size="middle"
                        expandable={{
                            expandedRowRender: (record) => (
                                <p
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    {record.Content_review}
                                </p>
                            ),
                            rowExpandable: (record) => record.name !== 'Not Expandable',
                        }}
                        pagination={{ pageSize: 10 }}
                        scroll={{ y: 450 }}
                        loading={loading}
                    />
                </div>
            </div>

        </>
    )
}