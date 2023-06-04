import './UserBook.scss'
import {useMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {Space, Spin} from "antd";
import {
    Area,
    AreaChart, CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer, Scatter, ScatterChart,
    Sector,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {UserBookBox} from "./UserBookBox.jsx";
import {userbookApi} from "../../api";
import ReactECharts from 'echarts-for-react';

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
            <text x={cx} y={cy - 10} dy={8} fontSize={16} fontWeight={500} textAnchor="middle" fill="black">
                {/*{payload.name}*/}
                294049
            </text>
            <text x={cx} y={cy + 10} dy={8} fontSize={12} textAnchor="middle" fill="black">
                {/*{payload.name}*/}
                用户总数
            </text>
            {/*<text x={cx} y={cy + 20} dy={8} fontSize={12} textAnchor="middle" fill="black">*/}
            {/*    /!*{payload.name}*!/*/}

            {/*</text>*/}
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
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} textAnchor={textAnchor} fontSize={12}
                  fill="#333">{`数量 ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} dy={18} textAnchor={textAnchor} fontSize={12} fill="#999">
                {`(Rate ${(percent * 100).toFixed(1)}%)`}
            </text>
        </g>
    );
};

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

export const UserBook = () => {

    const match = useMatch('/userbook');

    useEffect(() => {
        if (match) {
            document.title = '大众点评数据分析系统 - 用户画像'
        }
    }, [match]);

    const [State, setState] = useState({activeIndex: 0})
    const [Loading, setLoading] = useState(true)
    const [StartDataList, setStartDataList] = useState([])


    const onPieEnter = (_, index) => {
        setState({activeIndex: index});
    };

    useEffect(() => {
        userbookApi.getstartdata().then(res => {
            console.log(res.message.level_data)
            setStartDataList(res.message)
            setLoading(false)
        })
    }, [])

    const option = {
        tooltip: {},
        series: [
            {
                type: 'graph',
                layout: 'circular',
                // layout: 'force',
                roam: true,
                draggable: true,
                label: {
                    normal: {
                        show: true
                    }
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [2, 10],
                edgeLabel: {
                    normal: {
                        textStyle: {
                            fontSize: 10
                        }
                    }
                },
                focusNodeAdjacency: true,
                force: {
                    initLayout: 'circular',
                    gravity: 0.01,
                    repulsion: 10,
                    edgeLength: [400, 1200]
                },
                categories: [
                    {
                        name: 'A'
                    },
                    {
                        name: 'B'
                    },
                    {
                        name: 'C'
                    },
                    {
                        name: 'Ab'
                    },
                    {
                        name: 'BA'
                    },
                    {
                        name: 'CA'
                    }
                ],
                lineStyle: {
                    normal: {
                        // color: 'source',
                        curveness: 0.3
                    }
                },
                data: [
                    {
                        id: '白贝',
                        name: '白贝',
                        symbolSize: 90,
                        x: -266.82776,
                        y: 299.6904,
                        value: 0.743,
                        category: 0
                    },
                    {
                        id: '豉油糖煎黄花鱼',
                        name: '豉油糖煎黄花鱼',
                        symbolSize: 38,
                        x: -418.08344,
                        y: 446.8853,
                        value: 0.762,
                        category: 0
                    },
                    {
                        id: '脆皮猪手',
                        name: '脆皮猪手',
                        symbolSize: 90,
                        x: -212.76357,
                        y: 245.29176,
                        value: 0.796,
                        category: 0
                    },
                    {
                        id: '荔枝木叉烧',
                        name: '荔枝木叉烧',
                        symbolSize: 38,
                        x: -242.82404,
                        y: 235.26283,
                        value: 0.82,
                        category: 0
                    },
                    {
                        id: '牛筋丸',
                        name: '牛筋丸',
                        symbolSize: 38,
                        x: -379.30386,
                        y: 429.09024,
                        value: 0.72,
                        category: 0
                    },
                    {
                        id: '农家糖糕',
                        name: '农家糖糕',
                        symbolSize: 38,
                        x: -417.26337,
                        y: 406.03506,
                        value: 0.717,
                        category: 0
                    },
                    {
                        id: '雪山奶露包',
                        name: '雪山奶露包',
                        symbolSize: 48,
                        x: -338.6012,
                        y: 485.24974,
                        value: 0.784,
                        category: 0
                    },
                    {
                        id: '盐焗乳鸽',
                        name: '盐焗乳鸽',
                        symbolSize: 24,
                        x: -382.69568,
                        y: 475.09113,
                        value: 0.765,
                        category: 0
                    },
                    {
                        id: '原味椰子鸡',
                        name: '原味椰子鸡',
                        symbolSize: 38,
                        x: -380.384,
                        y: 387.17385,
                        value: 0.815,
                        category: 0
                    },
                    {
                        id: '招牌酱爆豆角',
                        name: '招牌酱爆豆角',
                        symbolSize: 38,
                        x: -344.39838,
                        y: 451.24772,
                        value: 0.727,
                        category: 0
                    },
                    {
                        id: '蒸汽火锅',
                        name: '蒸汽火锅',
                        symbolSize: 48,
                        x: -89.34107,
                        y: 234.56128,
                        value: 0.738,
                        category: 0
                    },
                    {
                        id: '白切牛肉',
                        name: '白切牛肉',
                        symbolSize: 24,
                        x: -87.93029,
                        y: -6.8120565,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '白灼吊片',
                        name: '白灼吊片',
                        symbolSize: 24,
                        x: -339.77908,
                        y: -184.69139,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '菜心炒鸽杂',
                        name: '菜心炒鸽杂',
                        symbolSize: 24,
                        x: -194.31313,
                        y: 178.55301,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '柴火饭',
                        name: '柴火饭',
                        symbolSize: 24,
                        x: -158.05248,
                        y: 201.99768,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '果汁猪扒',
                        name: '果汁猪扒',
                        symbolSize: 24,
                        x: -127.701546,
                        y: 242.55057,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '{黑金猪手, 酸辣牛羊杂}',
                        name: 'Tholomyes',
                        symbolSize: 24,
                        x: -385.2226,
                        y: -393.5572,
                        value: 0,
                        category: 2
                    },
                    {
                        id: '红豆沙',
                        name: '红豆沙',
                        symbolSize: 24,
                        x: -524.55884,
                        y: -393.98975,
                        value: 0,
                        category: 1
                    },
                    {
                        id: "'红酒皮蛋黑叉烧",
                        name: "'红酒皮蛋黑叉烧",
                        symbolSize: 24,
                        x: -490.79382,
                        y: -493.57944,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '莲藕尖炒什',
                        name: '莲藕尖炒什',
                        symbolSize: 24,
                        x: -515.2424,
                        y: -456.9891,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '榴莲芝士鸡扒',
                        name: '榴莲芝士鸡扒',
                        symbolSize: 24,
                        x: -408.12122,
                        y: -490.5048,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '{罗氏虾, 蒸汽火锅}',
                        name: '{罗氏虾,蒸汽火锅}',
                        symbolSize: 24,
                        x: -456.44113,
                        y: -425.13303,
                        value: 0,
                        category: 2
                    },
                    {
                        id: '罗氏虾',
                        name: '罗氏虾',
                        symbolSize: 24,
                        x: -459.1107,
                        y: -382.5133,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '麦香鸡',
                        name: '麦香鸡',
                        symbolSize: 24,
                        x: -313.42786,
                        y: -289.44803,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '芒果肠粉',
                        name: '芒果肠粉',
                        symbolSize: 24,
                        x: 4.6313396,
                        y: -273.8517,
                        value: 0,
                        category: 3
                    },
                    {
                        id: '{明虾,蒸汽火锅}',
                        name: '{明虾,蒸汽火锅}',
                        symbolSize: 24,
                        x: 82.80825,
                        y: -203.1144,
                        value: 0,
                        category: 2
                    },
                    {
                        id: '明虾',
                        name: '明虾',
                        symbolSize: 24,
                        x: 78.90906,
                        y: -31.512747,
                        value: 0,
                        category: 3
                    },
                    {
                        id: '{排骨香米锅底,白贝}',
                        name: '{排骨香米锅底,白贝}',
                        symbolSize: 24,
                        x: -81.46074,
                        y: -204.20204,
                        value: 0,
                        category: 2
                    },
                    {
                        id: '{排骨香米锅底,罗氏虾}',
                        name: '{排骨香米锅底,罗氏虾}',
                        symbolSize: 38,
                        x: -225.73984,
                        y: 82.42431,
                        value: 0,
                        category: 2
                    },
                    {
                        id: '{排骨香米锅底,蒸汽火锅}',
                        name: '{排骨香米锅底,蒸汽火锅}',
                        symbolSize: 24,
                        x: -385.6842,
                        y: -20.206686,
                        value: 0,
                        category: 5
                    },
                    {
                        id: '排骨香米锅底',
                        name: '排骨香米锅底',
                        symbolSize: 38,
                        x: -403.92447,
                        y: -197.69823,
                        value: 0,
                        category: 4
                    },
                    {
                        id: '秋葵',
                        name: '秋葵',
                        symbolSize: 24,
                        x: -281.4253,
                        y: -158.45137,
                        value: 0,
                        category: 5
                    },
                    {
                        id: '{乳鸽焗饭,红烧乳鸽}',
                        name: '{乳鸽焗饭,红烧乳鸽}',
                        symbolSize: 24,
                        x: -122.41348,
                        y: 210.37503,
                        value: 0,
                        category: 5
                    },
                    {
                        id: '乳鸽焗饭',
                        name: '乳鸽焗饭',
                        symbolSize: 24,
                        x: -234.6001,
                        y: -113.15067,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '沙茶酱',
                        name: '沙茶酱',
                        symbolSize: 24,
                        x: -387.84915,
                        y: 58.7059,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '{沙拉猪扒,红豆沙}',
                        name: '{沙拉猪扒,红豆沙}',
                        symbolSize: 24,
                        x: -338.2307,
                        y: 87.48405,
                        value: 0,
                        category: 4
                    },
                    {
                        id: '沙拉猪扒',
                        name: '沙拉猪扒',
                        symbolSize: 24,
                        x: -453.26874,
                        y: 58.94908,
                        value: 0,
                        category: 4
                    },
                    {
                        id: '上汤苋菜',
                        name: '上汤苋菜',
                        symbolSize: 24,
                        x: -386.44904,
                        y: 140.05937,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '手撕鸡',
                        name: '手撕鸡',
                        symbolSize: 24,
                        x: -446.7876,
                        y: 123.38005,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '酸辣牛羊杂',
                        name: '酸辣牛羊杂',
                        symbolSize: 24,
                        x: 338.49738,
                        y: -269.55914,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '小炳胜炖汤',
                        name: '小炳胜炖汤',
                        symbolSize: 24,
                        x: 29.187843,
                        y: -460.13138,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '野生珍珠马蹄',
                        name: '野生珍珠马蹄',
                        symbolSize: 24,
                        x: 238.38697,
                        y: -210.00926,
                        value: 0,
                        category: 1
                    },
                    {
                        id: '{招牌佛跳墙,顺德公炒陈村粉}',
                        name: '{招牌佛跳墙,顺德公炒陈村粉}',
                        symbolSize: 24,
                        x: 189.69513,
                        y: -346.50662,
                        value: 0,
                        category: 2
                    }
                ],
                links: [
                    {
                        source: '上汤苋菜',
                        target: '脆皮猪手'
                    },
                    {
                        source: '乳鸽焗饭',
                        target: '盐焗乳鸽'
                    },
                    {
                        source: '莲藕尖炒什',
                        target: '农家糖糕'
                    },
                    {
                        source: '野生珍珠马蹄',
                        target: '原味椰子鸡'
                    },
                    {
                        source: '小炳胜炖汤',
                        target: '雪山奶露包'
                    },
                    {
                        source: '手撕鸡',
                        target: '脆皮猪手'
                    },
                    {
                        source: '排骨香米锅底',
                        target: '白贝'
                    },
                    {
                        source: '排骨香米锅底',
                        target: '蒸汽火锅'
                    },
                    {
                        source: '明虾',
                        target: '白贝'
                    },
                    {
                        source: '果汁猪扒',
                        target: '脆皮猪手'
                    },
                    {
                        source: '柴火饭',
                        target: '荔枝木叉烧'
                    },
                    {
                        source: '榴莲芝士鸡扒',
                        target: '脆皮猪手'
                    },
                    {
                        source: '沙拉猪扒',
                        target: '脆皮猪手'
                    },
                    {
                        source: '沙茶酱',
                        target: '牛筋丸'
                    },
                    {
                        source: '白切牛肉',
                        target: '脆皮猪手'
                    },
                    {
                        source: '白灼吊片',
                        target: '豉油糖煎黄花鱼'
                    },
                    {
                        source: '罗氏虾',
                        target: '白贝'
                    },
                    {
                        source: '麦香鸡',
                        target: '白贝'
                    },
                    {
                        source: '菜心炒鸽杂',
                        target: '盐焗乳鸽'
                    },
                    {
                        source: '秋葵',
                        target: '雪山奶露包'
                    },
                    {
                        source: '红豆沙',
                        target: '脆皮猪手'
                    },
                    {
                        source: '红酒皮蛋黑叉烧',
                        target: '雪山奶露包'
                    },
                    {
                        source: '芒果肠粉',
                        target: '雪山奶露包'
                    },
                    {
                        source: '酸辣牛羊杂',
                        target: '雪山奶露包'
                    },
                    {
                        source: '{乳鸽焗饭,红烧乳鸽}',
                        target: '盐焗乳鸽'
                    },
                    {
                        source: '{招牌佛跳墙,顺德公炒陈村粉}',
                        target: '招牌酱爆豆角'
                    },
                    {
                        source: '{排骨香米锅底,罗氏虾}',
                        target: '白贝'
                    },
                    {
                        source: '{排骨香米锅底,白贝}',
                        target: '蒸汽火锅'
                    },
                    {
                        source: '{排骨香米锅底,蒸汽火锅}',
                        target: '白贝'
                    },
                    {
                        source: '{排骨香米锅底,罗氏虾}',
                        target: '蒸汽火锅'
                    },
                    {
                        source: '{明虾,蒸汽火锅}',
                        target: '白贝'
                    },
                    {
                        source: '{沙拉猪扒,红豆沙}',
                        target: '脆皮猪手'
                    },
                    {
                        source: '{罗氏虾,蒸汽火锅}',
                        target: '白贝'
                    },
                    {
                        source: '{黑金猪手,酸辣牛羊杂}',
                        target: '雪山奶露包'
                    }
                ]
            }
        ]
    };


    const COLORS = ['rgba(112, 138, 255, 1)', 'rgba(66, 164, 245, 1)', 'rgba(157, 115, 255, 1)', 'rgba(247, 193, 45, 1)', 'rgba(255, 153, 43, 1)', 'rgba(160, 165, 198, 1)', 'rgba(247, 101, 96, 1)'];
    const COLORS1 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const COLORS2 = ['#5699FF', '#FF8256'];

    const data1 = StartDataList.level_data;

    const data2 = StartDataList.vip_data;

    const data3 = StartDataList.month_data;

    // const data4 = [{name: "50元以下", value: 15}, {name: "50-100元", value: 122}, {name: "100-150元", value: 32}];

    const data5 = StartDataList.matrix_data


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
            <div className="userbook">
                <div className="toparea">
                    <div className="topareabox">
                        <div className="topareaboxtop">
                            <div className="title">用户等级分布</div>
                            {/*<div className="more">查看更多</div>*/}
                        </div>
                        <div className="topareaboxbottom">
                            <ResponsiveContainer width="95%" height="100%" className="container">
                                <PieChart width={300} height={400}>
                                    <Pie
                                        activeIndex={State.activeIndex}
                                        activeShape={renderActiveShape}
                                        data={data1}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        fill="#778afe"
                                        dataKey="value"
                                        onMouseEnter={onPieEnter}
                                    >
                                        {data1?.map((entry, index) => (
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
                    <div className="topareabox">
                        <div className="topareaboxtop">
                            <div className="title">用户身份</div>
                            {/*<div className="more">查看更多</div>*/}
                        </div>
                        <div className="topareaboxbottom">
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
                    <div className="topareabox">
                        <div className="topareaboxtop">
                            <div className="title">用户评论频率</div>
                            {/*<div className="more">查看更多</div>*/}
                        </div>
                        <div className="topareaboxbottom">
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
                                    <Area type="monotone" dataKey="value" stroke="rgba(72, 118, 255, 1)"
                                          fillOpacity={1} fill="url(#colorUv)"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="bottomarea1">
                    <div className="bottomareabox1 bottomareaboxleft">
                        <div className="bottomareaboxtop">
                            <div className="title">用户画像</div>
                            {/*<div className="more">查看更多</div>*/}
                        </div>
                        <div className="bottomareaboxbottom">
                            <UserBookBox book={["品味鉴赏家", "● VIP用户占比低", "● 更注重产品口味", "● 评分较严苛"]}
                                         avatarurl="/static/userbookava/1.png"/>
                            <UserBookBox book={["服务注重者", "● VIP用户占比低", "● 更注重商家服务", "● 评分较严苛"]}
                                         avatarurl="/static/userbookava/2.png"/>
                            <UserBookBox book={["普通食客", "● VIP用户占比较高", "● 更注重产品价格", "● 评分较宽松"]}
                                         avatarurl="/static/userbookava/3.png"/>
                            <UserBookBox
                                book={["异常行为者", "● 新用户为主", "● 评分过高或过低，不存在参考性", "● 存在刷单或恶意竞争评价行为"]}
                                avatarurl="/static/userbookava/4.png"/>
                            <UserBookBox
                                book={["综合考察员", "● 平台核心用户", "● VIP用户占比较高", "● 注重产品口味和商家服务", "● 评分较客观"]}
                                avatarurl="/static/userbookava/6.png"/>
                        </div>
                    </div>
                    <div className="bottomareabox1 bottomareaboxright">
                        <div className="bottomareaboxrighttop">
                            <div className="bottomareaboxtop">
                                <div className="title">关联规则查看</div>
                                <div className="more">查看更多</div>
                            </div>
                            <div className="bottomareaboxbottom">
                                <ReactECharts option={option}/>
                            </div>
                        </div>
                        <div className="bottomareaboxrightbottom">
                            <div className="bottomareaboxrightbottomleft">
                                <div className="bottomareaboxtop">
                                    <div className="title">聚类结果</div>
                                    {/*<div className="more">查看更多</div>*/}
                                </div>
                                <div className="bottomareaboxbottom">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <ScatterChart
                                            margin={{
                                                top: 20,
                                                right: 20,
                                                bottom: 20,
                                                // left: 20,
                                            }}
                                        >
                                            <CartesianGrid/>
                                            <XAxis type="number" dataKey="x" name="x" fontSize={12}/>
                                            <YAxis type="number" dataKey="y" name="y" fontSize={12}/>
                                            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                                            <Scatter name="A school" data={data5} fill="#8884d8">
                                                {data5?.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[data5[index].c]}/>
                                                ))}
                                            </Scatter>
                                        </ScatterChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="bottomareaboxrightbottomright">
                                <img src="/static/userbookpic.png" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}