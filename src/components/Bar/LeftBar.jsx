import './LeftBar.scss'
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';


const LeftBarbox = (item) => {

    const navigate = useNavigate();

      function handleClick() {
        navigate(item.item.gotopage);
      }

    return (
        <>
            <div className="barbox" onClick={handleClick}>
                <div className="barleft">
                    <div className="barbox-icon">
                        <img src={item.item.bariconaddress} alt=""/>
                    </div>
                    <div className="barbox-title">{item.item.bartitle}</div>
                </div>
                {
                    item.item.gotoicon &&
                    <img className="barbox-righttri" src="/src/static/righttri.png" alt=""/>
                }
            </div>
        </>
    )
}

export const LeftBar = () => {

    const [BarList, setBarList] = useState([]);

    useEffect(() => {
        setBarList([
            {
                index: 0,
                bariconaddress: "/src/static/home.png",
                bartitle: "工作台",
                gotoicon: false,
                gotopage: ""
            },
            {
                index: 0,
                bariconaddress: "/src/static/analyze.png",
                bartitle: "市场分析",
                gotoicon: true,
                gotopage: "/analyze"
            },
            {
                index: 1,
                bariconaddress: "/src/static/user.png",
                bartitle: "用户画像",
                gotoicon: true,
                gotopage: "/userbook"
            },
            {
                index: 2,
                bariconaddress: "/src/static/marketing.png",
                bartitle: "精准营销",
                gotoicon: true,
                gotopage: "/marketing"
            },
            {
                index: 3,
                bariconaddress: "/src/static/compare.png",
                bartitle: "竞争对比",
                gotoicon: true,
                gotopage: "/compare"
            },
            {
                index: 4,
                bariconaddress: "/src/static/setting.png",
                bartitle: "设置",
                gotoicon: true
            }
        ])
    }, [])

    const BarListView = () => {
        return BarList.map((item, index) => {
            return <LeftBarbox key={index} item={item}/>
        })
    }

    return (
        <>
            <BarListView/>
        </>
    )
}