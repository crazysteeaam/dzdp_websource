import './Compare.scss'
import {Alert, Select, Space, Spin} from "antd";
import {useMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer, Scatter, ScatterChart,
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
                  fill="#333">{`数量 ${value}`}</text>
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

    const match = useMatch('/compare');
    const [State, setState] = useState({activeIndex: 0})
    const [Loading, setLoading] = useState(true)
    const [Data, setData] = useState([])
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
        } else{
            console.log("准备发送请求")
        }
    };

    const handleSelect = (value) => {
        // console.log(`selected ${value}`);
        // 添加选择的餐厅
        setValuelist([...Valuelist, value])
    }

    const handleDeselect = (value) => {
        // console.log(`deselected ${value}`);
        // 删掉取消的餐厅
        setValuelist(Valuelist.filter(item => item !== value))
    }


    const data = Data.again_data_8;
    const data2 = [
        {x: 100, y: 200, z: 200},
        {x: 120, y: 100, z: 260},
        {x: 170, y: 300, z: 400},
        {x: 140, y: 250, z: 280},
        {x: 150, y: 400, z: 500},
        {x: 110, y: 280, z: 200},
    ];
    const data4 = Data.heat_data;
    const merchants = Data.merchants;

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
                <div className="selectarea">、
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
                            onChange={handleChange}
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
                            <div className="title">竞争优劣势分析——季度分析</div>
                        </div>
                        <div className="topboxsmallbottom">
                            <ResponsiveContainer width="100%" height={270}>
                                <ScatterChart
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                >
                                    {/*<CartesianGrid />*/}
                                    <XAxis type="number" dataKey="x" name="stature" unit="cm" fontSize={12}/>
                                    <YAxis type="number" dataKey="y" name="weight" unit="kg" fontSize={12}/>
                                    <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                                    <Scatter name="A school" data={data2} fill="#8884d8"/>
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="topboxbig">
                        <div className="topboxbigtop">
                            <div className="title">用户转化率分析</div>
                            <div className="more">查看更多</div>
                        </div>
                        <div className="topboxbigbottom">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 60,
                                        bottom: 5,
                                    }}
                                    layout="vertical"
                                >
                                    {/*<CartesianGrid strokeDasharray="3 3"/>*/}
                                    <XAxis type="number" fontSize={12}/>
                                    <YAxis dataKey="name" type="category" fontSize={10}/>
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
                            <div className="title">竞争优劣势分析——月度分析</div>
                        </div>
                        <div className="topboxsmallbottom">
                            <ResponsiveContainer width="100%" height={270}>
                                <ScatterChart
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                >
                                    {/*<CartesianGrid />*/}
                                    <XAxis type="number" dataKey="x" name="stature" unit="cm" fontSize={12}/>
                                    <YAxis type="number" dataKey="y" name="weight" unit="kg" fontSize={12}/>
                                    <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                                    <Scatter name="A school" data={data2} fill="#8884d8"/>
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="bottomarea">
                    <div className="bottombox"></div>
                    <div className="bottompic"></div>
                </div>
            </div>
        </>
    )
}