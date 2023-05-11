import './UserBook.scss'
import {useMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {Space, Spin} from "antd";
import {
    Area,
    AreaChart,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Sector,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {UserBookBox} from "./UserBookBox.jsx";

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

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
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
    const [Loading, setLoading] = useState(false)


    const onPieEnter = (_, index) => {
        setState({activeIndex: index});
    };


    const COLORS = ['rgba(112, 138, 255, 1)', 'rgba(66, 164, 245, 1)', 'rgba(157, 115, 255, 1)', 'rgba(247, 193, 45, 1)','rgba(255, 153, 43, 1)','rgba(160, 165, 198, 1)','rgba(247, 101, 96, 1)'];
    const COLORS1 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const data1 = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
    ];

    const data2 = [
        {
            "name":"1月",
            "评论频率":100000
        },
        {
            "name":"2月",
            "评论频率":200000
        },
        {
            "name":"3月",
            "评论频率":300000
        },
        {
            "name":"4月",
            "评论频率":400000
        },
        {
            "name":"5月",
            "评论频率":500000
        },
        {
            "name":"6月",
            "评论频率":600000
        }
        ];

    const data4 = [{name: "50元以下", value: 15}, {name: "50-100元", value: 122}, {name: "100-150元", value: 32}];





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
            <div className="userbook">
                <div className="toparea">
                    <div className="topareabox">
                        <div className="topareaboxtop">
                            <div className="title">用户等级分布</div>
                            <div className="more">查看更多</div>
                        </div>
                        <div className="topareaboxbottom">
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
                    <div className="topareabox">
                        <div className="topareaboxtop">
                            <div className="title">用户身份</div>
                            <div className="more">查看更多</div>
                        </div>
                        <div className="topareaboxbottom">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={400} height={400}>
                                  <Pie
                                    data={data1}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                  >
                                    {data1.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
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
                            <div className="more">查看更多</div>
                        </div>
                        <div className="topareaboxbottom">
                            <ResponsiveContainer width="95%" height="90%">
                                <AreaChart
                                    width={550}
                                    height={250}
                                    data={data2}
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
                                    <Area type="monotone" dataKey="评论频率" stroke="rgba(72, 118, 255, 1)"
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
                            <div className="more">查看更多</div>
                        </div>
                        <div className="bottomareaboxbottom">
                            <UserBookBox book="123123123123"/>
                            <UserBookBox book="123123123123123"/>
                            <UserBookBox book="123123123"/>
                            <UserBookBox book="123123"/>
                            <UserBookBox book="123"/>
                        </div>
                    </div>
                    <div className="bottomareabox1 bottomareaboxright"></div>
                </div>
            </div>
        </>
    )
}