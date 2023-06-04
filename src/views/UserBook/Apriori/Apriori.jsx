import "./Apriori.scss"
import {useLocation, useMatch, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Select, Space, Spin, Table} from "antd";
import ReactECharts from "echarts-for-react";
import {userbookApi} from "../../../api";
import {Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export const Apriori = () => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const match = useMatch('/userbook/apriori');

    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 关联分析'
        }
    }, [match]);

    useEffect(() => {
        userbookApi.getaprioridata().then((res) => {
                setData(res.message);
                console.log(res.message);
                setLoading(false);
            }
        ).catch((err) => {
                console.log(err);
            }
        )
    }, []);

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };


    const data = Data?.relation_data?.map((item, index) => {
        return {
            antecedents: item.antecedents,
            consequents: item.consequents,
            antecedent_support: (item.antecedent_support*100).toFixed(2),
            consequent_support: (item.consequent_support*100).toFixed(2),
            support: (item.support*100).toFixed(2),
            confidence: item.confidence,
            lift: item.lift,
            leverage: item.leverage,
            conviction: item.conviction,
            zhangs_metric: item.zhangs_metric
        }
    })

    // 并按照置信度排序并选择排序前10的
    const data2 = Data?.relation_data?.map((item, index) => {
        return {
            name: item.antecedents.toString() + '->' + item.consequents.toString(),
            value: item.confidence
        }
    }).sort((a, b) => {
        return b.value - a.value
    }).slice(0, 10)

    console.log(data2)

    const columns = [
        {
            title: '前项',
            dataIndex: 'antecedents',
            key: 'antecedents',
            width: "10%",
        },
        {
            title: '后项',
            dataIndex: 'consequents',
            key: 'consequents',
            width: "10%",
        },
        {
            title: '前项支持度',
            dataIndex: 'antecedent_support',
            key: 'antecedent_support',
            width: "10%",
            sorter: (a, b) => a.antecedent_support - b.antecedent_support,
        },
        {
            title: '后项支持度',
            dataIndex: 'consequent_support',
            key: 'consequent_support',
            width: "10%",
            sorter: (a, b) => a.consequent_support - b.consequent_support,
        },
        {
            title: '支持度',
            dataIndex: 'support',
            key: 'support',
            width: "8%",
            sorter: (a, b) => a.support - b.support,
        },
        {
            title: '置信度',
            dataIndex: 'confidence',
            key: 'confidence',
            width: "8%",
            sorter: (a, b) => a.confidence - b.confidence,
        },
        {
            title: '提升度',
            dataIndex: 'lift',
            key: 'lift',
            width: "8%",
            sorter: (a, b) => a.lift - b.lift,
        },
        {
            title: '杠杆度',
            dataIndex: 'leverage',
            key: 'leverage',
            width: "8%",
            sorter: (a, b) => a.leverage - b.leverage,
        },
        {
            title: '确信度',
            dataIndex: 'conviction',
            key: 'conviction',
            width: "8%",
            sorter: (a, b) => a.conviction - b.conviction,
        },
        {
            title: '张氏度量',
            dataIndex: 'zhangs_metric',
            key: 'zhangs_metric',
            width: "10%",
            sorter: (a, b) => a.zhangs_metric - b.zhangs_metric,
        }
    ]

    const gotouserbook = () => {
        navigate('/userbook')
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setLoading(true);
        userbookApi.getcurrentaprioridata(value/100).then((res) => {
                setData(res.message);
                console.log(res.message);
                setLoading(false);
            }
        ).catch((err) => {
                console.log(err);
            }
        )
    }

    return (
        <>
            {
                Loading &&
                <div className="spin">
                    <Space direction="vertical" style={{width: '100%'}}>
                        <Spin tip="Loading" size="large">
                            <div className="content"/>
                        </Spin>
                    </Space>
                </div>
            }
            <div className="bigbox">
                <div className="back" onClick={gotouserbook}> &lt; 返回上一页</div>
                <div className="apriori">关联分析</div>
                <div className="selectarea">
                    最小支持度调整：
                    <Space wrap>
                        <Select
                            defaultValue="0.5"
                            size="small"
                            style={{
                                width: 150,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: '0.5',
                                    label: '0.5',
                                },
                                {
                                    value: '0.2',
                                    label: '0.2',
                                },
                                {
                                    value: '0.1',
                                    label: '0.1',
                                }
                            ]}
                        />
                    </Space>
                </div>
                <div className="toparea">
                    <div className="topbox">
                        <div className="topboxtop">
                            <div className="title">关联规则查看</div>
                        </div>
                        <div className="topboxbottom">
                            <ReactECharts option={state.option}/>
                        </div>
                    </div>
                    <div className="topbox">
                        <div className="topboxtop">
                            <div className="title">关联规则排名</div>
                        </div>
                        <div className="topboxbottom">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    layout='vertical'
                                    width={500}
                                    height={300}
                                    data={data2}
                                    margin={{
                                        top: 5,
                                        right: 20,
                                        left: 85,
                                        bottom: 5,
                                    }}
                                >
                                    {/*<CartesianGrid stroke="#f5f5f5" />*/}
                                    <XAxis type="number" fontSize={12}/>
                                    <YAxis dataKey="name" type="category" fontSize={12}/>
                                    <Tooltip wrapperStyle={{
                                        width: 200,
                                        backdropFilter: "blur(10px)",
                                        filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))",
                                        background: "transparent",
                                        border: "0px solid white",
                                        borderRadius: "4px",
                                        fontSize: "12px",
                                        fontWeight: 400,
                                        letterSpacing: "0.36px",
                                        lineHeight: "16.46px",
                                        color: "rgba(0, 0, 0, 1)",
                                        textAlign: "left",
                                    }}/>
                                    {/*<Legend />*/}
                                    <Bar dataKey="value" name="置信度" barSize={10} fill="rgba(112, 138, 255, 1)">
                                        <LabelList dataKey="value" position="right" fontSize={10}/>
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="bottomarea2">
                    <div className="table">
                        <Table
                            columns={columns}
                            dataSource={data}
                            onChange={onChange}
                            scroll={{y: 260}}
                            // loading={Loading}
                            size="middle"
                        />
                    </div>
                </div>
            </div>

        </>

    )
}