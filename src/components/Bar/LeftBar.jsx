import './LeftBar.scss'
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';


const LeftBarbox = (item) => {

    return (
        <>
            <div className="barbox">
                <div className="barleft">
                    <div className="barbox-icon">
                        <img src={item.item.item.bariconaddress} alt=""/>
                    </div>
                    <div
                        className="barbox-title"
                        style={{
                            color: item.item.item.index === item.item.selectedindex ? "#548ce0" : "#000000"
                        }}
                    >{item.item.item.bartitle}</div>
                </div>
                {
                    item.item.item.gotoicon &&
                    <img className="barbox-righttri" src="/static/righttri.png" alt=""/>
                }
            </div>
        </>
    )
}

export const LeftBar = () => {

    const navigate = useNavigate();

    const [BarList, setBarList] = useState([]);
    const [Selectedindex, setSelectedIndex] = useState(0);

    let handleClick = function (item) {
        console.log(item)
        navigate(item.gotopage);
        setSelectedIndex(item.index);
    }

    useEffect(() => {
        setBarList([
            {
                index: -1,
                bariconaddress: "/static/home.png",
                bartitle: "工作台",
                gotoicon: false,
                gotopage: "/index"
            },
            {
                index: 0,
                bariconaddress: "/static/analyze.png",
                bartitle: "市场分析",
                gotoicon: true,
                gotopage: "/analyze"
            },
            {
                index: 1,
                bariconaddress: "/static/user.png",
                bartitle: "用户画像",
                gotoicon: true,
                gotopage: "/userbook"
            },
            {
                index: 2,
                bariconaddress: "/static/marketing.png",
                bartitle: "精准营销",
                gotoicon: true,
                gotopage: "/marketing"
            },
            {
                index: 3,
                bariconaddress: "/static/compare.png",
                bartitle: "竞争对比",
                gotoicon: true,
                gotopage: "/compare"
            },
            {
                index: 4,
                bariconaddress: "/static/setting.png",
                bartitle: "设置",
                gotoicon: true
            }
        ])
    }, [])

    const BarListView = (selectedindex) => {
        return BarList.map((item, index) => {
            console.log(selectedindex.selectedindex)
            return (
                <div onClick={() => handleClick(item)}>
                    <LeftBarbox
                        key={index}
                        item={{
                            "item": item,
                            "selectedindex": selectedindex.selectedindex
                        }}
                    />
                </div>
            )

        })
    }

    return (
        <>
            <BarListView selectedindex={Selectedindex}/>
        </>
    )
}