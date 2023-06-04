import './Compare.scss'
import {Alert, Select, Space, Spin} from "antd";
import {useMatch, useNavigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Sector, Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {compareApi} from "../../api";


const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value} = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 5) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy - 15} dy={8} fontSize={20} fontWeight={500} textAnchor="middle" fill="black">
                {/*{payload.name}*/}
                206
            </text>
            <text x={cx} y={cy + 3} dy={8} fontSize={12} textAnchor="middle" fill="black">
                {/*{payload.name}*/}
                餐厅
            </text>
            <text x={cx} y={cy + 20} dy={8} fontSize={12} textAnchor="middle" fill="black">
                {/*{payload.name}*/}
                总数
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} dy={-18} textAnchor={textAnchor} fontSize={12}
                  fill="#333">{`餐厅 ${payload.name}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} textAnchor={textAnchor} fontSize={12}
                  fill="#333">{`热度 ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} dy={18} textAnchor={textAnchor} fontSize={12} fill="#999">
                {`(Rate ${(percent * 100).toFixed(1)}%)`}
            </text>
        </g>
    );
};

const ErrorMessage = ({message}) => {
    return (
        <Alert
            message="错误"
            description={message}
            type="error"
            showIcon
        />
    )
}

export const Compare = () => {

    const navigate = useNavigate();
    const match = useMatch('/compare');
    const [State, setState] = useState({activeIndex: 0})
    const [Loading, setLoading] = useState(true)
    const [Data, setData] = useState([])
    const [CompareData, setCompareData] = useState([])
    const [Errorindex, setErrorindex] = useState(false)
    const [Valuelist, setValuelist] = useState([])


    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 竞争态势'
        }
    }, [match]);

    useEffect(() => {
        compareApi.getstartdata().then((res) => {
            console.log(res)
            setData(res.message)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    const onPieEnter = (_, index) => {
        setState({activeIndex: index});
    };

    const handleChange = (value) => {
        // console.log(value.length);
        if (value.length > 3) {
            console.log('最多选择三个餐厅')
            // 等handleselect执行完再执行删除最后一个选择的餐厅
            setTimeout(() => {
                setValuelist(Valuelist.filter((item, index) => index !== 3))
            }, 0)
            // 显示3秒错误信息
            setErrorindex(true)
            setTimeout(() => {
                setErrorindex(false)
            }, 3000)
        }
    };

    const handleSelect = (value) => {
        // console.log(`selected ${value}`);
        // 添加选择的餐厅
        setValuelist([...Valuelist, value])
    }

    const handleLeave = () => {
        if (Valuelist.length === 3) {
            compareApi.getcomparedata3(Valuelist[0], Valuelist[1], Valuelist[2]).then((res) => {
                console.log(res)
                setCompareData(res.message)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        } else if (Valuelist.length === 2) {
            compareApi.getcomparedata2(Valuelist[0], Valuelist[1]).then((res) => {
                console.log(res)
                setCompareData(res.message)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        } else if (Valuelist.length === 1) {
            compareApi.getcomparedata1(Valuelist[0]).then((res) => {
                console.log(res)
                setCompareData(res.message)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            setCompareData([])
        }
    }

    const handleDeselect = (value) => {
        // console.log(`deselected ${value}`);
        // 删掉取消的餐厅
        setValuelist(Valuelist.filter(item => item !== value))
    }

    const handleClear = () => {
        setValuelist([])
    }

    const gotoagain = () => {
        // 跳转到/again路由
        navigate('/compare/again', {state: {Data: Data?.again_data}})
    }


    const data = Data?.again_data_8;
    const data4 = Data?.heat_data;
    const data5 = CompareData?.month_data;
    const data6 = CompareData?.quarter_data;
    const merchants = Data?.merchants;

    const COLORS = ['rgba(112, 138, 255, 1)', 'rgba(66, 164, 245, 1)', 'rgba(157, 115, 255, 1)', 'rgba(247, 193, 45, 1)', 'rgba(255, 153, 43, 1)', 'rgba(160, 165, 198, 1)', 'rgba(247, 101, 96, 1)'];


    return (
        <>
            {
                Errorindex &&
                <div className="errorindex">
                    <ErrorMessage message="最多选择三个餐厅"/>
                </div>

            }
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
            <div className="compare">
                <div className="selectarea">
                    <span>请选择对比餐厅：</span>
                    <Space
                        style={{
                            width: '50%',
                        }}
                        direction="vertical"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            // placeholder="请选择对比餐厅"
                            defaultValue={[]}
                            onSelect={handleSelect}
                            onDeselect={handleDeselect}
                            onClear={handleClear}
                            onChange={handleChange}
                            onMouseLeave={handleLeave}
                            options={merchants}
                            value={Valuelist}
                        />
                    </Space>
                </div>
                <div className="toparea">
                    <div className="topboxbig">
                        <div className="topboxbigtop">
                            <div className="title">市场份额分析</div>
                            <div className="more">查看更多</div>
                        </div>
                        <div className="topboxbigbottom">
                            <ResponsiveContainer width="100%" height="100%" className="container">
                                <PieChart width={200} height={400}>
                                    <Pie
                                        activeIndex={State.activeIndex}
                                        activeShape={renderActiveShape}
                                        data={data4}
                                        cx="40%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        fill="#778afe"
                                        dataKey="value"
                                        onMouseEnter={onPieEnter}
                                    >
                                        {data4?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                        ))}
                                    </Pie>
                                    <Legend
                                        wrapperStyle={{
                                            width: "38%",
                                            height: 100,
                                            fontSize: "8px",
                                            paddingTop: "20px",
                                        }}
                                        layout="vertical"
                                        align="right"
                                        verticalAlign="top"
                                        iconSize={10}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="topboxsmall">
                        <div className="topboxsmalltop">
                            <div className="title">竞争优劣势分析——季度分析（截止2017年10月）</div>
                        </div>
                        <div className="topboxsmallbottom">
                            {
                                !data5 &&
                                <div>尚未选择对比餐厅</div>
                            }
                            {
                                data5 &&
                                <ResponsiveContainer width="95%" height="90%">
                                    <AreaChart
                                        width={550}
                                        height={250}
                                        data={data6}
                                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="rgba(72, 118, 255, 1)" stopOpacity={0.3}/>
                                                <stop offset="65%" stopColor="rgba(72, 118, 255, 0)" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="rgba(117, 70, 244, 1)" stopOpacity={0.3}/>
                                                <stop offset="65%" stopColor="rgba(117, 70, 244, 0)" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorMv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="rgba(235, 55, 55, 1)" stopOpacity={0.3}/>
                                                <stop offset="65%" stopColor="rgba(235, 55, 55, 0)" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" stroke="rgba(129, 134, 165, 1)" fontSize={12}/>
                                        <YAxis stroke="rgba(129, 134, 165, 1)" fontSize={12}/>
                                        <Legend
                                            wrapperStyle={{
                                                width: "100%",
                                                height: 10,
                                                fontSize: "10px",
                                                paddingTop: "2px",
                                            }}
                                        />
                                        <Tooltip wrapperStyle={{
                                            width: 190,
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
                                        {
                                            data5[0].merchant1 &&
                                            <Area type="monotone" dataKey="merchant1" stroke="rgba(72, 118, 255, 1)"
                                                  fillOpacity={1} fill="url(#colorUv)" name={Valuelist[0]}/>
                                        }
                                        {
                                            data5[0].merchant2 &&
                                            <Area type="monotone" dataKey="merchant2" stroke="rgba(117, 70, 244, 1)"
                                                  fillOpacity={1} fill="url(#colorPv)" name={Valuelist[1]}/>
                                        }
                                        {
                                            data5[0].merchant3 &&
                                            <Area type="monotone" dataKey="merchant3" stroke="rgba(235, 55, 55, 1)"
                                                  fillOpacity={1} fill="url(#colorMv)" name={Valuelist[2]}/>
                                        }
                                    </AreaChart>
                                </ResponsiveContainer>
                            }
                        </div>
                    </div>
                    <div className="topboxbig">
                        <div className="topboxbigtop">
                            <div className="title">用户转化率分析</div>
                            <div className="more" onClick={gotoagain}>查看更多</div>
                        </div>
                        <div className="topboxbigbottom">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={500}
                                    height={310}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 60,
                                        bottom: 5,
                                    }}
                                    layout="vertical"
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis type="number" fontSize={12}/>
                                    <YAxis dataKey="name" type="category" fontSize={9}/>
                                    <Tooltip wrapperStyle={{
                                        width: 150,
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
                                    <Legend
                                        wrapperStyle={{
                                            width: "80%",
                                            height: 10,
                                            fontSize: "10px",
                                            // paddingTop: "20px",
                                        }}
                                        iconSize={10}
                                    />
                                    <Bar dataKey="获客数" fill="#8884d8"/>
                                    <Bar dataKey="回头客数量" fill="#82ca9d"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="topboxsmall">
                        <div className="topboxsmalltop">
                            <div className="title">竞争优劣势分析——2017年月度分析</div>
                        </div>
                        <div className="topboxsmallbottom">
                            {
                                !data5 &&
                                <div>尚未选择对比餐厅</div>
                            }
                            {
                                data5 &&
                                <ResponsiveContainer width="95%" height="90%">
                                    <AreaChart
                                        width={550}
                                        height={250}
                                        data={data5}
                                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="rgba(72, 118, 255, 1)" stopOpacity={0.3}/>
                                                <stop offset="65%" stopColor="rgba(72, 118, 255, 0)" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="rgba(117, 70, 244, 1)" stopOpacity={0.3}/>
                                                <stop offset="65%" stopColor="rgba(117, 70, 244, 0)" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorMv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="rgba(235, 55, 55, 1)" stopOpacity={0.3}/>
                                                <stop offset="65%" stopColor="rgba(235, 55, 55, 0)" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" stroke="rgba(129, 134, 165, 1)" fontSize={12}/>
                                        <YAxis stroke="rgba(129, 134, 165, 1)" fontSize={12}/>
                                        <Legend
                                            wrapperStyle={{
                                                width: "100%",
                                                height: 10,
                                                fontSize: "10px",
                                                paddingTop: "2px",
                                            }}
                                        />
                                        <Tooltip wrapperStyle={{
                                            width: 190,
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
                                        {
                                            data5[0].merchant1 &&
                                            <Area type="monotone" dataKey="merchant1" stroke="rgba(72, 118, 255, 1)"
                                                  fillOpacity={1} fill="url(#colorUv)" name={Valuelist[0]}/>
                                        }
                                        {
                                            data5[0].merchant2 &&
                                            <Area type="monotone" dataKey="merchant2" stroke="rgba(117, 70, 244, 1)"
                                                  fillOpacity={1} fill="url(#colorPv)" name={Valuelist[1]}/>
                                        }
                                        {
                                            data5[0].merchant3 &&
                                            <Area type="monotone" dataKey="merchant3" stroke="rgba(235, 55, 55, 1)"
                                                  fillOpacity={1} fill="url(#colorMv)" name={Valuelist[2]}/>
                                        }
                                    </AreaChart>
                                </ResponsiveContainer>
                            }
                        </div>
                    </div>
                </div>
                <div className="bottomarea1">
                    <div className="bottombox">
                        <div className="bottomboxleft">
                            <img src="/static/compareconcluicon.png" alt=""/>
                            <div className="text">竞争分析结论</div>
                        </div>
                        <div className="bottomboxright">
                            整体市场中餐厅总数为{Data?.total_num}，其中{Data?.top1_heat}所占市场份额最高（按评论量统计），{Data?.top2_heat}、{Data?.top3_heat}依次为第二、第三名。
                            {/*按月度维度分析，在xx月，平台餐厅评论量达到峰值。按时段维度分析，在xx时段，平台餐厅评论量达到峰值。*/}
                            同时可以看到热门餐厅中，{Data?.top1_again?.name}的顾客就餐人次最多，达到{Data?.top1_again?.value}次;{Data?.top2_again?.name}的顾客复购人次最多，达到{Data?.top2_again?.value}次;{Data?.top3_again?.name}、{Data?.top4_again}、{Data?.top5_again}、{Data?.top6_again}、{Data?.top7_again}复购比率最多，达到{Data?.top3_again?.value}%。
                        </div>
                    </div>
                    <div className="bottompic">
                        <img src="/static/comparepic.png" alt=""/>
                    </div>
                </div>
            </div>
        </>
    )
}