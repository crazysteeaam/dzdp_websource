import './Marketing.scss'
import {Space, Spin, Select, Table} from "antd";
import {useMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {marketApi} from "../../api";
import {
    Area,
    AreaChart,
    Cell,
    Legend,
    Pie,
    PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis,
    Radar, RadarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";


const TopAreaBox = (item) => {
    return (
        <div className="toparea-box" style={{
            backgroundColor: item.item.color,
        }}>
            <div className="toparea-box-left">
                <div className="name">{item.item.name}</div>
                <div className="value">{item.item.value}</div>
                <div className="compare1">
                    较市场整体{item.item.compare ? "+" : ""}{item.item.compare_num}
                    <img
                        src={item.item.compare ? "/static/market-topbox/top.png" : "/static/market-topbox/down.png"}
                        alt=""/>
                </div>
            </div>
            <div className="toparea-box-right">
                <img src={"/static/market-topbox/" + item.item.index + ".png"} alt=""/>
            </div>
        </div>
    )
}

const AdviceBox = (item) => {
    return (
        <div className="advice-box">
            <div className="advicetop">餐厅营销建议{item.item.index}</div>
            <div className="advicecontent">{item.item.content}</div>
        </div>
    )
}

const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const SearchBox = ({options,onChange}) => {
    return (
        <Select
            showSearch
            style={{width: 300}}
            placeholder="请选择餐厅（默认第一家）"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={options}
        />
    )
}

export const Marketing = () => {

    const match = useMatch('/marketing');

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 精准营销'
        }
    }, [match]);

    const [Loading, setLoading] = useState(true)
    const [TopArea, setTopArea] = useState([])
    const [Merchantlist, setMerchantlist] = useState([])
    const [data, setData] = useState({})
    const [AdviceList, setAdviceList] = useState([{}, {}, {}, {}])

    useEffect(() => {
        marketApi.getstartdata().then((res) => {
            console.log(res)
            setTopArea(res.message.data1)
            setMerchantlist(res.message.merchants)
            setData(res.message)
            setAdviceList(res.message.advice)
            setLoading(false)
        })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const onChange = (value) => {
        console.log(`selected ${value}`);
        setLoading(true);
        marketApi.getcurrentdata(value).then(res => {
                console.log(res)
                setTopArea(res.message.data1)
                setMerchantlist(res.message.merchants)
                setData(res.message)
                setAdviceList(res.message.advice)
                setLoading(false)
            }
        ).catch((err) => {
                console.log(err)
            }
        )
    };

    const TopAreaBoxView = () => {
        return TopArea.map((item, index) => {
            return (
                <TopAreaBox
                    item={item}
                    key={index}/>
            )
        })
    }

    const AdviceBoxView = () => {
        return AdviceList.map((item, index) => {
            return (
                <AdviceBox
                    item={item}
                    key={index}/>
            )
        })
    }

    const data2 = data.rating_data;
    const data3 = data.year_data;
    const data4 = data.month_data;
    const data5 = data.favour_data;
    const data6 = data.rate_data;

    const columns = [
        {
            title: '菜品名称',
            dataIndex: '菜品名称',
            width: 200,
        },
        {
            title: '热度',
            dataIndex: '热度',
            width: 100,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.热度 - b.热度,
        },
    ];

    const COLORS2 = ['#3978d0', '#8fd0dc', '#dc6e6b'];


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
            <div className="marketing">
                <div className="topsearch">
                    <SearchBox options={Merchantlist} onChange={onChange}/>
                </div>
                <div className="toparea">
                    <TopAreaBoxView/>
                </div>
                <div className="middlearea">
                    <div className="middlebig">
                        <div className="middlebigtop">
                            <div className="title">评论量年度统计</div>
                        </div>
                        <div className="middlebigbottom">
                            <ResponsiveContainer width="95%" height="90%">
                                <AreaChart
                                    width={550}
                                    height={250}
                                    data={data3}
                                    margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="rgba(72, 118, 255, 1)" stopOpacity={0.3}/>
                                            <stop offset="65%" stopColor="rgba(72, 118, 255, 0)" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="label" stroke="rgba(129, 134, 165, 1)" fontSize={12}/>
                                    <YAxis stroke="rgba(129, 134, 165, 1)" fontSize={12}/>
                                    <Legend
                                        wrapperStyle={{
                                            width: "100%",
                                            height: 5,
                                            fontSize: "15px",
                                            paddingTop: "2px",
                                        }}
                                    />
                                    <Tooltip wrapperStyle={{
                                        width: 120,
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
                                    {/*<CartesianGrid strokeDasharray="3 3" />*/}
                                    <Area type="monotone" dataKey="评论数量" stroke="rgba(72, 118, 255, 1)"
                                          fillOpacity={1} fill="url(#colorUv)"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="middlebig">
                        <div className="middlebigtop">
                            <div className="title">评论量月度统计（2016年）</div>
                        </div>
                        <div className="middlebigbottom">
                            <ResponsiveContainer width="95%" height="90%">
                                <AreaChart
                                    width={550}
                                    height={250}
                                    data={data4}
                                    margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="rgba(72, 118, 255, 1)" stopOpacity={0.3}/>
                                            <stop offset="65%" stopColor="rgba(72, 118, 255, 0)" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="label" stroke="rgba(129, 134, 165, 1)" fontSize={12}/>
                                    <YAxis stroke="rgba(129, 134, 165, 1)" fontSize={12}/>
                                    <Legend
                                        wrapperStyle={{
                                            width: "100%",
                                            height: 5,
                                            fontSize: "15px",
                                            paddingTop: "2px",
                                        }}
                                    />
                                    <Tooltip wrapperStyle={{
                                        width: 120,
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
                                    {/*<CartesianGrid strokeDasharray="3 3" />*/}
                                    <Area type="monotone" dataKey="评论数量" stroke="rgba(72, 118, 255, 1)"
                                          fillOpacity={1} fill="url(#colorUv)"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="middlesmall">
                        <div className="middlesmalltop">
                            <div className="title">各类评价占比</div>
                        </div>
                        <div className="middlesmallbottom">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={data2}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data2?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]}/>
                                        ))}
                                    </Pie>
                                    <Legend
                                        wrapperStyle={{
                                            width: "100%",
                                            height: 40,
                                            fontSize: "12px",
                                            paddingTop: "20px",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="bottomarea1">
                    <div className="bottombig">
                        <div className="bottombigtop">
                            <div className="title">餐厅热门菜品表</div>
                        </div>
                        <div className="bottombigbottom">
                            <ResponsiveContainer width="100%" height="100%">
                                <Table
                                    columns={columns}
                                    dataSource={data5}
                                    size="small"
                                    pagination={{
                                        pageSize: 5,
                                    }}
                                    scroll={{
                                        scrollToFirstRowOnChange: true,
                                        y: 180,
                                    }}
                                />
                            </ResponsiveContainer>
                        </div>

                    </div>
                    <div className="bottomsmall">
                        <div className="bottomsmalltop">
                            <div className="title">餐厅各纬度得分情况</div>
                        </div>
                        <div className="bottomsmallbottom">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data6}>
                                    <PolarGrid/>
                                    <PolarAngleAxis dataKey="科目"/>
                                    <PolarRadiusAxis angle={30} domain={[0, 5]}/>
                                    <Radar name="平均水平" dataKey="所有餐厅" stroke="rgba(72, 118, 255, 1)"
                                           fill="rgba(72, 118, 255, 1)" fillOpacity={0.3}/>
                                    <Radar name="当前餐厅" dataKey="当前餐厅" stroke="rgba(117, 70, 244, 1)"
                                           fill="rgba(117, 70, 244, 1)" fillOpacity={0.3}/>
                                    <Legend/>
                                    <Tooltip wrapperStyle={{
                                        width: 120,
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
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bottombig" style={{backgroundColor: "transparent"}}>
                        <AdviceBoxView/>
                    </div>
                </div>
            </div>

        </>
    )
}