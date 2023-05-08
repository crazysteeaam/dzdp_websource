import './Analyze.scss'
import {useEffect, useState} from "react";
import {Select,Alert, Space, Spin} from 'antd';
import {analyzeApi} from "../../api";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip, PieChart, Pie, Sector, Cell
} from "recharts";
import {useMatch} from "react-router-dom";


const TopAreaBox = (item) => {
    return (
        <div className="topareabox" style={{
            borderRight: item.item.index === 3 ? 'none' : '1px solid #e5e5e5'
        }}>
            <div className="leftarea">
                <img src={item.item.icon} alt=""/>
            </div>
            <div className="rightarea">
                <div className="title">{item.item.title}</div>
                <div className="value">{item.item.value}</div>
            </div>
        </div>
    )
}

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
            <text x={cx} y={cy-15} dy={8} fontSize={20} fontWeight={500} textAnchor="middle" fill="black">
                {/*{payload.name}*/}
                206
            </text>
            <text x={cx} y={cy+3} dy={8} fontSize={12} textAnchor="middle" fill="black">
                {/*{payload.name}*/}
                餐厅
            </text>
            <text x={cx} y={cy+20} dy={8} fontSize={12} textAnchor="middle" fill="black">
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
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} textAnchor={textAnchor} fontSize={12} fill="#333">{`数量 ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} dy={18} textAnchor={textAnchor} fontSize={12} fill="#999">
                {`(Rate ${(percent * 100).toFixed(1)}%)`}
            </text>
        </g>
    );
};

export const Analyze = () => {

    const match = useMatch('/analyze');

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析平台 - 市场分析'
        }
    }, [match]);

    const [TopArea, setTopArea] = useState([])
    const [State, setState] = useState({activeIndex: 0})
    const [Datalist, setDatalist] = useState({})
    const [Merchantlist, setMerchantlist] = useState([])
    const [Data1, setData1] = useState([])
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        analyzeApi.getstartdata().then(res => {
            setDatalist(res.message);
            setTopArea([
            {
                index: 0,
                icon: '/src/static/ana-topbox/1.jpg',
                title: '入驻餐厅总数',
                value: res.message.total_num
            },
            {
                index: 1,
                icon: '/src/static/ana-topbox/2.jpg',
                title: '总评论数',
                value: res.message.total_comment
            },
            {
                index: 2,
                icon: '/src/static/ana-topbox/3.jpg',
                title: 'VIP客户占比',
                value: res.message.vip_rate + '%'
            },
            {
                index: 3,
                icon: '/src/static/ana-topbox/4.jpg',
                title: '市场平均得分',
                value: res.message.mean_rating + '/5'
            }
        ])
            setMerchantlist(res.message.merchants)
            setData1(res.message.data1)
            setLoading(false)
        })
    }, [])

    const onPieEnter = (_, index) => {
        setState({activeIndex: index});
    };

    const TopAreaBoxView = () => {
        return TopArea.map((item, index) => {
            return (
                <TopAreaBox
                    key={index}
                    item={item}
                />
            )
        })
    }

    const onChange = (value) => {
        console.log(`selected ${value}`);
        analyzeApi.getdata1(value).then(res => {
            setData1(res.message.data1)
        }
        )
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const data = Data1

    const data2 = Datalist.data2

    const data3 = Datalist.data3

    const data4 = Datalist.data4

    const COLORS = ['rgba(112, 138, 255, 1)', 'rgba(66, 164, 245, 1)', 'rgba(157, 115, 255, 1)', 'rgba(247, 193, 45, 1)','rgba(255, 153, 43, 1)','rgba(160, 165, 198, 1)','rgba(247, 101, 96, 1)'];


    return (
        <>
            {
                Loading &&
                <div className="spin">
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Spin tip="Loading" size="large">
                           <div className="content" />
                        </Spin>
                    </Space>
                </div>
            }

            <div className="analyze">
                <div className="toparea">
                    <TopAreaBoxView/>
                </div>
                <div className="middlearea">
                    <div className="middleareabox">
                        <div className="middleareaboxtop">
                            <div className="title">餐厅各方面评分变化趋势（2019年）</div>
                            <Select
                                style={{
                                    width: 202,
                                    height: 30,
                                    textAlign: 'left',
                                    backgroundColor: 'rgba(229, 229, 229, 1)',
                                    borderRadius: '4px',
                                }}
                                showSearch
                                placeholder="选择餐厅（默认为总体水平）"
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={Merchantlist}
                            />
                            <div className="more">查看更多</div>
                        </div>
                        <div className="middleareaboxbottom">
                            <ResponsiveContainer width="95%" height="90%">
                                <AreaChart
                                    width={550}
                                    height={250}
                                    data={data}
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
                                    <Area type="monotone" dataKey="味道评分" stroke="rgba(72, 118, 255, 1)"
                                          fillOpacity={1} fill="url(#colorUv)"/>
                                    <Area type="monotone" dataKey="环境评分" stroke="rgba(117, 70, 244, 1)"
                                          fillOpacity={1} fill="url(#colorPv)"/>
                                    <Area type="monotone" dataKey="服务评分" stroke="rgba(235, 55, 55, 1)"
                                          fillOpacity={1} fill="url(#colorMv)"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                    <div className="middleareabox">
                        <div className="middleareaboxtop">
                            <div className="title">最受消费者欢迎的粤菜排名</div>
                            <div className="more">查看更多</div>
                        </div>
                        <div className="middleareaboxbottom">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    layout='vertical'
                                    width={500}
                                    height={300}
                                    data={data2}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 35,
                                        bottom: 5,
                                    }}
                                >
                                    {/*<CartesianGrid stroke="#f5f5f5" />*/}
                                    <XAxis type="number" fontSize={12}/>
                                    <YAxis dataKey="name" type="category" fontSize={12}/>
                                    <Tooltip wrapperStyle={{
                                        width: 130,
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
                                    <Bar dataKey="value" barSize={10} fill="rgba(112, 138, 255, 1)"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="anabottomarea">
                    <div className="bottomareabox">
                        <div className="middleareaboxtop">
                            <div className="title">评论分级情况</div>
                            <div className="more">查看更多</div>
                        </div>
                        <div className="middleareaboxbottom">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data3}
                                    margin={{
                                        top: 0,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="1 3"/>
                                    <XAxis dataKey="name" angle={0} fontSize={10}/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend
                                    wrapperStyle={{
                                        width: "100%",
                                        height: 20,
                                        fontSize: "15px",
                                        paddingTop: "2px",
                                    }}
                                        />
                                    <Bar dataKey="好评" barSize={15} stackId="a" fill="#778afe"/>
                                    <Bar dataKey="中评" barSize={15} stackId="a" fill="#9eaffe"/>
                                    <Bar dataKey="差评" barSize={15} stackId="a" fill="#c5d1ff"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bottomareabox">
                        <div className="middleareaboxtop">
                            <div className="title">餐厅人均价格分布情况</div>
                            <div className="more">查看更多</div>
                        </div>
                        <div className="middleareaboxbottom">
                            <ResponsiveContainer width="95%" height="100%" className="container">
                                <PieChart width={300} height={400}>
                                    <Pie
                                        activeIndex={State.activeIndex}
                                        activeShape={renderActiveShape}
                                        data={data4}
                                        cx="50%"
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
                    <img src="/src/static/analyzepic.png" alt=""/>
                </div>

            </div>
        </>
    )
}